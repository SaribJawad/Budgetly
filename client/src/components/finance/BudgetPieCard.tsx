import { Pie } from "react-chartjs-2";

function BudgetPieCard() {
  const budgets = [
    { name: "Rent", color: "#917FFF", value: 1000 },
    { name: "Groceries", color: "#C6BEFF", value: 300 },
    { name: "Utilities", color: "#FF6F61", value: 150 },
    { name: "Entertainment", color: "#6c5fbc", value: 400 },
    { name: "Transportation", color: "#00BFFF", value: 250 },
  ];

  const datasets = [
    {
      data: budgets.map((budget) => budget.value),
      backgroundColor: budgets.map((budget) => budget.color),
      hoverBackgroundColor: budgets.map((budget) => `${budget.color}88`),
      borderWidth: 0,
    },
  ];

  return (
    <div className="border p-2 rounded-2xl    h-full  border-zinc-800  ">
      <div className="flex flex-col justify-between items-start w-full">
        <h1 className="font-normal text-xl">Budget</h1>
        <p className="text-sm text-zinc-500 overflow-hidden whitespace-nowrap text-ellipsis max-w-xs ">
          Total budget for this month - $12321
        </p>
      </div>
      <div className="relative  h-52  w-full">
        <Pie
          data={{
            labels: budgets.map((budget) => budget.name),
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
