from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from src.database import Base


class TransactionModel(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String)
    description = Column(String)
    detail_description = Column(String)
    credit = Column(Float)
    debit = Column(Float)
    category = Column(String)
    mode = Column(String)
    account = Column(String)
    sub_category = Column(String)


class AccountsModel(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    account_name = Column(String)
    account_type = Column(String)
    account_balance = Column(Float)


class CategoryModel(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    category_name = Column(String)
    sub_categories = relationship("SubCategoryModel", back_populates="category")


class SubCategoryModel(Base):
    __tablename__ = "sub_categories"

    id = Column(Integer, primary_key=True, index=True)
    sub_category_name = Column(String)
    category_id = Column(Integer, ForeignKey("categories.id"))
    category = relationship("CategoryModel", back_populates="sub_categories")
