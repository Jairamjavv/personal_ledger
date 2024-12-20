import React from "react";
import dayjs from "dayjs";
import type { DatePickerProps } from "antd";
import {
    Form,
    Input,
    DatePicker,
    Modal,
    Select,
    Space,
    Button,
    Tabs,
    Table,
    Typography,
    theme,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import {
    useGetTransactionsQuery,
    // useCreateTransactionMutation,
    useUpdateTransactionMutation,
} from "../services/transactionApi";

const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

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
    const [form] = Form.useForm();
    const { token } = theme.useToken();

    const [isEditModalVisible, setIsEditModalVisible] = React.useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] =
        React.useState(false);
    const [selectedTransaction, setSelectedTransaction] =
        React.useState<Transaction>();

    const { data: transactionData } = useGetTransactionsQuery({});
    // const [createTransaction] = useCreateTransactionMutation();
    const [updateTransaction] = useUpdateTransactionMutation();

    const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(date, dateString);
    };

    const onSubmit = (values: Transaction) => {
        const formattedValues = {
            ...values,
            date: dayjs(values.date).format("YYYY-MM-DD"),
        };
        console.log("Transaction form values:", formattedValues);
    };

    // FIXME: Add logic to update transaction
    const handleOk = () => {
        const values = form.getFieldsValue();
        const formattedValues = {
            ...values,
        };
        console.log("Transaction form values:", formattedValues);
        updateTransaction(formattedValues)
            .unwrap()
            .then(() => {
                setIsEditModalVisible(false);
                form.resetFields();
            });
    };

    // Code for new account creation
    const TransactionForm = () => (
        <div
            style={{
                padding: 24,
                minHeight: 360,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: token.colorBgContainer,
                color: token.colorText,
            }}
        >
            <Title
                level={2}
                style={{ color: token.colorText, marginBottom: 50 }}
            >
                New Transaction
            </Title>
            <Form
                form={form}
                name="transaction-form"
                onFinish={onSubmit}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                style={{
                    maxWidth: 800,
                    width: "100%",
                    backgroundColor: token.colorBgContainer,
                }}
            >
                <Form.Item
                    label={<span style={{ color: token.colorText }}>Date</span>}
                    name="date"
                    rules={[{ required: true, message: "Please select date!" }]}
                    initialValue={dayjs()}
                >
                    <DatePicker
                        onChange={onDateChange}
                        style={{ width: "100%" }}
                        format="YYYY-MM-DD"
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>
                            Description
                        </span>
                    }
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Please enter description!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>
                            Detailed Description
                        </span>
                    }
                    name="detail_description"
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>
                            Credit Amount
                        </span>
                    }
                    name="credit"
                >
                    <Input type="number" prefix="₹" />
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>
                            Debit Amount
                        </span>
                    }
                    name="debit"
                >
                    <Input type="number" prefix="₹" />
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>Category</span>
                    }
                    name="category"
                    rules={[
                        { required: true, message: "Please select category!" },
                    ]}
                >
                    <Select>
                        <Option value="income">Income</Option>
                        <Option value="expense">Expense</Option>
                        <Option value="transfer">Transfer</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>
                            Sub Category
                        </span>
                    }
                    name="sub_category"
                >
                    <Select>
                        <Option value="salary">Salary</Option>
                        <Option value="food">Food</Option>
                        <Option value="transport">Transport</Option>
                        <Option value="shopping">Shopping</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>
                            Payment Mode
                        </span>
                    }
                    name="mode"
                    rules={[
                        {
                            required: true,
                            message: "Please select payment mode!",
                        },
                    ]}
                >
                    <Select>
                        <Option value="cash">Cash</Option>
                        <Option value="upi">UPI</Option>
                        <Option value="card">Card</Option>
                        <Option value="netbanking">Net Banking</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>Account</span>
                    }
                    name="account"
                    rules={[
                        { required: true, message: "Please select account!" },
                    ]}
                >
                    <Select>
                        <Option value="savings">Savings Account</Option>
                        <Option value="checking">Checking Account</Option>
                        <Option value="cash">Cash Account</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 6, span: 12 }}
                    style={{ marginTop: 50 }}
                >
                    <Button type="primary" htmlType="submit">
                        Add Transaction
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
    console.log(selectedTransaction);

    const actionColumn = [
        {
            title: "Actions",
            key: "actions",
            render: (_: unknown, record: Transaction) => {
                console.log(record, _);
                return (
                    <Space size="middle">
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => {
                                setSelectedTransaction(record);
                                setIsEditModalVisible(true);
                            }}
                        />
                        <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => {
                                setSelectedTransaction(record);
                                setIsDeleteModalVisible(true);
                            }}
                        />
                    </Space>
                );
            },
        },
    ];

    const EditModal = () => (
        <Modal
            title="Edit Transaction"
            open={isEditModalVisible}
            onCancel={() => setIsEditModalVisible(false)}
            // FIXME: Add logic to update transaction
            onOk={handleOk}
        >
            <Form
                form={form}
                initialValues={{
                    ...selectedTransaction,
                    date: selectedTransaction?.date
                        ? dayjs(selectedTransaction.date)
                        : dayjs(),
                }}
                onFinish={() => {
                    // Handle update logic here
                    setIsEditModalVisible(false);
                }}
            >
                <Form.Item
                    label={<span style={{ color: token.colorText }}>Date</span>}
                    name="date"
                    rules={[{ required: true, message: "Please select date!" }]}
                >
                    <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>
                            Description
                        </span>
                    }
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Please enter description!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>
                            Detailed Description
                        </span>
                    }
                    name="detail_description"
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>
                            Credit Amount
                        </span>
                    }
                    name="credit"
                >
                    <Input type="number" prefix="₹" />
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>
                            Debit Amount
                        </span>
                    }
                    name="debit"
                >
                    <Input type="number" prefix="₹" />
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>Category</span>
                    }
                    name="category"
                    rules={[
                        { required: true, message: "Please select category!" },
                    ]}
                >
                    <Select>
                        <Option value="income">Income</Option>
                        <Option value="expense">Expense</Option>
                        <Option value="transfer">Transfer</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>
                            Sub Category
                        </span>
                    }
                    name="sub_category"
                >
                    <Select>
                        <Option value="salary">Salary</Option>
                        <Option value="food">Food</Option>
                        <Option value="transport">Transport</Option>
                        <Option value="shopping">Shopping</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>
                            Payment Mode
                        </span>
                    }
                    name="mode"
                    rules={[
                        {
                            required: true,
                            message: "Please select payment mode!",
                        },
                    ]}
                >
                    <Select>
                        <Option value="cash">Cash</Option>
                        <Option value="upi">UPI</Option>
                        <Option value="card">Card</Option>
                        <Option value="netbanking">Net Banking</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>Account</span>
                    }
                    name="account"
                    rules={[
                        { required: true, message: "Please select account!" },
                    ]}
                >
                    <Select>
                        <Option value="savings">Savings Account</Option>
                        <Option value="checking">Checking Account</Option>
                        <Option value="cash">Cash Account</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 6, span: 12 }}
                    style={{ marginTop: 50 }}
                ></Form.Item>
            </Form>
        </Modal>
    );

    const DeleteConfirmModal = () => (
        <Modal
            title="Confirm Delete"
            open={isDeleteModalVisible}
            onOk={() => {
                // Handle delete logic here
                setIsDeleteModalVisible(false);
            }}
            onCancel={() => setIsDeleteModalVisible(false)}
        >
            <p>Are you sure you want to delete this transaction?</p>
        </Modal>
    );

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
                columns={[...columns, ...actionColumn]}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
            <EditModal />
            <DeleteConfirmModal />
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
            children: <TransactionForm />,
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
