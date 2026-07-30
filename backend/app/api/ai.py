from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.ai import (
    AIChatRequest,
    AIChatResponse,
)
from app.services.ai_service import AIService

router = APIRouter(
    prefix="/ai",
    tags=["AI Assistant"],
)


@router.post(
    "/chat",
    response_model=AIChatResponse,
)
def chat(
    request: AIChatRequest,
    db: Session = Depends(get_db),
):

    AIService.build_context(db)

    answer = AIService.get_demo_response(
        request.message
    )

    return AIChatResponse(
        response=answer
    )