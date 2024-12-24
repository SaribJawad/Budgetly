import {
  CircleAlert,
  CircleCheck,
  Goal as GoalIcon,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Goal } from "@/@types/Types";
import EditGoalPopup from "../popups/EditGoalPopup";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import GoalCardPopup from "../popups/GoalCardPopup";
import useDeleteGoal from "@/custom-hooks/goals/useDeleteGoal";
import { formatCurrency } from "@/lib/utils";

interface GoalCardProps {
  handleToggleGoalPopup: (goalId: string) => void;
  onClose: () => void;
  isEditGoalPopupOpen: boolean;
  handleEditPopup: (goalId: string) => void;
  isGoalPopupOpen: boolean;
  goal: Goal;
}

function GoalCard({
  handleToggleGoalPopup,
  goal,
  onClose,
  isEditGoalPopupOpen,
  isGoalPopupOpen,
  handleEditPopup,
}: GoalCardProps) {
  const { mutateAsync: deleteGoal, isPending: isDeleteGoalPending } =
    useDeleteGoal();
  const leftAmount = goal.targetAmount - goal.savedAlready;
  const progress = (goal.savedAlready / goal.targetAmount) * 100;

  const handleDeleteGoal = async (goalId: string) => {
    await deleteGoal({ goalId });
  };

  return (
    <div className=" border w-[300px] border-zinc-800 shrink-0 p-2 rounded-lg flex flex-col justify-between gap-8 relative">
      {new Date(goal.goalDeadline) <= new Date() && !goal.goalReached && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer h-10 w-10 flex items-center justify-center bg-red-500 absolute rounded-t-lg bottom-0  z-10">
              <CircleAlert size={24} />
            </TooltipTrigger>
            <TooltipContent className="bg-red-300 border-red-300 text-white ">
              <p>Deadline passed. Review your progress.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {goal.goalReached && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer h-10 w-10 flex items-center justify-center bg-green-600 absolute rounded-t-lg bottom-0  z-10">
              <CircleCheck size={24} />
            </TooltipTrigger>
            <TooltipContent className="">
              <p>Goal completed. Great job!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">{goal.name}</h2>
          <p className="text-xs text-zinc-500">
            Due date - {goal.goalDeadline}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {goal.goalReached ? (
            <Button
              disabled={isDeleteGoalPending}
              onClick={() => handleDeleteGoal(goal._id)}
              size="sm"
              className="rounded-full  h-10 bg-red-500 w-10 border border-zinc-800 hover:border-red-800 hover:bg-red-500 transition-all duration-300"
            >
              <Trash2 size={20} />
            </Button>
          ) : (
            <>
              <Button
                onClick={() => handleToggleGoalPopup(goal._id)}
                aria-label="View Goal Details"
                size="sm"
                className="rounded-full  h-10 bg-black w-10 border border-zinc-800 hover:border-white transition-all duration-300"
              >
                <GoalIcon size={20} />
              </Button>
              <Button
                onClick={() => handleEditPopup(goal._id)}
                size="sm"
                className="rounded-full  h-10 bg-black w-10 border border-zinc-800 hover:border-white transition-all duration-300"
              >
                <Pencil size={20} />
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex items-end gap-1">
        <h2 className="text-4xl font-semibold">
          {formatCurrency(goal?.savedAlready)}
        </h2>
        /
        <span className="text-sm font-normal text-[#917FFF]">
          {formatCurrency(goal.targetAmount)}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <Progress value={progress} className="h-3" />
        <div className="flex justify-between items-center">
          <h4 className="text-sm text-zinc-500">Left to complete the goal</h4>
          <span className="text-sm font-semibold">
            {formatCurrency(leftAmount)}
          </span>
        </div>
      </div>
      {isEditGoalPopupOpen && <EditGoalPopup onClose={onClose} goal={goal} />}
      {isGoalPopupOpen && (
        <GoalCardPopup
          goal={goal}
          handleCloseGoalPopup={onClose}
          isDeleteGoalPending={isDeleteGoalPending}
          handleDeleteGoal={handleDeleteGoal}
        />
      )}
    </div>
  );
}

export default GoalCard;
