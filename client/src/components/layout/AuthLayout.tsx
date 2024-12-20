import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthDetailsPanel from "../promo/AuthDetailsPanel";
import { useAppSelector } from "@/app/hook";
import { selectAuthenticationState } from "@/features/auth/authSlice";

function AuthLayout() {
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectAuthenticationState);

  if (location.pathname === "/auth") {
    return <Navigate to="/auth/login" replace />;
  }

  return !isAuthenticated ? (
    <div className="h-screen w-full bg-black flex items-center justify-center   text-white  p-5">
      <Outlet />
      <AuthDetailsPanel />
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default AuthLayout;
