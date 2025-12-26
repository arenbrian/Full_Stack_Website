from app.config import settings  # only if you have one, else hardcode URL

TORTOISE_ORM = {
    "connections": {
        "default": settings.DATABASE_URL if hasattr(settings, "DATABASE_URL") else "postgres://postgres:password@localhost:5432/anaya_db"
    },
    "apps": {
        "models": {
            "models": ["app.models", "aerich.models"],
            "default_connection": "default",
        },
    },
}
