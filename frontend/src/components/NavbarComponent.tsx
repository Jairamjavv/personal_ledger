import React from "react";
import { Link, useLocation } from "react-router";
import { Menu, Switch, theme } from "antd";
import { BulbOutlined } from "@ant-design/icons";

interface NavbarProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const NavbarComponent: React.FC<NavbarProps> = ({
    isDarkMode,
    toggleTheme,
}) => {
    const { token } = theme.useToken();
    const location = useLocation();

    const getSelectedKey = () => {
        const path = location.pathname;
        switch (path) {
            case "/dashboard":
                return "1";
            case "/transaction":
                return "2";
            case "/account":
                return "3";
            default:
                return "1";
        }
    };

    return (
        <Menu
            mode="horizontal"
            style={{
                backgroundColor: token.colorBgContainer,
                color: token.colorText,
            }}
            selectedKeys={[getSelectedKey()]}
        >
            <Menu.Item key={1} style={{ marginLeft: 10 }}>
                <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key={2} style={{ marginLeft: 10 }}>
                <Link to="/transaction">Transaction</Link>
            </Menu.Item>
            <Menu.Item key={3} style={{ marginLeft: 10 }}>
                <Link to="/account">Account</Link>
            </Menu.Item>
            <Menu.Item
                key="theme-switch"
                style={{ marginLeft: "auto", marginRight: 20 }}
            >
                <Switch
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    checkedChildren={<BulbOutlined />}
                    unCheckedChildren={<BulbOutlined />}
                />
            </Menu.Item>
        </Menu>
    );
};

export { NavbarComponent };
