from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class Transaction(BaseModel):
    """
    Represents a financial transaction.

    Attributes:
        id (Optional[int]): The unique identifier of the transaction.
        date (datetime): The date and time when the transaction occurred.
        description (str): A brief description of the transaction.
        detail_description (str): A detailed description of the transaction.
        credit (float): The amount credited in the transaction.
        debit (float): The amount debited in the transaction.
        category (str): The category of the transaction.
        mode (str): The mode of the transaction (e.g., cash, card).
        account (str): The account associated with the transaction.
        sub_category (str): The sub-category of the transaction.
    """

    id: Optional[int] = None
    date: datetime
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
    """
    Represents a financial account.

    Attributes:
        id (Optional[int]): The unique identifier of the account.
        account_name (str): The name of the account.
        account_type (str): The type of the account (e.g., savings, checking).
        account_balance (float): The current balance of the account.
        last_transaction_date (datetime): The date and time of the last transaction.
    """

    id: Optional[int] = None
    account_name: str
    account_type: str
    account_balance: float
    last_transaction_date: datetime = datetime.now()

    class Config:
        from_attributes = True


class SubCategory(BaseModel):
    """
    Represents a sub-category of a financial transaction.

    Attributes:
        id (Optional[int]): The unique identifier of the sub-category.
        sub_category_name (str): The name of the sub-category.
        category_id (int): The unique identifier of the parent category.
    """

    id: Optional[int] = None
    sub_category_name: str
    category_id: int

    class Config:
        from_attributes = True


class Category(BaseModel):
    """
    Represents a category of a financial transaction.

    Attributes:
        id (Optional[int]): The unique identifier of the category.
        category_name (str): The name of the category.
    """

    id: Optional[int] = None
    category_name: str

    class Config:
        from_attributes = True
