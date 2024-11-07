import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import GoalProgressCard from "./GoalProgressCard";

function SavingGoalsCard() {
  return (
    <div className="border p-2 rounded-2xl  border-zinc-800 h-full  lg:col-span-2 flex flex-col  gap-3">
      <div className="w-full flex items-start justify-between">
        <h1 className="font-normal text-xl">Saving goals</h1>
        <Link to="">
          <span className="inline-block border border-zinc-800 p-2 rounded-full  hover:border-white">
            <ArrowUpRight size={16} />
          </span>
        </Link>
      </div>
      <div className="w-full flex flex-col gap-2">
        <GoalProgressCard />
        <GoalProgressCard />
        <GoalProgressCard />
      </div>
    </div>
  );
}

export default SavingGoalsCard;
