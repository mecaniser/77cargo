from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    database_url: str = "sqlite+aiosqlite:///./77cargo.db"
    secret_key: str = "your-secret-key-change-in-production"
    
    class Config:
        env_file = ".env"
    
    def get_async_database_url(self) -> str:
        """Convert database URL to async-compatible format."""
        url = self.database_url
        
        # Railway provides postgres:// but SQLAlchemy needs postgresql://
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql://", 1)
        
        # Convert to async driver format
        if url.startswith("postgresql://"):
            url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
        
        return url


@lru_cache()
def get_settings():
    return Settings()

