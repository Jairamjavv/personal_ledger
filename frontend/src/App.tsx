import React from "react";
import { Layout, ConfigProvider, theme } from "antd";
import { BrowserRouter } from "react-router-dom";

import { HeaderComponent } from "./components/HeaderComponent";
import { FooterComponent } from "./components/FooterComponent";
import { BrowserRouterComponent } from "./routes/BrowserRoutes";

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: "calc(100vh - 64px - 70px)",
    lineHeight: "120px",
    backgroundColor: "inherit",
};

const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "calc(100% - 4px)",
    maxWidth: "calc(100% - 4px)",
};

function App() {
    const [isDarkMode, setIsDarkMode] = React.useState(true);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode
                    ? theme.darkAlgorithm
                    : theme.defaultAlgorithm,
                token: {
                    colorPrimary: "#0958d9",
                },
            }}
        >
            <BrowserRouter>
                <Layout style={layoutStyle}>
                    <HeaderComponent
                        isDarkMode={isDarkMode}
                        toggleTheme={toggleTheme}
                    />
                    <Content style={contentStyle}>
                        <BrowserRouterComponent />
                    </Content>
                    <FooterComponent />
                </Layout>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
