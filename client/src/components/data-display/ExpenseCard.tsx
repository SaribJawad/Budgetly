import { ArrowDown } from "lucide-react";

function ExpenseCard() {
  return (
    <div className="w-full flex items-center justify-between p-2">
      <div className="flex flex-col ">
        <span className="text-lg font-semibold">$524.00</span>
        <h4 className="text-sm text-zinc-500">Money transfer</h4>
      </div>
      <div className="flex gap-1 items-center bg-red-800 p-1 rounded-2xl bg-opacity-40 ">
        <ArrowDown color="red" size={20} />
        <span className="text-red-600">15.5%</span>
      </div>
    </div>
  );
}

export default ExpenseCard;
