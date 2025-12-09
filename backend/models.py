from sqlalchemy import Column, Integer, String, Text, DateTime, Enum as SQLEnum
from sqlalchemy.sql import func
from database import Base
import enum


class ApplicationStatus(str, enum.Enum):
    PENDING = "pending"
    REVIEWED = "reviewed"
    INTERVIEW = "interview"
    HIRED = "hired"
    REJECTED = "rejected"


class JobApplication(Base):
    __tablename__ = "job_applications"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Personal Information
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(20), nullable=False)
    date_of_birth = Column(String(20), nullable=True)  # Deprecated - kept for database compatibility
    
    # Address (deprecated - kept for database compatibility)
    address = Column(String(255), nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    zip_code = Column(String(20), nullable=True)
    country_of_birth = Column(String(100), nullable=True)
    
    # Professional Information
    years_experience = Column(Integer, nullable=True)
    cdl_class = Column(String(10), nullable=True)
    cdl_expiration = Column(String(20), nullable=True)
    
    # Previous Employment
    previous_jobs = Column(Text, nullable=True)
    
    # Additional Information
    message = Column(Text, nullable=True)
    
    # Status tracking
    status = Column(
        SQLEnum(ApplicationStatus),
        default=ApplicationStatus.PENDING,
        nullable=False
    )
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class ContactMessage(Base):
    __tablename__ = "contact_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=True)
    email = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=True)
    company_name = Column(String(255), nullable=True)
    position = Column(String(100), nullable=True)
    message = Column(Text, nullable=False)
    sms_consent = Column(Integer, default=0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

