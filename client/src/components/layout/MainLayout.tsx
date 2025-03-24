import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../navigation/AppSideBar";
import { useAppSelector } from "@/app/hook";
import {
  selectAuthenticationState,
  selectWalletCreatedOnce,
} from "@/features/auth/authSlice";
import useGetAllTranscations from "@/custom-hooks/transactions/useGetAllTransactions";
import useGetMonthlyFlow from "@/custom-hooks/analytics/useGetMonthlyFlow";
import useGetExpenseTransactions from "@/custom-hooks/transactions/useGetExpenseTransactions";
import useGetUserWallet from "@/custom-hooks/wallet/useGetUserWallet";
import { useEffect } from "react";

function MainLayout() {
  const navigate = useNavigate();
  useGetAllTranscations();
  useGetMonthlyFlow();
  useGetExpenseTransactions();
  useGetUserWallet();
  const isAuthenticated = useAppSelector(selectAuthenticationState);
  const createdWalletOnce = useAppSelector(selectWalletCreatedOnce);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
    }
    if (!createdWalletOnce && isAuthenticated) {
      return navigate("create-wallet");
    }
  }, [isAuthenticated]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full h-auto bg-black flex   text-white ">
        <div className="relative ">
          <SidebarTrigger className="absolute top-5 left-[40%] w-7 h-7 z-30 ml-1 " />
        </div>
        <Outlet />
      </div>
    </SidebarProvider>
  );
}

export default MainLayout;
