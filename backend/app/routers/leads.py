from typing import List
from fastapi import APIRouter, HTTPException, Depends
from app.models import Lead
from app.schemas import LeadCreate, LeadOut, LeadUpdateStatus
from app.auth_utils import require_admin

router = APIRouter()  # ✅ Removed duplicate prefix

@router.get("/", response_model=List[LeadOut])
async def list_leads(admin = Depends(require_admin)):  # ✅ Protected - admin only
    """Admin endpoint - list all leads"""
    items = await Lead.all().order_by("-id")
    return [LeadOut.model_validate(i) for i in items]

@router.post("/", response_model=LeadOut, status_code=201)
async def create_lead(payload: LeadCreate):
    """Public endpoint - submit a new lead"""
    lead = await Lead.create(**payload.model_dump(), status="new", source="web")
    return LeadOut.model_validate(lead)

@router.patch("/{lead_id}", response_model=LeadOut)
async def update_lead_status(
    lead_id: int,
    payload: LeadUpdateStatus,
    admin = Depends(require_admin)  # ✅ Protected - admin only
):
    """Admin endpoint - update lead status"""
    lead = await Lead.get_or_none(id=lead_id)
    if not lead:
        raise HTTPException(404, "Lead not found")
    lead.status = payload.status
    await lead.save()
    return LeadOut.model_validate(lead)

@router.delete("/{lead_id}")
async def delete_lead(
    lead_id: int,
    admin = Depends(require_admin)  # ✅ Protected - admin only
):
    """Admin endpoint - delete a lead"""
    deleted = await Lead.filter(id=lead_id).delete()
    if not deleted:
        raise HTTPException(404, "Lead not found")
    return {"ok": True}