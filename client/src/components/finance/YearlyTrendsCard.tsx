import { Bar } from "react-chartjs-2";

function YearlyTrendsCard() {
  const datasets = [
    {
      label: "Saving",
      data: [30, 20, 100],
      backgroundColor: "#ffffff",
      hoverBackgroundColor: "#ffffff",
    },
    {
      label: "Income",
      data: [100, 300, 400],
      backgroundColor: "#6df285",

      hoverBackgroundColor: "#57bc6a",
    },
    {
      label: "Expense",
      data: [40, 90, 500],
      backgroundColor: "#dd6868",

      hoverBackgroundColor: "#c34d4d",
    },
  ];

  return (
    <div className="border w-full h-[300px] pb-8 border-zinc-800 rounded-2xl p-2">
      <h1 className="font-semibold text-xl">Yearly trends</h1>
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
          datasets: datasets, // Pass sorted datasets here
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true },
          },
        }}
        width={"100%"}
      />
    </div>
  );
}

export default YearlyTrendsCard;
