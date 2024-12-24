import { useAppSelector } from "@/app/hook";
import SpendingCategoryCard from "./SpendingCategoryCard";
import { selectExpenseTransactions } from "@/features/transactions/transactionsSlice";
import { LoadingSpinner } from "../ui/LoadingSpinner";

function TopSpendingCategoriesCard() {
  const {
    data: expenseTransactions,
    status: expenseTransactionsStatus,

    // error: expenseTransactionsError,
  } = useAppSelector(selectExpenseTransactions);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const topSpendingCategories =
    expenseTransactions &&
    expenseTransactions
      .filter((transaction) => {
        if (!transaction?.createdAt) return false;
        const transactionDate = new Date(transaction.createdAt);
        return (
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear
        );
      })
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateA - dateB;
      });

  return (
    <div className="border max-h-full border-zinc-800 col-span-1  rounded-2xl flex flex-col gap-5 p-2">
      <div className="flex items-start justify-between">
        <h1 className="font-semibold text-xl">
          {" "}
          Top spending categories for this month{" "}
        </h1>
      </div>
      {expenseTransactionsStatus === "loading" ? (
        <div>
          <LoadingSpinner size={40} />
        </div>
      ) : (
        expenseTransactionsStatus === "success" && (
          <div className="flex flex-col gap-1 overflow-auto max-h-[540px]">
            {topSpendingCategories.length >= 1 ? (
              topSpendingCategories.map((spending) => (
                <SpendingCategoryCard
                  key={spending._id}
                  amount={spending.amount}
                  category={spending.category}
                />
              ))
            ) : (
              <div className="text-center">
                <p>No top spending categories found.</p>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default TopSpendingCategoriesCard;
