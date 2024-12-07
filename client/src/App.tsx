import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AuthLayout from "./components/layout/AuthLayout";
import MainLayout from "./components/layout/MainLayout";
import TransactionsPage from "./pages/TransactionsPage";
import WalletPage from "./pages/WalletPage";
import GoalsPages from "./pages/GoalsPages";
import BudgetPage from "./pages/BudgetPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingPage from "./pages/SettingPage";
import CreateWalletPage from "./pages/CreateWalletPage";

export function App() {
  return (
    <Routes>
      <Route path="create-wallet" element={<CreateWalletPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route
          path="/transactions/:pageNum?/:limit?"
          element={<TransactionsPage />}
        />
        <Route path="/wallet/" element={<WalletPage />} />
        <Route path="/goals" element={<GoalsPages />} />
        <Route path="/budgets" element={<BudgetPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingPage />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}
