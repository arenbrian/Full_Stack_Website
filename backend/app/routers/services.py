from typing import List
from fastapi import APIRouter, HTTPException, Depends
from app.models import Service
from app.schemas import ServiceOut, ServiceCreate, ServiceUpdate
from app.auth_utils import require_admin

router = APIRouter()  # ✅ Removed duplicate prefix

@router.get("/", response_model=List[ServiceOut])
async def list_services():
    """Public endpoint - list all active services"""
    rows = await Service.filter(is_active=True).order_by("-id").values(
        "id", "title", "description", "covered_by", "is_active"
    )
    return rows

@router.post("/", response_model=ServiceOut)
async def create_service(
    payload: ServiceCreate,
    admin = Depends(require_admin)  # ✅ Protected - admin only
):
    svc = await Service.create(**payload.model_dump())
    return ServiceOut.model_validate(svc)

@router.patch("/{service_id}", response_model=ServiceOut)
async def update_service(
    service_id: int,
    payload: ServiceUpdate,
    admin = Depends(require_admin)  # ✅ Protected - admin only
):
    s = await Service.get_or_none(id=service_id)
    if not s:
        raise HTTPException(404, "Service not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(s, k, v)
    await s.save()
    return ServiceOut.model_validate(s)

@router.delete("/{service_id}")
async def delete_service(
    service_id: int,
    admin = Depends(require_admin)  # ✅ Protected - admin only
):
    deleted = await Service.filter(id=service_id).delete()
    if not deleted:
        raise HTTPException(404, "Service not found")
    return {"ok": True}