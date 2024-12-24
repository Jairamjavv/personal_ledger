from fastapi import APIRouter
from src.routes.transactions_router import router as transaction_router
from src.routes.accounts_router import router as account_router
from src.routes.categories_router import router as category_router
from src.routes.subcategories_router import router as subcategory_router

router = APIRouter()

router.include_router(transaction_router)
router.include_router(account_router)
router.include_router(category_router)
router.include_router(subcategory_router)


@router.get("/")
def home():
    return {"message": "Hello World"}
