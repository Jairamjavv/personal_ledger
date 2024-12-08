import { Route, Routes } from "react-router-dom";
import { DashboardComponent } from "../components/DashboardComponent";
import { TransactionComponent } from "../components/TransactionComponent";
import { AccountComponent } from "../components/AccountComponent";

const BrowserRouterComponent: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardComponent />} />
            <Route path="/dashboard" element={<DashboardComponent />} />
            <Route path="/transaction" element={<TransactionComponent />} />
            <Route path="/account" element={<AccountComponent />} />
        </Routes>
    );
};

export { BrowserRouterComponent };
