from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise

from app.config import settings
from app.routers import services, leads, auth  # and auth if you have it

app = FastAPI(title="Anaya Homecare API")

# CORS for Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"ok": True}

# Routers
app.include_router(services.router, prefix="/services", tags=["services"])
app.include_router(leads.router,    prefix="/leads",    tags=["leads"])
app.include_router(auth.router,     prefix="/auth",     tags=["auth"])

# DB
register_tortoise(
    app,
    db_url=settings.DATABASE_URL,
    modules={"models": ["app.models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
