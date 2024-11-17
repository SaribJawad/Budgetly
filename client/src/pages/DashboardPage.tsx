import BudgetPieCard from "@/components/finance/BudgetPieCard";
import FinanceSummaryCard from "@/components/finance/FinanceSummaryCard";
import Header from "@/components/navigation/Header";
import MoneyFlowCard from "@/components/finance/MoneyFlowCard";
import RecentTransactionsCard from "@/components/finance/RecentTransactionsCard";
import SavingGoalsCard from "@/components/finance/SavingGoalsCard";
import { Chart, CategoryScale } from "chart.js/auto";
import { useAppSelector } from "@/app/hook";
import { selectUser } from "@/features/auth/authSlice";

function DashboardPage() {
  const user = useAppSelector(selectUser);
  Chart.register(CategoryScale);

  return (
    <div className="w-full min-h-screen p-2 flex flex-col  space-y-0 gap-3 sm:gap-9 lg:gap-3">
      <Header
        heading={`Welcome, ${user?.firstName}`}
        note={"It is the best time to manage your finance"}
      />
      <div className=" h-[240px] grid grid-cols-2 lg:grid-cols-4 gap-3  ">
        <FinanceSummaryCard />
        <FinanceSummaryCard />
        <FinanceSummaryCard />
        <FinanceSummaryCard />
      </div>
      <div className="h-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
        <div className="lg:col-span-2 md:col-span-2  ">
          <MoneyFlowCard />
        </div>
        <div className="lg:col-span-1 md:col-span-1 ">
          <BudgetPieCard />
        </div>

        <div className="lg:hidden md:col-span-1 ">
          <SavingGoalsCard />
        </div>

        <div className="lg:col-span-2 md:col-span-2 lg:hidden ">
          <RecentTransactionsCard />
        </div>

        <div className="lg:col-span-2 lg:row-span-1 lg:block hidden  ">
          <RecentTransactionsCard />
        </div>
        <div className="lg:col-span-1 lg:row-span-1 lg:block hidden  ">
          <SavingGoalsCard />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
