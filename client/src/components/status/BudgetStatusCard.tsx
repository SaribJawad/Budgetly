import { CircleAlert, CircleCheckBig, CircleX } from "lucide-react";

function BudgetStatusCard() {
  return (
    <div className="w-fit flex items-center gap-2 bg-green-800 bg-opacity-40 p-[5px] rounded-full">
      <CircleCheckBig color="green" size={18} />
      <p className="text-green-600 text-xs">on track</p>

      {/* <CircleAlert color="yellow" size={20} />
      <p className="text-yellow-300 text-sm">need attention</p> */}

      {/* <CircleX color="red" size={20} />
      <p className="text-red-600 text-sm">exeding</p> */}
    </div>
  );
}

export default BudgetStatusCard;
