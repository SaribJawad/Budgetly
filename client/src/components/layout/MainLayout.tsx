import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../navigation/AppSideBar";

function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full h-auto bg-black flex   text-white ">
        <div className="relative ">
          <SidebarTrigger className="absolute top-5 left-[40%] w-7 h-7 z-50 ml-1 " />
        </div>
        <Outlet />
      </div>
    </SidebarProvider>
  );
}

export default MainLayout;
