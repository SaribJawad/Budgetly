import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthDetailsPanel from "../promo/AuthDetailsPanel";
import { useAppSelector } from "@/app/hook";
import { selectAuthenticationState } from "@/features/auth/authSlice";
import { useEffect } from "react";

function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectAuthenticationState);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    } else if (!isAuthenticated && location.pathname === "/auth") {
      navigate("/auth/login", { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center   text-white  p-5">
      <Outlet />
      <AuthDetailsPanel />
    </div>
  );
}

export default AuthLayout;
