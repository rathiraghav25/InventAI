from click import prompt
from sqlalchemy.orm import Session

from app.models.product import Product
from app.models.order import Order
from app.models.customer import Customer
from app.models.invoice import Invoice
from app.schemas.ai import ChatMessage


class AIService:

    @staticmethod
    def build_context(db: Session):

        products = db.query(Product).all()
        orders = db.query(Order).all()
        customers = db.query(Customer).all()
        invoices = db.query(Invoice).all()

        total_revenue = sum(
            getattr(invoice, "total_amount", 0) or 0
            for invoice in invoices
        )

        inventory_value = sum(
            (product.stock_quantity or 0)
            * (product.selling_price or 0)
            for product in products
        )

        low_stock = [
            product.name
            for product in products
            if (product.stock_quantity or 0)
            <= (product.reorder_threshold or 5)
        ]

        pending_orders = [
            order for order in orders
            if getattr(order, "status", "").lower() == "pending"
        ]

        completed_orders = [
            order for order in orders
            if getattr(order, "status", "").lower() == "completed"
        ]

        context = f"""
==========================
BUSINESS OVERVIEW
==========================

Total Products : {len(products)}
Total Customers: {len(customers)}
Total Orders   : {len(orders)}
Invoices       : {len(invoices)}

Revenue         : ₹{total_revenue:.2f}
Inventory Value : ₹{inventory_value:.2f}

Pending Orders  : {len(pending_orders)}
Completed Orders: {len(completed_orders)}

Low Stock Products:
"""

        if low_stock:
            for product in low_stock:
                context += f"- {product}\n"
        else:
            context += "None\n"

        context += "\n==========================\n"
        context += "PRODUCTS\n"
        context += "==========================\n"

        for product in products:
            context += (
                f"""
Name: {product.name}
Category: {product.category}
SKU: {product.sku}
Selling Price: ₹{product.selling_price}
Purchase Price: ₹{product.purchase_price}
Stock: {product.stock_quantity}
Reorder Level: {product.reorder_threshold}

"""
            )

        context += "\n==========================\n"
        context += "CUSTOMERS\n"
        context += "==========================\n"

        for customer in customers:
            context += f"- {customer.name}\n"

        context += "\n==========================\n"
        context += "ORDERS\n"
        context += "==========================\n"

        for order in orders[-10:]:
            context += (
                f"""
Order ID: {order.id}
Status: {getattr(order, 'status', 'Unknown')}
"""
            )

        return context

    @staticmethod
    def ask_gemini(
        message: str,
        context: str,
        history: list[ChatMessage],
    ):
        from app.core.gemini import model

        conversation = ""

        for msg in history[-8:]:
            conversation += f"{msg.role.capitalize()}: {msg.content}\n"

        prompt = f"""
You are InventAI's AI Business Assistant.

You specialize in:

- Inventory Management
- Retail Analytics
- Business Intelligence
- Sales Analysis
- Customer Insights

You have access to the company's REAL BUSINESS DATA.

=========================
BUSINESS DATA
=========================

{context}

=========================
CONVERSATION HISTORY
=========================

{conversation}

=========================
CURRENT USER QUESTION
=========================

{message}

Instructions:

- Use the conversation history to understand follow-up questions.
- Use only the provided business data.
- Never invent numbers.
- If the user refers to "it", "that", "those", infer the reference from the conversation history.
- Give practical recommendations.
- Use markdown headings and bullet points.
- Keep responses under 250 words.
"""

        response = model.generate_content(prompt)

        return response.text