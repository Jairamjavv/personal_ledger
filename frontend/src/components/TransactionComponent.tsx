import React, { useState } from "react";
import { Tabs, Table, Typography, theme } from "antd";

import { NewTransactionComponent } from "./NewTransactionComponent";

import {
    useGetTransactionsQuery,
    // useCreateTransactionMutation,
} from "../services/transactionApi";

const { Title } = Typography;

interface Transaction {
    id: number;
    account: string;
    category: string;
    sub_category: string;
    credit: number;
    debit: number;
    date: Date;
    detail_description: string;
    description: string;
    mode: string;
}

const columns = [
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Credit",
        dataIndex: "credit",
        key: "credit",
    },
    {
        title: "Debit",
        dataIndex: "debit",
        key: "debit",
    },
    {
        title: "Category",
        dataIndex: "category",
        key: "category",
    },
    {
        title: "Account",
        dataIndex: "account",
        key: "account",
    },
];

const TransactionComponent: React.FC = () => {
    const { token } = theme.useToken();

    useState<Transaction>();

    const { data: transactionData } = useGetTransactionsQuery({});

    const TransactionList = () => (
        <div
            style={{
                padding: 24,
                minHeight: 360,
                backgroundColor: token.colorBgContainer,
            }}
        >
            <Title
                level={2}
                style={{ color: token.colorText, marginBottom: 50 }}
            >
                Transaction History
            </Title>
            <Table
                dataSource={transactionData}
                columns={[...columns]}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );

    const items = [
        {
            key: "1",
            label: "Transaction History",
            children: <TransactionList />,
        },
        {
            key: "2",
            label: "New Transaction",
            children: <NewTransactionComponent />,
        },
    ];

    return (
        <div
            style={{
                padding: 24,
                backgroundColor: token.colorBgContainer,
                color: token.colorText,
            }}
        >
            <Tabs
                defaultActiveKey="1"
                items={items}
                style={{ color: token.colorText }}
            />
        </div>
    );
};

export { TransactionComponent };
