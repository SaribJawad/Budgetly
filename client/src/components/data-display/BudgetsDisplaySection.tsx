import { Budget } from "@/@types/Types";
import BudgetCard from "./BudgetCard";
import EmptySection from "../ui/EmptySection";

interface BudgetsDisplaySectionProps {
  budgets: Budget[] | null;
  period: "Week" | "Month" | "Year" | "None";
}

function BudgetsDisplaySection({
  budgets,
  period,
}: BudgetsDisplaySectionProps) {
  const filteredBudgets =
    period === "None"
      ? budgets
      : budgets?.filter((budget) => budget.period === period);

  return (
    <div className="flex flex-col gap-3">
      {filteredBudgets && filteredBudgets?.length < 1 ? (
        <EmptySection
          title="No Budgets Found"
          description="You haven't added any budgets yet. Start by creating one to track your spending and manage your finances effortlessly!"
        />
      ) : (
        <>
          <h4 className="text-sm text-zinc-500">
            {filteredBudgets?.length}{" "}
            {filteredBudgets && filteredBudgets?.length > 1
              ? "budgets"
              : "budget"}
          </h4>
          <div className="grid xl2:grid-cols-3 sm2:grid-cols-2 grid-cols-1  gap-3">
            {filteredBudgets?.map((budget) => (
              <BudgetCard key={budget._id} budget={budget} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BudgetsDisplaySection;
