import { ArrowLeftRight, LayoutGrid, MoveUp } from "lucide-react";

function FinanceSummaryAnalyticsCard() {
  return (
    <div className="border border-zinc-800 p-4 rounded-2xl flex flex-col gap-8">
      <h3 className="text-xl font-semibold">Total balance</h3>
      <span className="text-4xl font-semibold">$21321.00</span>

      <div className="flex justify-between items-center gap-2">
        <div className="flex flex-col gap-2">
          <p className="sm:text-sm text-xs flex items-center gap-2 text-zinc-500">
            <span className="p-1 bg-[#b3d4b5] rounded-full text-sm  text-green-700 flex items-center sm:font-semibold font-normal">
              <MoveUp size={10} strokeWidth={3} /> 12.1%{" "}
            </span>
          </p>
          <p className="text-sm text-zinc-500">
            You have extra{" "}
            <span className="text-white font-semibold">$1,500</span> compared to
            last month
          </p>
        </div>

        <div className="flex flex-col gap-2 ">
          <div className="flex items-center gap-2">
            <ArrowLeftRight
              size={32}
              className="bg-[#917FFF] p-2 rounded-full"
            />
            <p className="text-zinc-500 text-sm">50 transactions</p>
          </div>
          <div className="flex items-center gap-2">
            <LayoutGrid size={32} className="bg-[#917FFF] p-2 rounded-full" />
            <p className="text-zinc-500 text-sm">15 categories</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinanceSummaryAnalyticsCard;
