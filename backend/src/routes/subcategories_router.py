from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from src.objects import SubCategory
from src.helper import SubCategoryHelper
from src.database import get_db

router = APIRouter()


def get_subcategory_helper():
    return SubCategoryHelper()


@router.get("/subcategories")
def get_subcategories(
    db: Session = Depends(get_db),
    categoryId: int = Query(None, alias="categoryId"),
    subcategory_helper: SubCategoryHelper = Depends(get_subcategory_helper),
):
    try:
        response = subcategory_helper.get_sub_categories(db, categoryId)
        return response if response else []
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.post("/subcategories", status_code=status.HTTP_201_CREATED)
def add_subcategory(
    subcategory: SubCategory,
    db: Session = Depends(get_db),
    subcategory_helper: SubCategoryHelper = Depends(get_subcategory_helper),
):
    try:
        response = subcategory_helper.create_sub_category(subcategory, db)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
