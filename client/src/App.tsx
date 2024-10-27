import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AuthLayout from "./components/layout/AuthLayout";
import MainLayout from "./components/layout/MainLayout";
import TransactionsPage from "./pages/TransactionsPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}
