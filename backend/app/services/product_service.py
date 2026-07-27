from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


def get_products(db: Session):
    return db.query(Product).all()


def get_product(db: Session, product_id: str):
    return db.query(Product).filter(Product.id == product_id).first()

def create_product(db: Session, product: ProductCreate):
    db_product = Product(**product.model_dump())

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return db_product


def update_product(db: Session, product_id: str, updated: ProductUpdate):
    product = get_product(db, product_id)

    if not product:
        return None

    for key, value in updated.model_dump().items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)

    return product


def delete_product(db: Session, product_id: str):
    product = get_product(db, product_id)

    if not product:
        return None

    db.delete(product)
    db.commit()

    return product