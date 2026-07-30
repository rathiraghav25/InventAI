from sqlalchemy.orm import Session

from app.models.invoice import Invoice
from app.schemas.invoice import InvoiceCreate, InvoiceUpdate


def get_invoices(db: Session):
    return db.query(Invoice).all()


def get_invoice(db: Session, invoice_id: str):
    return (
        db.query(Invoice)
        .filter(Invoice.id == invoice_id)
        .first()
    )


def create_invoice(db: Session, invoice: InvoiceCreate):

    db_invoice = Invoice(**invoice.model_dump())

    db.add(db_invoice)
    db.commit()
    db.refresh(db_invoice)

    return db_invoice


def update_invoice(
    db: Session,
    invoice_id: str,
    invoice: InvoiceUpdate,
):

    db_invoice = get_invoice(db, invoice_id)

    if not db_invoice:
        return None

    db_invoice.payment_status = invoice.payment_status

    db.commit()
    db.refresh(db_invoice)

    return db_invoice


def delete_invoice(db: Session, invoice_id: str):

    db_invoice = get_invoice(db, invoice_id)

    if not db_invoice:
        return None

    db.delete(db_invoice)
    db.commit()

    return db_invoice