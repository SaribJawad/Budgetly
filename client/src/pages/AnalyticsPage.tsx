import FinanceSummaryAnalyticsCard from "@/components/finance/FinanceSummaryAnalyticsCard";
import TopSpendingCategoriesCard from "@/components/data-display/TopSpendingCategoriesCard";
import TotalBalanceOverviewCard from "@/components/finance/TotalBalanceOverviewCard";
import YearlyTrendsCard from "@/components/finance/YearlyTrendsCard";
import Header from "@/components/navigation/Header";
import useGetYearlyTrends from "@/custom-hooks/useGetYearlyTrends";
import useGetBalanceOverview from "@/custom-hooks/useGetBalanceOverview";
import {
  selectBalanceOverview,
  selectYearlyTrends,
} from "@/features/analytics/analyticSlice";
import { useAppSelector } from "@/app/hook";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

function AnalyticsPage() {
  useGetYearlyTrends();
  useGetBalanceOverview();

  const {
    data: yearlyTrends,
    status: yearlyTrendsStatus,
    error: yearlyTrendsError,
  } = useAppSelector(selectYearlyTrends);
  const {
    data: balanceOverview,
    status: balanceOverviewStatus,
    error: balanceOverviewError,
  } = useAppSelector(selectBalanceOverview);

  if (yearlyTrendsStatus === "loading" || balanceOverviewStatus === "loading") {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <LoadingSpinner size={40} />
      </div>
    );
  }
  return (
    <div className="h-full w-full p-2 flex flex-col gap-3">
      <Header
        heading={"Analytics"}
        note={"Detailed overview of your financial situation"}
      />
      <div className="grid md2:grid-cols-3 grid-cols-1 gap-3 ">
        <FinanceSummaryAnalyticsCard />
        <FinanceSummaryAnalyticsCard />
        <FinanceSummaryAnalyticsCard />
      </div>

      <div className="w-full grid xl:grid-cols-4 grid-cols-1 gap-3  ">
        <div className="col-span-3    flex flex-col gap-3 ">
          <TotalBalanceOverviewCard balanceOverview={balanceOverview} />
          <YearlyTrendsCard yearlyTrends={yearlyTrends} />
        </div>
        <TopSpendingCategoriesCard />
      </div>
    </div>
  );
}

export default AnalyticsPage;
