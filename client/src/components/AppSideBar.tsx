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
import { Link } from "react-router-dom";

// Menu items.
const items = [
  { title: "Dashboard", url: "/auth/login", icon: LayoutDashboard },
  { title: "Transactions", url: "#", icon: ArrowRightLeft },
  { title: "Wallet", url: "#", icon: WalletMinimal },
  { title: "Goals", url: "#", icon: Goal },
  { title: "Analytics", url: "#", icon: ChartLine },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-zinc-800 ">
      <SidebarContent className="bg-black ">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white text-1xl mb-2">
            Budgetly
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-zinc-800">
                    <Link to={item.url}>
                      <item.icon className="text-white " />
                      <span className="text-white  ">{item.title}</span>
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
