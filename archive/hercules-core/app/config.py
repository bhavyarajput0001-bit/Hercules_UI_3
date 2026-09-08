from pydantic_settings import BaseSettings
from typing import Optional
from functools import lru_cache

class Settings(BaseSettings):
    # App
    APP_NAME: str = "Hercules Core"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8420
    
    # OmniRoute
    OMNIROUTE_BASE_URL: str = "http://localhost:20128"
    OMNIROUTE_API_KEY: str = "dev-key"
    
    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./hercules.db"
    
    # Auth
    JWT_SECRET: str = "dev-secret-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000"
    
    # Storage
    STORAGE_PATH: str = "./storage"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

@lru_cache()
def get_settings() -> Settings:
    return Settings()