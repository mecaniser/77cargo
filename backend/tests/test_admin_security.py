"""Synthetic-only integration tests. Never use a configured production database."""
import hashlib
import os
import sys
import tempfile
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

temp_dir = tempfile.TemporaryDirectory()
os.environ["DATABASE_URL"] = f"sqlite+aiosqlite:///{temp_dir.name}/synthetic.db"
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from main import app
from database import get_db

# Deliberately public test fixture, not a real credential.
TEST_KEY = "ab" * 32
HEADERS = {"Authorization": f"Bearer {TEST_KEY}"}
PRIVATE = [
    ("GET", "/api/applications"),
    ("GET", "/api/applications/1"),
    ("PATCH", "/api/applications/1/status"),
    ("DELETE", "/api/applications/1"),
    ("GET", "/api/contact"),
    ("GET", "/api/admin/session"),
]


@pytest.fixture
def client(monkeypatch):
    monkeypatch.setenv("ADMIN_ACCESS_KEY_SHA256", hashlib.sha256(TEST_KEY.encode()).hexdigest())
    with TestClient(app) as client:
        yield client
    app.dependency_overrides.clear()


@pytest.mark.parametrize("method,path", PRIVATE)
@pytest.mark.parametrize("auth", [None, "Bearer wrong", "Basic YTpi", "Bearer " + "cd" * 32])
def test_private_routes_deny_before_database_access(client, method, path, auth):
    def forbidden_db():
        raise AssertionError("Unauthorized request reached database")
    app.dependency_overrides[get_db] = forbidden_db
    headers = {"Authorization": auth} if auth else {}
    response = client.request(method, path, headers=headers, json={"status": "reviewed"})
    assert response.status_code == 401
    assert response.headers["cache-control"] == "no-store"
    assert "first_name" not in response.text


@pytest.mark.parametrize("method,path", PRIVATE)
@pytest.mark.parametrize("setting", ["", "invalid", "f" * 63])
def test_missing_or_bad_config_fails_closed(client, monkeypatch, method, path, setting):
    monkeypatch.setenv("ADMIN_ACCESS_KEY_SHA256", setting)
    def forbidden_db():
        raise AssertionError("Disabled admin request reached database")
    app.dependency_overrides[get_db] = forbidden_db
    response = client.request(method, path, headers=HEADERS, json={"status": "hired"})
    assert response.status_code == 503
    assert response.json()["detail"]["code"] == "ADMIN_AUTH_NOT_CONFIGURED"


def test_public_intake_and_authorized_admin_lifecycle(client, monkeypatch):
    # Public submissions must work even when admin configuration is absent.
    monkeypatch.delenv("ADMIN_ACCESS_KEY_SHA256")
    app_response = client.post("/api/applications", json={
        "first_name": "Synthetic", "last_name": "Applicant",
        "email": "synthetic@example.com", "phone": "2025550100",
    })
    assert app_response.status_code == 201
    application_id = app_response.json()["id"]
    contact = client.post("/api/contact", json={
        "first_name": "Synthetic", "email": "synthetic@example.com",
        "message": "Synthetic security test only",
    })
    assert contact.status_code == 201
    assert client.get("/api/health").status_code == 200
    monkeypatch.setenv("ADMIN_ACCESS_KEY_SHA256", hashlib.sha256(TEST_KEY.encode()).hexdigest())
    assert client.get("/api/admin/session", headers=HEADERS).json() == {"authenticated": True}
    assert client.get("/api/applications", headers=HEADERS).status_code == 200
    detail = client.get(f"/api/applications/{application_id}", headers=HEADERS)
    assert detail.status_code == 200
    assert detail.headers["cache-control"] == "no-store"
    updated = client.patch(f"/api/applications/{application_id}/status",
                           json={"status": "reviewed"}, headers=HEADERS)
    assert updated.status_code == 200
    assert updated.json()["status"] == "reviewed"
    assert client.get("/api/contact", headers=HEADERS).status_code == 200
    assert client.delete(f"/api/applications/{application_id}", headers=HEADERS).status_code == 204
    assert client.get(f"/api/applications/{application_id}", headers=HEADERS).status_code == 404


def test_rotation_revokes_old_key(client, monkeypatch):
    monkeypatch.setenv("ADMIN_ACCESS_KEY_SHA256", hashlib.sha256(("cd" * 32).encode()).hexdigest())
    assert client.get("/api/admin/session", headers=HEADERS).status_code == 401
    assert client.get("/api/admin/session", headers={"Authorization": "Bearer " + "cd" * 32}).status_code == 200


def test_cannot_authenticate_using_query_cookie_or_short_password(client, monkeypatch):
    assert client.get(f"/api/applications?access_key={TEST_KEY}").status_code == 401
    assert client.get("/api/applications", headers={"Cookie": f"admin_key={TEST_KEY}"}).status_code == 401
    monkeypatch.setenv("ADMIN_ACCESS_KEY_SHA256", hashlib.sha256(b"password").hexdigest())
    assert client.get("/api/applications", headers={"Authorization": "Bearer password"}).status_code == 401


def test_private_api_not_exposed_by_cors(client):
    response = client.options("/api/applications", headers={
        "Origin": "https://untrusted.example",
        "Access-Control-Request-Method": "GET",
        "Access-Control-Request-Headers": "authorization",
    })
    assert "access-control-allow-origin" not in response.headers
