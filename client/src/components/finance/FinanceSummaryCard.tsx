import { ArrowDown, ArrowUp, MoveUp } from "lucide-react";

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

  console.log(isExpense, "is Expense");

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
    <div className="border border-zinc-800 h-full flex justify-between flex-col  py-2 px-3 rounded-2xl">
      <h3 className="font-semibold sm:text-2xl text-sm">{title}</h3>

      <div className="flex flex-col gap-2">
        {/* {TODO formate currecncy} */}
        <h1 className="lg:text-6xl md:text-4xl text-3xl  font-semibold">
          {amount}
        </h1>{" "}
        {}
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
