import ExpenseCard from "./ExpenseCard";

function MostExpensesCard() {
  return (
    <div className="h-1/2 w-full border border-zinc-800 p-2 rounded-2xl flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold">Most expenses</h2>
      </div>

      <div className="overflow-y-auto max-h-[320px] ">
        <ExpenseCard />
        <ExpenseCard />
        <ExpenseCard />
        <ExpenseCard />
      </div>
    </div>
  );
}

export default MostExpensesCard;
