from pydantic import BaseModel
from typing import List


class Transaction(BaseModel):
    id: int | None = None
    date: str
    description: str
    detail_description: str
    credit: float
    debit: float
    category: str
    mode: str
    account: str
    sub_category: str

    class Config:
        from_attributes = True


class Account(BaseModel):
    id: int | None = None
    account_name: str
    account_type: str
    account_balance: float

    class Config:
        from_attributes = True


class SubCategory(BaseModel):
    id: int | None = None
    sub_category_name: str
    category_id: int

    class Config:
        from_attributes = True


class Category(BaseModel):
    id: int | None = None
    category_name: str

    class Config:
        from_attributes = True
