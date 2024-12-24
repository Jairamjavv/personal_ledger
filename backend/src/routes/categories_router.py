from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from src.helper import CategoryHelper
from src.objects import Category
from src.database import get_db

router = APIRouter()


def get_category_helper():
    return CategoryHelper()


@router.get("/categories")
def get_categories(
    db: Session = Depends(get_db),
    category_helper: CategoryHelper = Depends(get_category_helper),
):
    try:
        response = category_helper.get_categories(db)
        return response if response else []
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/categories/{category_id}")
def get_category_by_id(
    category_id: int,
    db: Session = Depends(get_db),
    category_helper: CategoryHelper = Depends(get_category_helper),
):
    try:
        response = category_helper.get_category_by_id(category_id, db)
        return (
            response
            if response
            else JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "Category not found"},
            )
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.post("/categories", status_code=status.HTTP_201_CREATED)
def add_category(
    category: Category,
    db: Session = Depends(get_db),
    category_helper: CategoryHelper = Depends(get_category_helper),
):
    try:
        response = category_helper.create_category(category, db)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put("/categories/{category_id}")
def update_category(
    category_id: int,
    category: Category,
    db: Session = Depends(get_db),
    category_helper: CategoryHelper = Depends(get_category_helper),
):
    try:
        response = category_helper.update_category(category_id, category, db)
        return (
            response
            if response
            else JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "Category not found"},
            )
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.delete("/categories/{category_id}")
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    category_helper: CategoryHelper = Depends(get_category_helper),
):
    try:
        response = category_helper.delete_category(category_id, db)
        return (
            response
            if response
            else JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "Category not found"},
            )
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
