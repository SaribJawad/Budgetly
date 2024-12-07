import { Navigate, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../navigation/AppSideBar";
import { useAppSelector } from "@/app/hook";
import {
  selectAuthenticationState,
  selectWalletCreatedOnce,
} from "@/features/auth/authSlice";
import useGetAllTranscations from "@/custom-hooks/useGetAllTransactions";
import useGetMonthlyFlow from "@/custom-hooks/useGetMonthlyFlow";

function MainLayout() {
  useGetAllTranscations();
  useGetMonthlyFlow();
  const isAuthenticated = useAppSelector(selectAuthenticationState);
  const createdWalletOnce = useAppSelector(selectWalletCreatedOnce);

  if (!createdWalletOnce && isAuthenticated) {
    return <Navigate to="create-wallet" />;
  }

  return isAuthenticated ? (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full h-auto bg-black flex   text-white ">
        <div className="relative ">
          <SidebarTrigger className="absolute top-5 left-[40%] w-7 h-7 z-30 ml-1 " />
        </div>
        <Outlet />
      </div>
    </SidebarProvider>
  ) : (
    <Navigate to="/auth/login" />
  );
}

export default MainLayout;
