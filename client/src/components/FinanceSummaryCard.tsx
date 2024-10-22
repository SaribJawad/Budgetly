import { MoveUp } from "lucide-react";

function FinanceSummaryCard() {
  return (
    <div className="border border-zinc-800 h-36 flex justify-between flex-col py-2 px-3 rounded-2xl">
      <h3 className="font-bold">Total balance</h3>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">$15,800</h1>
        <p className="text-xs flex items-center gap-2 text-zinc-500">
          <span className="p-1 bg-[#b3d4b5] rounded-full text-[10px] text-green-700 flex items-center font-bold">
            <MoveUp size={10} strokeWidth={3} /> 12.1%{" "}
          </span>
          vs last month
        </p>
      </div>
    </div>
  );
}

export default FinanceSummaryCard;
