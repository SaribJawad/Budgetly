import { Line } from "react-chartjs-2";
import ChartJS from "@/ChartConfig";
import { months } from "@/constants/constants";

function TransactionOverviewCard() {
  const data = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: [65, 59, 80, 81, 56, 55, 0, 213],
        fill: false,
        backgroundColor: "#90EE90",
        borderColor: "#90EE90",
        // tension: 0.1,
      },
      {
        label: "Expense",
        data: [55, 29, 24, 81, 96, 55],
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