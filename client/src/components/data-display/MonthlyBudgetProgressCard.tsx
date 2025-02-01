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

  const totalSpentPercetage = totalBudgetAmount
    ? Math.ceil((totalSpentAmount / totalBudgetAmount) * 100)
    : 0;

  return (
    <div className="border h-1/2 border-zinc-800 rounded-2xl p-2 flex flex-col gap-3 pb-4">
      <h2 className="text-lg font-semibold">Total budget</h2>

      <div>
        <div className="flex  justify-between gap-2 ">
          <span className="text-3xl font-semibold">
            {formatCurrency(totalBudgetAmount)}
          </span>
          {/* {totalBudgetAmount && ( */}
          <BudgetStatusCard
            totalBudget={totalBudgetAmount}
            spentAmount={totalSpentAmount}
          />
          {/* )} */}
        </div>
      </div>

      {/* radial */}
      <div
        className="radial-progress text-center self-center bg-zinc-950  text-[#917FFF]  "
        style={
          {
            "--value": totalSpentPercetage,
            "--size": "13rem",
            "--thickness": "1rem",
          } as React.CSSProperties
        }
        role="progressbar"
      >
        <h5 className="text-sm text-zinc-500">Total spent</h5>
        <span className="text-white text-3xl font-semibold">
          {formatCurrency(totalSpentAmount)}
        </span>
      </div>

      <div className="self-end text-center">
        <h5 className="text-zinc-500">{amountLeftPercentage}% left</h5>
        <span className="text-lg font-semibold">
          {formatCurrency(totalBudgetAmount - totalSpentAmount)}
        </span>
      </div>
    </div>
  );
}

export default MonthlyBudgetProgressCard;
