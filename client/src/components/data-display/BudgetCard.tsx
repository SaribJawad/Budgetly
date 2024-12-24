import { Pencil } from "lucide-react";
import BudgetStatusCard from "../status/BudgetStatusCard";
import { useState } from "react";
import EditBudgetPopup from "../popups/EditBudgetPopup";
import { Budget } from "@/@types/Types";
import { formatCurrency } from "@/lib/utils";

interface BudgetCardProps {
  budget: Budget;
}

function BudgetCard({ budget }: BudgetCardProps) {
  const [togglePopup, setTogglePopup] = useState<string | null>(null);
  const handleTogglePopup = (budgetId: string) => {
    setTogglePopup(togglePopup === budgetId ? null : budgetId);
  };

  const handleClosePopup = (): void => {
    setTogglePopup(null);
  };

  const leftAmount = budget.amount - budget.spentAmount;
  const percentCompleted = Math.ceil(
    (budget.spentAmount / budget.amount) * 100
  );

  return (
    <div className="border  border-zinc-800 p-2 pb-4 rounded-2xl flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            {budget.name}{" "}
            <span className="text-zinc-600 text-sm">{`(${budget.period})`}</span>
          </h2>
          <p className="text-zinc-600 text-sm">
            Wallet: <span>{budget.walletName}</span>
          </p>
        </div>
        <button
          onClick={() => handleTogglePopup(budget._id)}
          className="rounded-full p-2 border border-zinc-800 hover:border-white"
        >
          <Pencil size={18} />
        </button>
      </div>

      <div className="  flex items-center justify-around">
        {/* radial progress */}
        <div
          className="radial-progress text-center bg-[#09090B]  text-[#917FFF]  "
          style={
            {
              "--value": percentCompleted,
              "--size": "8rem",
              "--thickness": ".5rem",
            } as React.CSSProperties
          }
          role="progressbar"
        >
          <h5 className="text-xs text-zinc-500">Total spent</h5>
          <span className="text-white text-md font-semibold">
            {formatCurrency(budget.spentAmount)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-xs text-zinc-500">Left</h5>
          <h2 className="text-xl font-semibold">
            {formatCurrency(leftAmount)}{" "}
            <span className="text-xs text-[#8E7CFF]">
              /{formatCurrency(budget.amount)}
            </span>
          </h2>
          <BudgetStatusCard
            totalBudget={budget.amount}
            spentAmount={budget.spentAmount}
          />
        </div>
      </div>
      {togglePopup && (
        <EditBudgetPopup onClose={handleClosePopup} budget={budget} />
      )}
    </div>
  );
}

export default BudgetCard;
