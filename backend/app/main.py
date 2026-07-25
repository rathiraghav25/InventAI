from fastapi import FastAPI

import app.models.base
from app.api.auth import router as auth_router
from app.db.database import create_tables

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="InventAI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)


@app.on_event("startup")
def startup():
    create_tables()


@app.get("/")
def root():
    return {"message": "InventAI Backend Running 🚀"}