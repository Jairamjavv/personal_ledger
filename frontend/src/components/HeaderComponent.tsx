import { Typography, Layout, theme } from "antd";

import { NavbarComponent } from "./NavbarComponent";

const { Header } = Layout;
const { Title } = Typography;

interface NavbarProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const HeaderComponent: React.FC<NavbarProps> = ({
    isDarkMode,
    toggleTheme,
}) => {
    const { token } = theme.useToken();
    return (
        <Header
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 24px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                backgroundColor: token.colorBgContainer,
                borderBottom: `1px solid ${token.colorBorderSecondary}`,
            }}
        >
            <Title
                level={3}
                style={{
                    color: token.colorText,
                    margin: 0,
                    fontWeight: "bold",
                }}
            >
                Personal Ledger
            </Title>
            <NavbarComponent
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
            />
        </Header>
    );
};

export { HeaderComponent };
