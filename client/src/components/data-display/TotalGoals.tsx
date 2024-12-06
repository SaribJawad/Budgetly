import { Timer, TimerOff } from "lucide-react";
import { Goal } from "@/@types/Types";

interface TotalGoalsProps {
  goals: Goal[];
}

function TotalGoals({ goals }: TotalGoalsProps) {
  const totalGoals = goals.length;
  const inProgressGoals = goals.filter(
    (goal) => goal.goalReached === false
  ).length;
  const finishedGoals = goals.filter(
    (goal) => goal.goalReached === true
  ).length;

  return (
    <div className="border border-zinc-800 rounded-xl col-span-1 h-[290px] p-4 flex flex-col justify-between">
      <div className="flex flex-col items-center gap-2  justify-between">
        <h1 className="text-xl font-semibold">Total goals</h1>
        <span className="text-2xl font-semibold">{totalGoals}</span>
      </div>
      <div>
        <div className="flex flex-col gap-2">
          {/* in progress */}
          <div className="w-full border border-zinc-800 p-2 rounded-full flex items-center justify-around">
            <Timer size={25} />

            <div className="flex flex-col items-center">
              <h3 className="text-green-400 text-md font-semibold">
                In progress
              </h3>
              <span className="text-xl font-bold">{inProgressGoals}</span>
            </div>
          </div>
          {/* comppleted */}
          <div className="w-full border border-zinc-800 p-2 rounded-full flex items-center justify-around">
            <TimerOff size={25} />

            <div className="flex flex-col items-center">
              <h3 className="text-red-400 text-md font-semibold">Finished</h3>
              <span className="text-xl font-bold">{finishedGoals}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalGoals;
