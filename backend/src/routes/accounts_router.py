from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from src.helper import AccountHelper
from src.objects import Account
from src.database import get_db

router = APIRouter()


def get_account_helper():
    return AccountHelper()


@router.get("/accounts")
def get_accounts(
    db: Session = Depends(get_db),
    account_helper: AccountHelper = Depends(get_account_helper),
):
    try:
        response = account_helper.get_accounts(db)
        return response if response else []
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/accounts/{account_id}")
def get_account_by_id(
    account_id: int,
    db: Session = Depends(get_db),
    account_helper: AccountHelper = Depends(get_account_helper),
):
    try:
        response = account_helper.get_account_by_id(account_id, db)
        return (
            response
            if response
            else JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "Account not found"},
            )
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.post("/accounts", status_code=status.HTTP_201_CREATED)
def add_account(
    account: Account,
    db: Session = Depends(get_db),
    account_helper: AccountHelper = Depends(get_account_helper),
):
    try:
        response = account_helper.create_account(account, db)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put("/accounts/{account_id}")
def update_account(
    account_id: int,
    account: Account,
    db: Session = Depends(get_db),
    account_helper: AccountHelper = Depends(get_account_helper),
):
    try:
        response = account_helper.update_account(account_id, account, db)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.delete("/accounts/{account_id}")
def delete_account(
    account_id: int,
    db: Session = Depends(get_db),
    account_helper: AccountHelper = Depends(get_account_helper),
):
    response = account_helper.delete_account(account_id, db)
    return response
