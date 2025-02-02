import BudgetPieCard from "@/components/finance/BudgetPieCard";
import FinanceSummaryCard from "@/components/finance/FinanceSummaryCard";
import Header from "@/components/navigation/Header";
import MoneyFlowCard from "@/components/finance/MoneyFlowCard";
import RecentTransactionsCard from "@/components/finance/RecentTransactionsCard";
import SavingGoalsCard from "@/components/finance/SavingGoalsCard";
import { Chart, CategoryScale } from "chart.js/auto";
import { useAppSelector } from "@/app/hook";
import { selectUser } from "@/features/auth/authSlice";
import {
  selectFinanceSummary,
  selectMonthlyFlow,
} from "@/features/analytics/analyticSlice";
import useGetFinanceSummary from "@/custom-hooks/analytics/useGetFinanceSummary";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

function DashboardPage() {
  const { isLoading } = useGetFinanceSummary();

  const user = useAppSelector(selectUser);
  const financeSummary = useAppSelector(selectFinanceSummary);
  const { data, status } = useAppSelector(selectMonthlyFlow);

  Chart.register(CategoryScale);

  if (status === "loading") {
    return (
      <div className="h-full w-full flex items-center justify-center ">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-2 flex flex-col gap-3">
      <Header
        heading={`Welcome, ${user?.firstName}`}
        note={"It is the best time to manage your finance"}
      />

      {isLoading ? (
        <div className="h-[240px] w-full flex items-center justify-center">
          <LoadingSpinner className="text-white" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {financeSummary?.map((summary, index) => (
            <FinanceSummaryCard key={index} summary={summary} />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <MoneyFlowCard monthlyFlow={data} />
        </div>
        <div className="lg:col-span-1 md:col-span-2">
          <BudgetPieCard />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <RecentTransactionsCard />
        </div>
        <div className="lg:col-span-1 md:col-span-2">
          <SavingGoalsCard />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
