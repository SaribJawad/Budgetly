import {
  WalletMinimal,
  ArrowRightLeft,
  Goal,
  ChartLine,
  LayoutDashboard,
  Settings,
  PiggyBank,
  User2,
  ChevronUp,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useLogout } from "@/custom-hooks/auth/useLogout";
import { useAppSelector } from "@/app/hook";
import { selectUser } from "@/features/auth/authSlice";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

// Menu items.
const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Transactions", url: "/transactions", icon: ArrowRightLeft },
  { title: "Wallet", url: "/wallet", icon: WalletMinimal },
  { title: "Goals", url: "/goals", icon: Goal },
  { title: "Budget", url: "/budgets", icon: PiggyBank },
  { title: "Analytics", url: "/analytics", icon: ChartLine },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { mutateAsync: logout } = useLogout();
  const user = useAppSelector(selectUser);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { toggleSidebar } = useSidebar();

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const location = useLocation();
  return (
    <Sidebar collapsible="icon" className="border-zinc-800 ">
      <SidebarContent className="bg-black ">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white text-2xl mb-2">
            Budgetly
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="" key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={` text-md ${
                      location.pathname === item.url
                        ? "bg-white"
                        : "hover:bg-zinc-800"
                    }  `}
                  >
                    <Link
                      onClick={isSmallScreen ? toggleSidebar : undefined}
                      to={item.url}
                      className={`${
                        location.pathname === item.url
                          ? "text-black"
                          : "text-white"
                      }`}
                    >
                      <item.icon
                        className={` ${
                          location.pathname === item.url
                            ? "text-black"
                            : "text-white"
                        }    `}
                      />
                      <span
                        className={`${
                          location.pathname === item.url
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-black ">
        <SidebarMenu className="bg-black text-white  ">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-[#27272A] hover:text-white text-sm capitalize">
                  <User2 /> {`${user?.firstName} ${user?.lastName}`}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="bg-black text-white border-zinc-800 w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer "
                >
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
