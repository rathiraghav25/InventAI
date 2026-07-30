from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.schemas.invoice import (
    InvoiceCreate,
    InvoiceUpdate,
    InvoiceResponse,
)
from app.services import invoice_service

router = APIRouter(
    prefix="/invoices",
    tags=["Invoices"],
)


@router.get(
    "/",
    response_model=List[InvoiceResponse],
)
def get_all_invoices(
    db: Session = Depends(get_db),
):
    return invoice_service.get_invoices(db)


@router.get(
    "/{invoice_id}",
    response_model=InvoiceResponse,
)
def get_invoice(
    invoice_id: str,
    db: Session = Depends(get_db),
):
    invoice = invoice_service.get_invoice(
        db,
        invoice_id,
    )

    if not invoice:
        raise HTTPException(
            status_code=404,
            detail="Invoice not found",
        )

    return invoice


@router.post(
    "/",
    response_model=InvoiceResponse,
)
def create_invoice(
    invoice: InvoiceCreate,
    db: Session = Depends(get_db),
):
    return invoice_service.create_invoice(
        db,
        invoice,
    )


@router.put(
    "/{invoice_id}",
    response_model=InvoiceResponse,
)
def update_invoice(
    invoice_id: str,
    invoice: InvoiceUpdate,
    db: Session = Depends(get_db),
):
    updated_invoice = (
        invoice_service.update_invoice(
            db,
            invoice_id,
            invoice,
        )
    )

    if not updated_invoice:
        raise HTTPException(
            status_code=404,
            detail="Invoice not found",
        )

    return updated_invoice


@router.delete(
    "/{invoice_id}",
    response_model=InvoiceResponse,
)
def delete_invoice(
    invoice_id: str,
    db: Session = Depends(get_db),
):
    deleted_invoice = (
        invoice_service.delete_invoice(
            db,
            invoice_id,
        )
    )

    if not deleted_invoice:
        raise HTTPException(
            status_code=404,
            detail="Invoice not found",
        )

    return deleted_invoice