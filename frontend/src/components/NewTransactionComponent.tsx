import React from "react";
import {
    Button,
    DatePicker,
    DatePickerProps,
    Form,
    Input,
    Modal,
    Select,
    Space,
    theme,
    Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import {
    useCreateCategoryMutation,
    useCreateSubCategoryMutation,
    useGetCategoriesQuery,
    useGetSubCategoriesQuery,
} from "../services/categoriesApi";

import { useGetAccountsQuery } from "../services/accountsApi";

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

const NewTransactionComponent = () => {
    // Load Categories
    // Load Sub categories
    // Load Accounts
    const [form] = Form.useForm();
    const { token } = theme.useToken();

    const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] =
        React.useState(false);
    const [isAddSubCategoryModalVisible, setIsAddSubCategoryModalVisible] =
        React.useState(false);
    const [selectedCategoryId, setSelectedCategoryId] =
        React.useState<number>(0);

    // Redux Toolkit Query
    const { data: accountsData } = useGetAccountsQuery({});
    const { data: categoryData, refetch: categoriesRefetch } =
        useGetCategoriesQuery({});
    const { data: subCategoryData, refetch: subcategoriesRefetch } =
        useGetSubCategoriesQuery(selectedCategoryId);
    const [createCategory] = useCreateCategoryMutation();
    const [createSubCategory] = useCreateSubCategoryMutation();

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

    const handleAddCategory = (value: { new_category: string }) => {
        createCategory({ category_name: value.new_category });
        categoriesRefetch();
        setIsAddCategoryModalVisible(false);
    };

    const handleAddSubCategory = (values: {
        new_sub_category: string;
        selectedCategoryId: number;
    }) => {
        createSubCategory({
            sub_category_name: values.new_sub_category,
            category_id: values.selectedCategoryId,
        });
        subcategoriesRefetch();
        setIsAddSubCategoryModalVisible(false);
    };

    return (
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
                {/* Datepicker component */}
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

                {/* Short Description - required */}
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

                {/* Detailed Description - optional */}
                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>
                            Detailed Description
                        </span>
                    }
                    name="detail_description"
                >
                    <TextArea rows={3} />
                </Form.Item>

                {/* Credit amount */}
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

                {/* Debit amount */}
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

                {/* Category */}
                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>Category</span>
                    }
                    name="category"
                    rules={[
                        { required: true, message: "Please select category!" },
                    ]}
                >
                    <Space>
                        <Select
                            style={{ width: 200 }}
                            onChange={(value) => setSelectedCategoryId(value)}
                        >
                            {categoryData?.map(
                                (category: {
                                    category_name: string;
                                    id: number;
                                }) => (
                                    <Option
                                        value={category.id}
                                        key={category.id}
                                    >
                                        {category?.category_name}
                                    </Option>
                                )
                            )}
                        </Select>
                        <Button
                            type="link"
                            icon={<PlusOutlined />}
                            onClick={() => setIsAddCategoryModalVisible(true)}
                        />
                    </Space>
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>
                            Sub Category
                        </span>
                    }
                    name="sub_category"
                >
                    <Space>
                        <Select style={{ width: 200 }}>
                            {subCategoryData?.map(
                                (subCategory: {
                                    sub_category_name: string;
                                    category_id: number;
                                    id: number;
                                }) => (
                                    <Option
                                        value={subCategory.id}
                                        key={subCategory.id}
                                    >
                                        {subCategory.sub_category_name}
                                    </Option>
                                )
                            )}
                        </Select>
                        <Button
                            type="link"
                            icon={<PlusOutlined />}
                            onClick={() =>
                                setIsAddSubCategoryModalVisible(true)
                            }
                        />
                    </Space>
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
                        <span style={{ color: token.colorText }}>
                            Account Type
                        </span>
                    }
                    name="account_type"
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
                    label={
                        <span style={{ color: token.colorText }}>Account</span>
                    }
                    name="account_name"
                    rules={[
                        { required: true, message: "Please select account!" },
                    ]}
                >
                    <Select>
                        {accountsData?.map(
                            (account: {
                                account_name: string;
                                account_type: string;
                                id: number;
                            }) => (
                                <Option value={account.id} key={account.id}>
                                    {account.account_name} -{" "}
                                    {account.account_type}
                                </Option>
                            )
                        )}
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

            {/* Modals to handle adding category and subcateory */}
            <Modal
                title="Add New Category"
                open={isAddCategoryModalVisible}
                onCancel={() => setIsAddCategoryModalVisible(false)}
                onOk={() => {
                    form.validateFields(["new_category"]).then((value) => {
                        handleAddCategory(value);
                    });
                }}
            >
                <Form form={form}>
                    <Form.Item
                        name="new_category"
                        label="Category"
                        rules={[
                            {
                                required: true,
                                message: "Please enter category!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Add New Sub Category"
                open={isAddSubCategoryModalVisible}
                onCancel={() => setIsAddSubCategoryModalVisible(false)}
                onOk={() => {
                    form.validateFields(["new_sub_category"]).then((values) => {
                        const updatedValues = { ...values, selectedCategoryId };
                        handleAddSubCategory(updatedValues);
                    });
                }}
            >
                <Form form={form}>
                    <Form.Item
                        name="new_sub_category"
                        label="Sub Category"
                        rules={[
                            {
                                required: true,
                                message: "Please enter sub category!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export { NewTransactionComponent };
