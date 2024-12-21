from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routers import router
from src.models import Base
from src.database import engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
