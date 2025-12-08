from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from models import ApplicationStatus


# Job Application Schemas
class JobApplicationCreate(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    country_of_birth: str = Field(..., min_length=1, max_length=100)
    date_of_birth: str = Field(..., min_length=1)
    
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    
    years_experience: Optional[int] = None
    cdl_class: Optional[str] = None
    cdl_expiration: Optional[str] = None
    
    previous_jobs: Optional[str] = None
    message: Optional[str] = None


class JobApplicationResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    phone: str
    country_of_birth: str
    date_of_birth: str
    address: Optional[str]
    city: Optional[str]
    state: Optional[str]
    zip_code: Optional[str]
    years_experience: Optional[int]
    cdl_class: Optional[str]
    cdl_expiration: Optional[str]
    previous_jobs: Optional[str]
    message: Optional[str]
    status: ApplicationStatus
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True


class JobApplicationStatusUpdate(BaseModel):
    status: ApplicationStatus


# Contact Message Schemas
class ContactMessageCreate(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: Optional[str] = None
    email: EmailStr
    phone: Optional[str] = None
    company_name: Optional[str] = None
    position: Optional[str] = None
    message: str = Field(..., min_length=1)
    sms_consent: bool = False


class ContactMessageResponse(BaseModel):
    id: int
    first_name: str
    last_name: Optional[str]
    email: str
    phone: Optional[str]
    company_name: Optional[str]
    position: Optional[str]
    message: str
    sms_consent: int
    created_at: datetime
    
    class Config:
        from_attributes = True

