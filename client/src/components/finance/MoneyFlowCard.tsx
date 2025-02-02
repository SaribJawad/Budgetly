import { MonthlyFlow } from "@/@types/Types";
import { Bar } from "react-chartjs-2";

interface MoneyFlowCardProps {
  monthlyFlow: MonthlyFlow[] | null;
}

function MoneyFlowCard({ monthlyFlow }: MoneyFlowCardProps) {
  const income = monthlyFlow?.map((flow) => flow.income);
  const expense = monthlyFlow?.map((flow) => flow.expense);

  return (
    <div className="border p-2 pb-9 rounded-2xl  border-zinc-800 h-72 lg:col-span-2 md:col-span-2    ">
      <h1 className="font-normal text-xl">Money flow</h1>
      <Bar
        data={{
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Income",
              data: income,
              backgroundColor: "#917FFF",
              hoverBackgroundColor: "#6c5fbc",
            },

            {
              label: "Expense",
              data: expense,
              backgroundColor: "#C6BEFF",
              hoverBackgroundColor: "#cfcbeb",
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
          },
        }}
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
}

export default MoneyFlowCard;
