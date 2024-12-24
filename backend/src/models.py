from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from src.database import Base
from datetime import datetime


class TransactionModel(Base):
    """
    Represents a financial transaction.
    Attributes:
        id (int): The unique identifier of the transaction.
        date (datetime): The date and time of the transaction.
        description (str): A brief description of the transaction.
        detail_description (str): A detailed description of the transaction.
        credit (float): The amount credited in the transaction.
        debit (float): The amount debited in the transaction.
        category (str): The category of the transaction.
        mode (str): The mode of the transaction (e.g., cash, card).
        account (str): The account associated with the transaction.
        sub_category (str): The sub-category of the transaction.
    """

    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    date = Column(DateTime, default=datetime.now(), nullable=False)
    description = Column(String, nullable=False)
    detail_description = Column(String, nullable=True)
    credit = Column(Float, default=0, nullable=False)
    debit = Column(Float, default=0, nullable=False)
    category = Column(String, nullable=False)
    mode = Column(String, nullable=False)
    account_id = Column(
        Integer, ForeignKey("accounts.id"), nullable=False
    )  # Foreign key to AccountsModel
    sub_category = Column(String, nullable=True)

    # Define the relationship with AccountsModel
    account = relationship("AccountsModel", back_populates="transactions")

    def __repr__(self):
        return f"Transaction(id={self.id}, date={self.date}, description={self.description}, credit={self.credit}, debit={self.debit}, category={self.category}, mode={self.mode}, account={self.account}, sub_category={self.sub_category})"


class AccountsModel(Base):
    """
    Represents a financial account.
    Attributes:
        id (Optional[int]): The unique identifier of the account.
        account_name (str): The name of the account.
        account_type (str): The type of the account (e.g., savings, checking).
        account_balance (float): The current balance of the account.
        last_transaction_date (datetime): The date and time of the last transaction.
    """

    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    account_name = Column(String, nullable=False)
    account_type = Column(String, nullable=False)
    account_balance = Column(Float, nullable=False)
    last_transaction_date = Column(DateTime, default=datetime.now(), nullable=False)

    # Define the relationship with TransactionModel
    transactions = relationship("TransactionModel", back_populates="account")

    def __repr__(self):
        return f"Account(id={self.id}, account_name={self.account_name}, account_type={self.account_type}, account_balance={self.account_balance}, last_transaction_date={self.last_transaction_date})"


class CategoryModel(Base):
    """
    Represents a category of financial transactions.
    Attributes:
        id (int): The unique identifier of the category.
        category_name (str): The name of the category.
        sub_categories (List[SubCategoryModel]): The sub-categories associated with the category.
    """

    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    category_name = Column(String, nullable=False)

    sub_categories = relationship("SubCategoryModel", backref="category")

    def __repr__(self):
        return f"<Category(id={self.id}, category_name={self.category_name})>"


class SubCategoryModel(Base):
    """
    Represents a sub-category of a financial transaction.
    Attributes:
        id (int): The unique identifier of the sub-category.
        sub_category_name (str): The name of the sub-category.
        category_id (int): The unique identifier of the parent category.
    """

    __tablename__ = "sub_categories"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    sub_category_name = Column(String, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)

    def __repr__(self):
        return (
            f"<SubCategory(id={self.id}, sub_category_name={self.sub_category_name})>"
        )
