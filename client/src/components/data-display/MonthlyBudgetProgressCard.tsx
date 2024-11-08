import BudgetStatusCard from "../status/BudgetStatusCard";

function MonthlyBudgetProgressCard() {
  return (
    <div className="border h-1/2 border-zinc-800 rounded-2xl p-2 flex flex-col gap-3 pb-4">
      <h2 className="text-lg font-semibold">Monthly budget</h2>

      <div>
        <div className="flex flex-col gap-2 ">
          <span className="text-3xl font-semibold">$214.00</span>
          <BudgetStatusCard />
        </div>
      </div>

      {/* radial */}
      <div
        className="radial-progress text-center self-center bg-zinc-950  text-[#917FFF]  "
        style={
          {
            "--value": 50,
            "--size": "13rem",
            "--thickness": "1rem",
          } as React.CSSProperties
        }
        role="progressbar"
      >
        <h5 className="text-sm text-zinc-500">Total spent</h5>
        <span className="text-white text-3xl font-semibold">$124</span>
      </div>

      <div className="self-end text-center">
        <h5 className="text-zinc-500">55% left</h5>
        <span className="text-lg font-semibold">$213.00</span>
      </div>
    </div>
  );
}

export default MonthlyBudgetProgressCard;
