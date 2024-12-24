import { useAppSelector } from "@/app/hook";
import { months } from "@/constants/constants";
import { selectSavingOverview } from "@/features/analytics/analyticSlice";

import { Line } from "react-chartjs-2";

function SavingsOverviewCard() {
  const {
    data: savingsOverview,
    // status,
    // error,
  } = useAppSelector(selectSavingOverview);

  const totalIncome = savingsOverview?.map(
    (savingOverview) => savingOverview.totalIncome
  );
  const totalSavings = savingsOverview?.map(
    (savingOverview) => savingOverview.totalSavings
  );

  const data = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: totalIncome,
        fill: false,
        backgroundColor: "#90EE90",
        borderColor: "#90EE90",
      },

      {
        label: "Saving",
        data: totalSavings,
        fill: false,
        backgroundColor: "#917FFF",
        borderColor: "#917FFF",
        borderDash: [5, 5],
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
    <div className="border w-full h-[290px] pb-8 lg:col-span-3  border-zinc-800 rounded-2xl p-2">
      <h1 className="font-semibold text-xl">Savings overview</h1>
      <Line options={options} data={data} width={"100%"} />
    </div>
  );
}

export default SavingsOverviewCard;
