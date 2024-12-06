import FinanceSummaryAnalyticsCard from "@/components/finance/FinanceSummaryAnalyticsCard";
import TopSpendingCategoriesCard from "@/components/data-display/TopSpendingCategoriesCard";
import TotalBalanceOverviewCard from "@/components/finance/TotalBalanceOverviewCard";
import YearlyTrendsCard from "@/components/finance/YearlyTrendsCard";
import Header from "@/components/navigation/Header";
import useGetYearlyTrends from "@/custom-hooks/useGetYearlyTrends";

function AnalyticsPage() {
  useGetYearlyTrends();

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
          <TotalBalanceOverviewCard />
          <YearlyTrendsCard />
        </div>
        <TopSpendingCategoriesCard />
      </div>
    </div>
  );
}

export default AnalyticsPage;
