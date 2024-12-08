import React from "react";
import { Form, Input, Button, Select, Typography, theme } from "antd";

const { Option } = Select;
const { Title } = Typography;

const AccountComponent: React.FC = () => {
    const [form] = Form.useForm();
    const { token } = theme.useToken();

    const onSubmit = (values: unknown) => {
        console.log("Received values of form:", values);
        // Here you would typically send this data to an API or handle it in state
        alert(`Form submitted successfully ${JSON.stringify(values)}`);
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
                New Account
            </Title>
            <Form
                form={form}
                name="new-account-form"
                onFinish={onSubmit}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                style={{
                    maxWidth: 800,
                    width: "100%",
                    backgroundColor: token.colorBgContainer,
                }}
            >
                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>
                            Account Name
                        </span>
                    }
                    name="accountName"
                    rules={[
                        {
                            required: true,
                            message: "Please input your account name!",
                        },
                    ]}
                >
                    <Input style={{ marginLeft: 10 }} />
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>
                            Account Type
                        </span>
                    }
                    name="accountType"
                    rules={[
                        {
                            required: true,
                            message: "Please select an account type!",
                        },
                    ]}
                >
                    <Select
                        placeholder="Select account type"
                        style={{ marginLeft: 10 }}
                    >
                        <Option value="savings">Savings</Option>
                        <Option value="checking">Checking</Option>
                        <Option value="investment">Investment</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label={
                        <span style={{ color: token.colorText }}>
                            Account Balance
                        </span>
                    }
                    name="accountBalance"
                    rules={[
                        {
                            required: true,
                            message: "Please input initial balance!",
                        },
                    ]}
                >
                    <Input
                        type="number"
                        prefix="₹"
                        style={{ marginLeft: 10 }}
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 6, span: 12 }}
                    style={{ marginTop: 50 }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export { AccountComponent };
