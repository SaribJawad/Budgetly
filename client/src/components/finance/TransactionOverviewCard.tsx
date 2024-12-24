import { Line } from "react-chartjs-2";
import { months } from "@/constants/constants";
import { useAppSelector } from "@/app/hook";
import { selectMonthlyFlow } from "@/features/analytics/analyticSlice";

function TransactionOverviewCard() {
  const { data: transactionOverview } = useAppSelector(selectMonthlyFlow);

  const income = transactionOverview?.map((flow) => flow.income);
  const expense = transactionOverview?.map((flow) => flow.expense);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: income,
        fill: false,
        backgroundColor: "#90EE90",
        borderColor: "#90EE90",
        // tension: 0.1,
      },
      {
        label: "Expense",
        data: expense,
        fill: false,
        backgroundColor: "#FF474D",
        borderColor: "#FF474D",
        // tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Sales Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="border w-full h-[50%] border-zinc-800 rounded-2xl p-2 pb-8">
      <h1 className="font-semibold text-xl ">Transaction overview</h1>
      <Line options={options} data={data} width={"100%"} />
    </div>
  );
}

export default TransactionOverviewCard;
