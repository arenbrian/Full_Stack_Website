from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.models import User
from app.schemas import UserCreate, UserOut, Token
from app.auth_utils import hash_password, verify_password, create_access_token  # ✅ CORRECT IMPORT
from app.config import settings

router = APIRouter()

@router.post("/register", response_model=UserOut)
async def register(payload: UserCreate):
    """Register a new user"""
    exists = await User.get_or_none(email=payload.email)
    if exists:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = await User.create(
        email=payload.email,
        hashed_password=hash_password(payload.password),
        is_admin=payload.is_admin,
    )
    return UserOut.model_validate(user)

@router.post("/login", response_model=Token)
async def login(form: OAuth2PasswordRequestForm = Depends()):
    """Login with email (as username) and password"""
    user = await User.get_or_none(email=form.username)
    if not user or not verify_password(form.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"}
        )
    token = create_access_token(
        {"sub": user.email},
        settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    return Token(access_token=token, token_type="bearer")