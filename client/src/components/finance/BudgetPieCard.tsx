import { useAppSelector } from "@/app/hook";
import useGetAllBudgets from "@/custom-hooks/budget/useGetAllBudgets";
import { selectAllBudgets } from "@/features/budget/budgetSlice";
import { Pie } from "react-chartjs-2";

interface Budget {
  name: string;
  value: number;
  color: string;
}
function BudgetPieCard() {
  useGetAllBudgets();
  const { data: userBudgets } = useAppSelector(selectAllBudgets);

  const generateRandomColor = (): string => {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  };

  const budgets: Budget[] | undefined = userBudgets?.map((budget) => ({
    name: budget.name,
    value: budget.amount,
    color: generateRandomColor(),
  }));

  const totalBudgetAmount = budgets
    ?.filter((budget) => budget.value)
    .reduce((acc, budget) => acc + budget.value, 0);

  const datasets = budgets
    ? [
        {
          data: budgets.map((budget) => budget?.value),
          backgroundColor: budgets.map((budget) => budget?.color),
          hoverBackgroundColor: budgets.map((budget) => `${budget?.color}88`),
          borderWidth: 0,
        },
      ]
    : [];

  return (
    <div className="border p-2 rounded-2xl    h-full  border-zinc-800  ">
      <div className="flex flex-col justify-between items-start w-full">
        <h1 className="font-normal text-xl">Budget</h1>
        <p className="text-sm text-zinc-500 overflow-hidden whitespace-nowrap text-ellipsis max-w-xs ">
          Total budget for this month - {totalBudgetAmount}
        </p>
      </div>
      <div className="relative  h-52  w-full">
        <Pie
          data={{
            labels: budgets && budgets.map((budget) => budget.name),
            datasets: datasets,
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            aspectRatio: 4,
            layout: {
              padding: {
                left: 0,
                right: -500,
                top: 30,
                bottom: 20,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default BudgetPieCard;
