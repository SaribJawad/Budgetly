import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthDetailsPanel from "../promo/AuthDetailsPanel";

function AuthLayout() {
  const location = useLocation();

  if (location.pathname === "/auth") {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="h-screen w-full bg-black flex   text-white  p-5">
      <Outlet />
      <AuthDetailsPanel />
    </div>
  );
}

export default AuthLayout;
