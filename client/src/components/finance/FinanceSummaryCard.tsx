import { formatCurrency } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface FinanceSummaryCardProps {
  summary: {
    title: string;
    amount: number;
    percentageChange?: number;
  };
}

function FinanceSummaryCard({ summary }: FinanceSummaryCardProps) {
  const { title, amount, percentageChange } = summary;

  const isExpense = title.toLowerCase().includes("expense");

  const isPositiveChange = percentageChange
    ? (percentageChange || 0) > 0
    : undefined;

  const bgColorClass = isPositiveChange
    ? isExpense
      ? "bg-[#f8b4b4]"
      : "bg-[#b3d4b5]"
    : isExpense
    ? "bg-[#b3d4b5]"
    : "bg-[#f8b4b4]";

  const textColorClass = isPositiveChange
    ? isExpense
      ? "text-red-700"
      : "text-green-700"
    : isExpense
    ? "text-green-700"
    : "text-red-700";

  return (
    <div className="border border-zinc-800 h-full flex justify-between flex-col  py-2 px-3 lg:gap-24 gap-12 rounded-2xl">
      <h3 className="font-semibold sm:text-2xl text-sm flex flex-col">
        {title}{" "}
        {title !== "Total balance" && (
          <span className="text-sm text-zinc-600">This month</span>
        )}
      </h3>

      <div className="flex flex-col gap-2">
        <h1
          className={` ${
            title === "Total balance"
              ? "sm:text-3xl text-sm"
              : "sm:text-2xl text-sm "
          } font-light break-words whitespace-normal`}
        >
          {formatCurrency(amount)}
        </h1>
        {!title.toLowerCase().includes("balance") && (
          <p className="sm:text-sm text-xs flex items-center gap-2 text-zinc-500">
            <span
              className={`p-1 rounded-full text-sm flex items-center gap-1 sm:font-semibold font-normal ${bgColorClass} ${textColorClass}`}
            >
              {percentageChange && percentageChange > 1 ? (
                <ArrowUp size={10} strokeWidth={3} />
              ) : (
                <ArrowDown size={10} strokeWidth={3} />
              )}
              {percentageChange}%{" "}
            </span>
            vs last month
          </p>
        )}
      </div>
    </div>
  );
}

export default FinanceSummaryCard;
