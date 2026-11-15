"""Fail-closed admin authorization. No credentials are stored in client bundles."""
import hashlib
import hmac
import os
import re

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

bearer = HTTPBearer(auto_error=False)


def require_admin(credentials: HTTPAuthorizationCredentials = Depends(bearer)):
    # Read at request time so rotation/revocation does not depend on settings cache.
    expected = os.environ.get("ADMIN_ACCESS_KEY_SHA256", "")
    if not re.fullmatch(r"[0-9a-f]{64}", expected):
        raise HTTPException(503, detail={
            "code": "ADMIN_AUTH_NOT_CONFIGURED",
            "message": "Admin access is disabled. Ask the service owner to configure "
                       "ADMIN_ACCESS_KEY_SHA256 on the Railway backend and redeploy. "
                       "Public application submission does not require admin access."
        })
    supplied = credentials.credentials if credentials else ""
    # Keys must be 32 random bytes, hex-encoded. Never accept a human password.
    valid_format = bool(re.fullmatch(r"[0-9a-f]{64}", supplied))
    digest = hashlib.sha256(supplied.encode("utf-8")).hexdigest()
    if not (hmac.compare_digest(digest, expected) and valid_format):
        raise HTTPException(
            401,
            detail={"code": "ADMIN_ACCESS_DENIED",
                    "message": "Admin access key is missing, invalid or revoked. "
                               "Ask the service owner for the current admin access key."},
            headers={"WWW-Authenticate": "Bearer"},
        )
