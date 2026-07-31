from pydantic import BaseModel


class ChatMessage(BaseModel):
    role: str
    content: str


class AIChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


class AIChatResponse(BaseModel):
    response: str