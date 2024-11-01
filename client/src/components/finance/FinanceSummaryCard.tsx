import { MoveUp } from "lucide-react";

function FinanceSummaryCard() {
  return (
    <div className="border border-zinc-800 h-full flex justify-between flex-col  py-2 px-3 rounded-2xl">
      <h3 className="font-semibold sm:text-2xl text-sm">Total balance</h3>

      <div className="flex flex-col gap-2">
        <h1 className="sm:text-4xl text-3xl font-semibold">$15,800</h1>
        <p className="sm:text-sm text-xs flex items-center gap-2 text-zinc-500">
          <span className="p-1 bg-[#b3d4b5] rounded-full text-sm  text-green-700 flex items-center sm:font-semibold font-normal">
            <MoveUp size={10} strokeWidth={3} /> 12.1%{" "}
          </span>
          vs last month
        </p>
      </div>
    </div>
  );
}

export default FinanceSummaryCard;
