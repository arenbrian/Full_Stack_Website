from typing import Optional
from pydantic import BaseModel, EmailStr


class ServiceOut(BaseModel):
    id: int
    title: str
    description: str
    covered_by: Optional[str] = None
    is_active: bool

    class Config:
        from_attributes = True

class ServiceCreate(BaseModel):
    title: str
    description: str
    covered_by: Optional[str] = None
    is_active: bool = True

class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    covered_by: Optional[str] = None
    is_active: Optional[bool] = None

class LeadBase(BaseModel):
    full_name: str
    phone: Optional[str] = None
    email: Optional[str] = None
    relationship: Optional[str] = None
    payer_type: Optional[str] = None
    state_program: Optional[str] = None
    needs_summary: Optional[str] = None
    preferred_schedule: Optional[str] = None

class LeadCreate(LeadBase):
    pass

class LeadOut(LeadBase):
    id: int
    status: str
    source: str

    class Config:
        from_attributes = True

class LeadUpdateStatus(BaseModel):
    status: str


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    is_admin: bool = False  # ✅ Added is_admin field with default


class UserOut(BaseModel):
    id: int
    email: EmailStr
    is_admin: bool

    class Config:
        from_attributes = True  # ✅ Updated from orm_mode


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"  # ✅ Added default