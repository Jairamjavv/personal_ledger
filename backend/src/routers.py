from fastapi import APIRouter
from src.helper import AccountHelper
from src.objects import Account, Category, SubCategory
from src.routes.transactions_router import router as transaction_router
from src.routes.accounts_router import router as account_router

router = APIRouter()

router.include_router(transaction_router)
router.include_router(account_router)


@router.get("/")
def home():
    return {"message": "Hello World"}
