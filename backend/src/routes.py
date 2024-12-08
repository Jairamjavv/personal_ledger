from fastapi import APIRouter
from src.helper import AccountHelper, TransactionHelper
from src.objects import Transaction, Account, Category, SubCategory


router = APIRouter()


@router.get("/")
def home():
    return {"message": "Hello World"}


@router.get("/transaction")
def get_transaction():
    transaction_helper = TransactionHelper()
    response = transaction_helper.get_transaction()
    return response


@router.put("/transaction")
def create_transaction(transaction: Transaction):
    transaction_helper = TransactionHelper()
    response = transaction_helper.create_transaction(transaction)
    return response


@router.delete("/transaction/{transaction_id}")
def delete_transaction(transaction_id: int):
    transaction_helper = TransactionHelper()
    response = transaction_helper.delete_transaction(transaction_id)
    return response


@router.patch("/transaction/{transaction_id}")
def update_transaction(transaction_id: int, transaction: Transaction):
    transaction_helper = TransactionHelper()
    response = transaction_helper.update_transaction(transaction_id, transaction)
    return response


@router.put("/account")
def add_account(account: Account):
    account_helper = AccountHelper()
    response = account_helper.create_account(account)
    return response
