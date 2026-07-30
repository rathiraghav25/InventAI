from sqlalchemy.orm import Session

from app.models.product import Product
from app.models.order import Order
from app.models.customer import Customer
from app.models.invoice import Invoice


class AIService:

    @staticmethod
    def build_context(db: Session):

        products = db.query(Product).all()
        orders = db.query(Order).all()
        customers = db.query(Customer).all()
        invoices = db.query(Invoice).all()

        return {
            "products": products,
            "orders": orders,
            "customers": customers,
            "invoices": invoices,
        }

    @staticmethod
    def get_demo_response(message: str):

        text = message.lower()

        if "stock" in text:
            return "I can analyze inventory levels once Gemini is connected."

        if "order" in text:
            return "I can summarize orders once Gemini is connected."

        if "customer" in text:
            return "I can analyze customer activity once Gemini is connected."

        return (
            "InventAI AI backend is connected successfully. "
            "Gemini integration will be added next."
        )