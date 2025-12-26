from pydantic_settings import BaseSettings
from datetime import timedelta

class Settings(BaseSettings):
    DATABASE_URL: str = "postgres://homecare_user:strongpassword@localhost:5432/homecare"
    CORS_ORIGINS: str = "http://localhost:5173"
    SECRET_KEY: str = "change-me"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60  # 8 days

class Config():
    env_file = ".env"

settings = Settings()

def cors_origins_list() -> list[str]:
    return [s.strip() for s in settings.CORS_ORIGINS.split(",") if s.strip()]




