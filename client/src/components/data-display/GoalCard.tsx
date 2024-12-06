import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Goal } from "@/@types/Types";

interface GoalCardProps {
  handleToggleEditPopup: (goalId: string) => void;
  handleToggleGoalPopup: () => void;
  goal: Goal;
}

function GoalCard({
  handleToggleEditPopup,
  handleToggleGoalPopup,
  goal,
}: GoalCardProps) {
  const leftAmount = goal.targetAmount - goal.savedAlready;
  const progress = (goal.savedAlready / goal.targetAmount) * 100;

  return (
    <div
      onClick={handleToggleGoalPopup}
      className="cursor-pointer border w-[300px] border-zinc-800 shrink-0 p-2 rounded-lg flex flex-col gap-8"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">{goal.name}</h2>
          <p className="text-xs text-zinc-500">
            Due date - {goal.goalDeadline}
          </p>
        </div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleEditPopup(goal._id);
          }}
          size="sm"
          className="rounded-full  h-10 bg-black w-10 border border-zinc-800 hover:border-white"
        >
          <Pencil size={20} />
        </Button>
      </div>

      <div className="flex items-end gap-1">
        <h2 className="text-4xl font-semibold">{goal.savedAlready}</h2>/
        <span className="text-sm font-normal text-[#917FFF]">
          {goal.targetAmount}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <Progress value={progress} className="h-3" />
        <div className="flex justify-between items-center">
          <h4 className="text-sm text-zinc-500">Left to complete the goal</h4>
          <span className="text-sm font-semibold">{leftAmount}</span>
        </div>
      </div>
    </div>
  );
}

export default GoalCard;
