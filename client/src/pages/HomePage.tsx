import BudgetPieCard from "@/components/BudgetPieCard";
import FinanceSummaryCard from "@/components/FinanceSummaryCard";
import Header from "@/components/Header";
import MoneyFlowCard from "@/components/MoneyFlowCard";
import RecentTransactionsCard from "@/components/RecentTransactionsCard";
import SavingGoalsCard from "@/components/SavingGoalsCard";
import { Chart, CategoryScale } from "chart.js/auto";

function HomePage() {
  Chart.register(CategoryScale);

  return (
    <div className="w-full p-2 flex flex-col space-y-3">
      <Header />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <FinanceSummaryCard />
        <FinanceSummaryCard />
        <FinanceSummaryCard />
        <FinanceSummaryCard />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 md:col-span-2">
          <MoneyFlowCard />
        </div>
        <div className="lg:col-span-1 md:col-span-1">
          <BudgetPieCard />
        </div>

        <div className="lg:hidden md:col-span-1">
          <SavingGoalsCard />
        </div>

        <div className="lg:col-span-2 md:col-span-2 lg:hidden">
          <RecentTransactionsCard />
        </div>

        <div className="lg:col-span-2 lg:row-span-1 lg:block hidden ">
          <RecentTransactionsCard />
        </div>
        <div className="lg:col-span-1 lg:row-span-1 lg:block hidden ">
          <SavingGoalsCard />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
