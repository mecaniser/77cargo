from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from contextlib import asynccontextmanager
from typing import List
import os

from database import get_db, init_db
from models import JobApplication, ContactMessage, ApplicationStatus
from schemas import (
    JobApplicationCreate, JobApplicationResponse, JobApplicationStatusUpdate,
    ContactMessageCreate, ContactMessageResponse
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_db()
    yield
    # Shutdown


app = FastAPI(
    title="77 Cargo API",
    description="API for 77 Cargo careers and contact management",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend")
dist_path = os.path.join(os.path.dirname(__file__), "..", "dist")

# Serve React build if it exists (production), otherwise serve frontend folder
if os.path.exists(dist_path):
    # Mount assets folder for React build (Vite outputs to /assets/)
    assets_path = os.path.join(dist_path, "assets")
    if os.path.exists(assets_path):
        app.mount("/assets", StaticFiles(directory=assets_path), name="assets")
    # Mount static for CSS and other static files
    app.mount("/static", StaticFiles(directory=dist_path), name="static")
elif os.path.exists(frontend_path):
    app.mount("/static", StaticFiles(directory=frontend_path), name="static")


# ============== Job Applications ==============

@app.post("/api/applications", response_model=JobApplicationResponse, status_code=status.HTTP_201_CREATED)
async def create_application(
    application: JobApplicationCreate,
    db: AsyncSession = Depends(get_db)
):
    """Submit a new job application"""
    db_application = JobApplication(**application.model_dump())
    db.add(db_application)
    await db.commit()
    await db.refresh(db_application)
    return db_application


@app.get("/api/applications", response_model=List[JobApplicationResponse])
async def get_applications(
    skip: int = 0,
    limit: int = 100,
    status_filter: ApplicationStatus = None,
    db: AsyncSession = Depends(get_db)
):
    """Get all job applications (admin endpoint)"""
    query = select(JobApplication).order_by(desc(JobApplication.created_at))
    
    if status_filter:
        query = query.where(JobApplication.status == status_filter)
    
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()


@app.get("/api/applications/{application_id}", response_model=JobApplicationResponse)
async def get_application(
    application_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Get a specific job application"""
    result = await db.execute(
        select(JobApplication).where(JobApplication.id == application_id)
    )
    application = result.scalar_one_or_none()
    
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    return application


@app.patch("/api/applications/{application_id}/status", response_model=JobApplicationResponse)
async def update_application_status(
    application_id: int,
    status_update: JobApplicationStatusUpdate,
    db: AsyncSession = Depends(get_db)
):
    """Update application status (admin endpoint)"""
    result = await db.execute(
        select(JobApplication).where(JobApplication.id == application_id)
    )
    application = result.scalar_one_or_none()
    
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    application.status = status_update.status
    await db.commit()
    await db.refresh(application)
    return application


@app.delete("/api/applications/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_application(
    application_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Delete a job application (admin endpoint)"""
    result = await db.execute(
        select(JobApplication).where(JobApplication.id == application_id)
    )
    application = result.scalar_one_or_none()
    
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    await db.delete(application)
    await db.commit()


# ============== Contact Messages ==============

@app.post("/api/contact", response_model=ContactMessageResponse, status_code=status.HTTP_201_CREATED)
async def create_contact_message(
    message: ContactMessageCreate,
    db: AsyncSession = Depends(get_db)
):
    """Submit a contact message"""
    db_message = ContactMessage(
        **message.model_dump(exclude={'sms_consent'}),
        sms_consent=1 if message.sms_consent else 0
    )
    db.add(db_message)
    await db.commit()
    await db.refresh(db_message)
    return db_message


@app.get("/api/contact", response_model=List[ContactMessageResponse])
async def get_contact_messages(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    """Get all contact messages (admin endpoint)"""
    result = await db.execute(
        select(ContactMessage)
        .order_by(desc(ContactMessage.created_at))
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()


# ============== Frontend Routes ==============

@app.get("/")
async def serve_home():
    """Serve React app homepage"""
    index_path = os.path.join(dist_path, "index.html") if os.path.exists(dist_path) else os.path.join(frontend_path, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    raise HTTPException(status_code=404, detail="Frontend not found")


# Serve React app for all frontend routes (React Router handles client-side routing)
# This catch-all route must be LAST to not interfere with API routes
@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    # Don't interfere with API routes or static files
    if full_path.startswith("api/") or full_path.startswith("static/") or full_path.startswith("assets/"):
        raise HTTPException(status_code=404, detail="Not found")
    
    # Serve React app's index.html for all routes (React Router handles routing)
    index_path = os.path.join(dist_path, "index.html") if os.path.exists(dist_path) else os.path.join(frontend_path, "index.html")
    
    if os.path.exists(index_path):
        return FileResponse(index_path)
    
    raise HTTPException(status_code=404, detail="Not found")


# Health check
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "77 Cargo API"}

