import { Layout, theme } from "antd";

const { Footer } = Layout;

const FooterComponent: React.FC = () => {
    const { token } = theme.useToken();
    return (
        <Footer
            style={{
                textAlign: "center",
                color: token.colorText,
                backgroundColor: token.colorBgContainer,
                borderTop: `1px solid ${token.colorBorderSecondary}`,
            }}
        >
            Personal Ledger ©{new Date().getFullYear()}. Developed by JRM.
        </Footer>
    );
};

export { FooterComponent };
