"""01: database migrations

Revision ID: ab9a1a024f51
Revises:
Create Date: 2024-12-20 23:09:52.351138

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "ab9a1a024f51"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "accounts",
        sa.Column("id", sa.INTEGER(), nullable=False, autoincrement=True),
        sa.Column("account_name", sa.VARCHAR(), nullable=True),
        sa.Column("account_type", sa.VARCHAR(), nullable=True),
        sa.Column("account_balance", sa.FLOAT(), nullable=True),
        sa.Column("last_transaction_date", sa.DATETIME(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_accounts_id", "accounts", ["id"], unique=False)
    op.create_table(
        "sub_categories",
        sa.Column("id", sa.INTEGER(), nullable=False, autoincrement=True),
        sa.Column("sub_category_name", sa.VARCHAR(), nullable=True),
        sa.Column("category_id", sa.INTEGER(), nullable=True),
        sa.ForeignKeyConstraint(
            ["category_id"],
            ["categories.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_sub_categories_id", "sub_categories", ["id"], unique=False)
    op.create_table(
        "transactions",
        sa.Column("id", sa.INTEGER(), nullable=False, autoincrement=True),
        sa.Column("date", sa.VARCHAR(), nullable=True),
        sa.Column("description", sa.VARCHAR(), nullable=True),
        sa.Column("detail_description", sa.VARCHAR(), nullable=True),
        sa.Column("credit", sa.FLOAT(), nullable=True),
        sa.Column("debit", sa.FLOAT(), nullable=True),
        sa.Column("category", sa.VARCHAR(), nullable=True),
        sa.Column("mode", sa.VARCHAR(), nullable=True),
        sa.Column("account", sa.VARCHAR(), nullable=True),
        sa.Column("sub_category", sa.VARCHAR(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_transactions_id", "transactions", ["id"], unique=False)
    op.create_table(
        "categories",
        sa.Column("id", sa.INTEGER(), nullable=False, autoincrement=True),
        sa.Column("category_name", sa.VARCHAR(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_categories_id", "categories", ["id"], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index("ix_categories_id", table_name="categories")
    op.drop_table("categories")
    op.drop_index("ix_transactions_id", table_name="transactions")
    op.drop_table("transactions")
    op.drop_index("ix_sub_categories_id", table_name="sub_categories")
    op.drop_table("sub_categories")
    op.drop_index("ix_accounts_id", table_name="accounts")
    op.drop_table("accounts")
    # ### end Alembic commands ###
