import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import GoalProgressCard from "./GoalProgressCard";
import { useAppSelector } from "@/app/hook";
import useGetAllGoals from "@/custom-hooks/goals/useGetAllGoals";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { selectUserGoals } from "@/features/goal/goalSlice";

function SavingGoalsCard() {
  useGetAllGoals();
  const { data: goals } = useAppSelector(selectUserGoals);

  return (
    <div className="border h-full p-2 rounded-2xl  border-zinc-800 lg:col-span-2 flex flex-col  gap-3">
      <div className="w-full flex items-start justify-between">
        <h1 className="font-normal text-xl">Saving goals</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/goals">
                <span className="inline-block border border-zinc-800 p-2 rounded-full  hover:border-white transition-all duration-300">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-black border-zinc-800 text-white">
              <p>View all</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="w-full flex flex-col gap-2">
        {goals.map((goal) => {
          const progres = Math.ceil(
            (goal.savedAlready / goal.targetAmount) * 100
          );

          return (
            <GoalProgressCard
              key={goal._id}
              goalName={goal.name}
              progress={progres}
              targetAmount={goal.targetAmount}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SavingGoalsCard;
