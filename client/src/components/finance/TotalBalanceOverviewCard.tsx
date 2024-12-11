import { BalanceOverview } from "@/@types/Types";
import { months } from "@/constants/constants";
import { Line } from "react-chartjs-2";

interface TotalBalanceOverviewCardProps {
  balanceOverview: BalanceOverview[] | null;
}

function TotalBalanceOverviewCard({
  balanceOverview,
}: TotalBalanceOverviewCardProps) {
  const thisYearBalance =
    balanceOverview &&
    balanceOverview[0].currentYearBalance.map(
      (balance) => balance.totalBalance
    );

  const lastYearBalance =
    balanceOverview &&
    balanceOverview[1].lastYearBalance.map((balance) => balance.totalBalance);

  const data = {
    labels: months,
    datasets: [
      {
        label: "This Year",
        data: thisYearBalance,
        fill: false,
        backgroundColor: "#917FFF",
        borderColor: "#917FFF",
      },

      {
        label: "L ast year",
        data: lastYearBalance,
        fill: false,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
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
    <div className="border w-full h-[300px]  pb-8  border-zinc-800 rounded-2xl p-2">
      <h1 className="font-semibold text-xl">Total balance overview</h1>
      <Line options={options} data={data} width={"100%"} />
    </div>
  );
}

export default TotalBalanceOverviewCard;
