import {
  WalletMinimal,
  ArrowRightLeft,
  Goal,
  ChartLine,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

// Menu items.
const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Transactions", url: "/transactions", icon: ArrowRightLeft },
  { title: "Wallet", url: "/wallet/:wallet", icon: WalletMinimal },
  { title: "Goals", url: "#", icon: Goal },
  { title: "Analytics", url: "#", icon: ChartLine },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
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
                    className={` text-lg ${
                      location.pathname === item.url
                        ? "bg-white"
                        : "hover:bg-zinc-800"
                    }  `}
                  >
                    <Link
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
    </Sidebar>
  );
}
