import { Budget } from "@/@types/Types";
import BudgetStatusCard from "../status/BudgetStatusCard";
import { formatCurrency } from "@/lib/utils";

interface MonthlyBudgetProgressCardProps {
  budgets: Budget[] | null;
}

function MonthlyBudgetProgressCard({
  budgets,
}: MonthlyBudgetProgressCardProps) {
  const { totalSpentAmount, totalBudgetAmount } = budgets?.reduce(
    (total, budget) => {
      return {
        totalSpentAmount: total.totalSpentAmount + budget.spentAmount,
        totalBudgetAmount: total.totalBudgetAmount + budget.amount,
      };
    },
    { totalBudgetAmount: 0, totalSpentAmount: 0 }
  ) || { totalBudgetAmount: 0, totalSpentAmount: 0 };

  const amountLeftPercentage = totalBudgetAmount
    ? Math.ceil(
        ((totalBudgetAmount - totalSpentAmount) / totalBudgetAmount) * 100
      )
    : 0;

  const totalSpentPercentage = totalBudgetAmount
    ? Math.ceil((totalSpentAmount / totalBudgetAmount) * 100)
    : 0;

  return (
    <div className="border h-fit border-zinc-800 rounded-2xl p-2 flex flex-col  gap-3 pb-4">
      <div>
        <h2 className="text-lg font-semibold">Total budget</h2>
        <div className="flex  justify-between gap-2 ">
          <span className="text-md sm:text-xl font-normal">
            {formatCurrency(totalBudgetAmount)}
          </span>
          {totalBudgetAmount ? (
            <BudgetStatusCard
              totalBudget={totalBudgetAmount}
              spentAmount={totalSpentAmount}
            />
          ) : (
            ""
          )}
        </div>
      </div>

      {/* radial */}
      <div className="flex justify-center items-center w-full">
        <div
          className="radial-progress text-center bg-zinc-950 text-[#917FFF]"
          style={
            {
              "--value": totalSpentPercentage,
              "--size": "clamp(8rem, 50vw, 13rem)",
              "--thickness": "calc(clamp(8rem, 50vw, 13rem) * 0.077)",
            } as React.CSSProperties
          }
          role="progressbar"
        >
          <div className="flex flex-col items-center justify-center">
            <h5 className="text-xs sm:text-sm text-zinc-500">Total spent</h5>
            <span className="text-white text-sm sm:text-md font-normal">
              {formatCurrency(totalSpentAmount)}
            </span>
          </div>
        </div>
      </div>

      <div className="self-end text-center">
        <h5 className="text-zinc-500">{amountLeftPercentage}% left</h5>
        <span className="text-sm sm:text-lg font-normal">
          {formatCurrency(totalBudgetAmount - totalSpentAmount)}
        </span>
      </div>
    </div>
  );
}

export default MonthlyBudgetProgressCard;
