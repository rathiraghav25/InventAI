from fastapi import FastAPI
from app.api.product import router as product_router
from app.api.auth import router as auth_router

import app.models.base
import app.models.product

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

@app.on_event("startup")
def startup():
    create_tables()

app.include_router(auth_router)
app.include_router(product_router)


@app.get("/")
def root():
    return {"message": "InventAI Backend Running 🚀"}