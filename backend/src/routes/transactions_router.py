from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.helper import TransactionHelper
from src.objects import Transaction
from src.database import get_db

router = APIRouter()


@router.get("/transaction", response_model=list[Transaction])
def get_transaction(db: Session = Depends(get_db)):
    try:
        transaction_helper = TransactionHelper()
        response = transaction_helper.get_transaction(db)
        print(15, response)
        return response if response else []
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/transaction")
def create_transaction(transaction: Transaction, db: Session = Depends(get_db)):
    transaction_helper = TransactionHelper()
    response = transaction_helper.create_transaction(transaction, db)
    return response


@router.delete("/transaction/{transaction_id}")
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transaction_helper = TransactionHelper()
    response = transaction_helper.delete_transaction(transaction_id, db)
    return response


@router.patch("/transaction")
def update_transaction(transaction: Transaction, db: Session = Depends(get_db)):
    print(transaction)
    transaction_helper = TransactionHelper()
    response = transaction_helper.update_transaction(transaction, db)
    return response
