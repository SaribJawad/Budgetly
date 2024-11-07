import BudgetCard from "./BudgetCard";

function BudgetsDisplaySection() {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm text-zinc-500">5 budgets</h4>
      <div className="grid xl2:grid-cols-3 sm2:grid-cols-2 grid-cols-1  gap-3">
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
      </div>
    </div>
  );
}

export default BudgetsDisplaySection;
