import { useAppSelector } from "@/app/hook";
import ExpenseCard from "./ExpenseCard";
import { selectExpenseTransactions } from "@/features/transactions/transactionsSlice";
import { LoadingSpinner } from "../ui/LoadingSpinner";

function MostExpensesCard() {
  const {
    data: expenseTransactions,
    status: expenseTransactionsStatus,
    error: expenseTransactionsError,
  } = useAppSelector(selectExpenseTransactions);
  return (
    <div className="flex-1 w-full border border-zinc-800 p-2 rounded-2xl flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold">Most expenses</h2>
      </div>

      {expenseTransactionsStatus === "loading" ? (
        <div className="h-full w-full flex items-center justify-center">
          <LoadingSpinner size={50} />
        </div>
      ) : expenseTransactionsStatus === "error" ? (
        <div className="h-full w-full flex items-center justify-center">
          <p>{expenseTransactionsError}</p>
        </div>
      ) : (
        <div className="overflow-y-auto max-h-[320px] ">
          {expenseTransactions.length >= 1 ? (
            expenseTransactions.map((transations) => (
              <ExpenseCard
                key={transations._id}
                amount={transations.amount}
                category={transations.category}
              />
            ))
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <p>No most expenses found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MostExpensesCard;
