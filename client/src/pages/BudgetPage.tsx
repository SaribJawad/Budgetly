import { useAppSelector } from "@/app/hook";
import BudgetsDisplaySection from "@/components/data-display/BudgetsDisplaySection";
import MonthlyBudgetProgressCard from "@/components/data-display/MonthlyBudgetProgressCard";
import MostExpensesCard from "@/components/data-display/MostExpensesCard";
import BudgetFilterButtons from "@/components/filters/BudgetFilterButtons";
import Header from "@/components/navigation/Header";
import CreateBudgetPopup from "@/components/popups/CreateBudgetPopup";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import useGetAllBudgets from "@/custom-hooks/budget/useGetAllBudgets";
import { selectAllBudgets } from "@/features/budget/budgetSlice";
import { useEffect, useState } from "react";

function BudgetPage() {
  useGetAllBudgets();
  const { data: budgets, status, error } = useAppSelector(selectAllBudgets);

  const [togglePopup, setTogglePopup] = useState<boolean>(false);
  const [period, setPeriod] = useState<"Week" | "Month" | "Year" | "All">(
    "All"
  );
  const handleClosePopup = (): void => {
    setTogglePopup(false);
  };

  useEffect(() => {
    if (togglePopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [togglePopup]);

  if (status === "loading") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  return (
    <div className="h-full w-full p-2 flex flex-col gap-3">
      <Header heading={"Budget"} note={"Create and track your budgets"} />
      <div className="grid md2:grid-cols-3 grid-cols-1 gap-3 w-full  md2:h-full">
        <div className="md2:col-span-2 col-span-1 flex flex-col gap-3   ">
          <div className="flex items-center justify-between">
            <BudgetFilterButtons setPeriod={setPeriod} period={period} />
            <Button
              onClick={() => setTogglePopup((prev) => !prev)}
              size="sm"
              className="bg-[#8470FF] hover:bg-[#6C5FBC] hover:text-white rounded-full  border-zinc-800 w-fit text-md font-medium"
              variant="outline"
            >
              Add new Budget
            </Button>
          </div>

          <BudgetsDisplaySection budgets={budgets} period={period} />
        </div>

        <div className="col-span-1  h-full  flex flex-col gap-3 ">
          <MonthlyBudgetProgressCard budgets={budgets} />
          <MostExpensesCard />
        </div>
      </div>
      {togglePopup && <CreateBudgetPopup onClose={handleClosePopup} />}
    </div>
  );
}

export default BudgetPage;
