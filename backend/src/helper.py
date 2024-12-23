from typing import Optional
from sqlalchemy.orm import Session
from src.models import TransactionModel, AccountsModel, CategoryModel, SubCategoryModel
from src.objects import Transaction, Account, Category, SubCategory


class TransactionHelper:
    def create_transaction(self, transaction: Transaction, db: Session):
        try:
            # handle account updation
            handle_accounts_response = self._handle_accounts(
                {
                    "name": transaction.account,
                    "credit": transaction.credit,
                    "debit": transaction.debit,
                },
                db,
            )

            if handle_accounts_response:
                # handle transaction creation
                new_transaction = TransactionModel(
                    date=transaction.date,
                    description=transaction.description,
                    detail_description=transaction.detail_description,
                    credit=transaction.credit,
                    debit=transaction.debit,
                    category=transaction.category,
                    mode=transaction.mode,
                    account=transaction.account,
                    sub_category=transaction.sub_category,
                )

                db.add(new_transaction)
                db.commit()
                db.refresh(new_transaction)
                return {"message": "Transaction created successfully"}
            else:
                return {"message": "Account not found"}
        except Exception as e:
            db.rollback()
            print(e)
            return {"message": "Transaction creation failed"}

    def get_transaction(self, db: Session):
        try:
            transactions = db.query(TransactionModel).all()
            return transactions
        except Exception as e:
            db.rollback()
            print(e)

    def update_transaction(self, update_transaction: Transaction, db: Session):
        try:
            transaction = (
                db.query(TransactionModel)
                .filter(TransactionModel.id == update_transaction.id)
                .first()
            )
            transaction.date = update_transaction.date
            transaction.description = update_transaction.description
            transaction.detail_description = update_transaction.detail_description
            transaction.credit = update_transaction.credit
            transaction.debit = update_transaction.debit
            transaction.category = update_transaction.category
            transaction.mode = update_transaction.mode
            transaction.account = update_transaction.account
            transaction.sub_category = update_transaction.sub_category
            db.commit()
            return {
                "message": f"Transaction updated for id: {update_transaction.id} successfully"
            }
        except Exception as e:
            db.rollback()
            print(e)

    def delete_transaction(self, transaction_id, db: Session):
        try:
            db.query(TransactionModel).filter(
                TransactionModel.id == transaction_id
            ).delete()
            db.commit()
            return {
                "message": f"Transaction with id:{transaction_id} deleted successfully"
            }
        except Exception as e:
            db.rollback()
            print(e)

    def _handle_accounts(self, account_details, db: Session):
        account_helper = AccountHelper()
        accounts = account_helper.get_accounts(db)
        for account in accounts:
            if account.account_name == account_details["name"]:
                if account_details["credit"] > 0:
                    account.account_balance += account_details["credit"]
                elif account_details["debit"] > 0:
                    account.account_balance -= account_details["debit"]
                account_helper.update_account(account, db)
                return True
        return False


class CategoryHelper:
    def create_category(self, category: Category, db: Session):
        try:
            new_category = CategoryModel(category_name=category.category_name)
            db.add(new_category)
            db.commit()
            db.refresh(new_category)
        except Exception as e:
            db.rollback()
            print(e)

    def get_categories(self, db: Session):
        try:
            categories = db.query(CategoryModel).all()
            return categories
        except Exception as e:
            db.rollback()
            print(e)

    def get_category_by_id(self, category_id: int, db: Session):
        try:
            category = (
                db.query(CategoryModel).filter(CategoryModel.id == category_id).first()
            )
            return category
        except Exception as e:
            db.rollback()
            print(e)

    def update_category(self, category_id: int, update_category: Category, db: Session):
        try:
            print(update_category)
            category = (
                db.query(CategoryModel).filter(CategoryModel.id == category_id).first()
            )
            category.category_name = update_category.category_name
            db.commit()
            return {"message": "sucess"}
        except Exception as e:
            db.rollback()
            print(e)

    def delete_category(self, category_id, db: Session):
        try:
            db.query(CategoryModel).filter(CategoryModel.id == category_id).delete()
            db.commit()
            return {"message": "deleted"}
        except Exception as e:
            db.rollback()
            print(e)


class SubCategoryHelper:
    def create_sub_category(self, subcategory: SubCategory, db: Session):
        try:
            category_helper = CategoryHelper()
            categories = category_helper.get_categories(db)
            for category in categories:
                if category.id == subcategory.category_id:
                    new_sub_category = SubCategoryModel(
                        sub_category_name=subcategory.sub_category_name,
                        category_id=category.id,
                    )
                    db.add(new_sub_category)
                    db.commit()
                    db.refresh(new_sub_category)
                    return {"message": "created"}
            return {"message": "No Category ID found"}
        except Exception as e:
            db.rollback()
            print(e)

    def get_sub_categories(self, db: Session, category_id: Optional[int] = None):
        try:
            sub_categories = (
                db.query(SubCategoryModel)
                .filter(SubCategoryModel.category_id == category_id)
                .all()
                if category_id
                else db.query(SubCategoryModel).all()
            )
            return sub_categories
        except Exception as e:
            db.rollback()
            print(e)

    def get_sub_category(self, sub_category_id, db: Session):
        try:
            sub_category = (
                db.query(SubCategoryModel)
                .filter(SubCategoryModel.id == sub_category_id)
                .first()
            )
            return sub_category
        except Exception as e:
            db.rollback()
            print(e)

    def update_sub_category(
        self, sub_category_id: int, update_sub_category: SubCategory, db: Session
    ):
        try:
            sub_category = (
                db.query(SubCategoryModel)
                .filter(SubCategoryModel.id == sub_category_id)
                .first()
            )
            sub_category.sub_category_name = update_sub_category.sub_category_name
            sub_category.category_id = update_sub_category.category.id
            db.commit()
        except Exception as e:
            db.rollback()
            print(e)

    def delete_sub_category(self, sub_category_id, db: Session):
        try:
            db.query(SubCategoryModel).filter(
                SubCategoryModel.id == sub_category_id
            ).delete()
            db.commit()
        except Exception as e:
            db.rollback()
            print(e)


class AccountHelper:
    def create_account(self, account: Account, db: Session):
        try:
            new_account = AccountsModel(
                account_name=account.account_name,
                account_type=account.account_type,
                account_balance=account.account_balance,
            )
            db.add(new_account)
            db.commit()
            db.refresh(new_account)
            return {"message": "Account created successfully"}
        except Exception as e:
            db.rollback()
            print(e)
            return {"message": "Account not created"}

    def get_accounts(self, db: Session):
        try:
            accounts = db.query(AccountsModel).all()
            return accounts
        except Exception as e:
            db.rollback()
            print(e)
            return {"message": f"Accounts not found. {e}"}

    def get_account(self, account_id: int, db: Session):
        try:
            account = (
                db.query(AccountsModel).filter(AccountsModel.id == account_id).first()
            )
            return account
        except Exception as e:
            db.rollback()
            print(e)
            return {"message": f"Account not found. {e}"}

    def update_account(self, update_account: Account, db: Session):
        try:
            account = (
                db.query(AccountsModel)
                .filter(AccountsModel.id == update_account.id)
                .first()
            )
            account.account_name = update_account.account_name.lower()
            account.account_type = update_account.account_type
            account.account_balance = update_account.account_balance
            db.commit()
        except Exception as e:
            db.rollback()
            print(e)
            return {"message": f"Account not updated. {e}"}

    def delete_account(self, account_id, db: Session):
        try:
            db.query(AccountsModel).filter(AccountsModel.id == account_id).delete()
            db.commit()
            return {"message": "Account deleted successfully"}
        except Exception as e:
            db.rollback()
            print(e)
            return {"message": f"Account not deleted. {e}"}
