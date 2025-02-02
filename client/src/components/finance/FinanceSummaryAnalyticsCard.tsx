import { DetailedFinanceSummary } from "@/@types/Types";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeftRight, LayoutGrid } from "lucide-react";

interface FinanceSummaryAnalyticsCardProps extends DetailedFinanceSummary {}

function FinanceSummaryAnalyticsCard({
  title,
  totalAmount,
  totalCategories,
  totalTransactions,
}: FinanceSummaryAnalyticsCardProps) {
  return (
    <div className="border border-zinc-800 p-4 rounded-2xl flex flex-col gap-16 w-full">
      <h3 className="text-xl font-semibold">{title}</h3>

      <div className="flex flex-col justify-between items-start gap-4">
        <div className="w-full">
          <h1 className="text-4xl font-medium break-words whitespace-normal">
            {formatCurrency(totalAmount)}
          </h1>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <ArrowLeftRight
              size={32}
              className="bg-[#917FFF] p-2 rounded-full"
            />
            <p className="text-zinc-500 text-sm">
              {totalTransactions} transactions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <LayoutGrid size={32} className="bg-[#917FFF] p-2 rounded-full" />
            <p className="text-zinc-500 text-sm">
              {totalCategories} categories
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinanceSummaryAnalyticsCard;
