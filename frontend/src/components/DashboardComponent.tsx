import React from "react";
import { Typography, theme, Row, Col, Card, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const { Title } = Typography;

// Mock data
const monthlyData = [
    { name: "Jan", expense: 4000, budget: 5000 },
    { name: "Feb", expense: 3000, budget: 5000 },
    { name: "Mar", expense: 2000, budget: 5000 },
    { name: "Apr", expense: 2780, budget: 5000 },
    { name: "May", expense: 1890, budget: 5000 },
    { name: "Jun", expense: 2390, budget: 5000 },
];

const weeklyData = [
    { name: "Mon", amount: 2400 },
    { name: "Tue", amount: 1398 },
    { name: "Wed", amount: 9800 },
    { name: "Thu", amount: 3908 },
    { name: "Fri", amount: 4800 },
    { name: "Sat", amount: 3800 },
    { name: "Sun", amount: 4300 },
];

const categoryData = [
    { name: "Food", value: 400 },
    { name: "Transport", value: 300 },
    { name: "Shopping", value: 300 },
    { name: "Bills", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DashboardComponent: React.FC = () => {
    const { token } = theme.useToken();

    return (
        <div
            style={{
                padding: 24,
                minHeight: 360,
                backgroundColor: token.colorBgContainer,
            }}
        >
            <Title
                level={2}
                style={{ color: token.colorText, marginBottom: 24 }}
            >
                Financial Dashboard
            </Title>

            {/* Summary Statistics */}
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Daily Spend"
                            value={1128}
                            precision={2}
                            valueStyle={{ color: token.colorSuccess }}
                            prefix="₹"
                            suffix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Weekly Spend"
                            value={4563}
                            precision={2}
                            valueStyle={{ color: token.colorError }}
                            prefix="₹"
                            suffix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Monthly Spend"
                            value={15640}
                            precision={2}
                            valueStyle={{ color: token.colorSuccess }}
                            prefix="₹"
                            suffix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Yearly Spend"
                            value={187500}
                            precision={2}
                            valueStyle={{ color: token.colorError }}
                            prefix="₹"
                            suffix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Charts Section */}
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="Monthly Expense vs Budget">
                        <BarChart width={500} height={300} data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="expense" fill={token.colorPrimary} />
                            <Bar dataKey="budget" fill={token.colorSuccess} />
                        </BarChart>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Weekly Spending Trend">
                        <LineChart width={500} height={300} data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="amount"
                                stroke={token.colorPrimary}
                            />
                        </LineChart>
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <Card title="Spending by Category">
                        <PieChart width={500} height={300}>
                            <Pie
                                data={categoryData}
                                cx={250}
                                cy={150}
                                innerRadius={60}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Budget Overview">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic
                                    title="Total Budget"
                                    value={50000}
                                    precision={2}
                                    prefix="₹"
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="Remaining"
                                    value={34360}
                                    precision={2}
                                    prefix="₹"
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export { DashboardComponent };
