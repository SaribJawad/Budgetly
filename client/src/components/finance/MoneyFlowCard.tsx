import { Bar } from "react-chartjs-2";

function MoneyFlowCard() {
  return (
    <div className="border p-2 pb-9 rounded-2xl  border-zinc-800 h-60   lg:col-span-2 ">
      <h1 className="font-bold">Money flow</h1>
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
              data: [100, 300, 400],
              backgroundColor: "#917FFF",
              hoverBackgroundColor: "#6c5fbc",
            },

            {
              label: "Expense",
              data: [40, 90, 500],
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
      />
    </div>
  );
}

export default MoneyFlowCard;
