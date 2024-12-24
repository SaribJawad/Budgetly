import { motion } from "framer-motion";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import useMarkGoalAsReached from "@/custom-hooks/goals/useMarkGoalAsReached";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { Goal } from "@/@types/Types";
import useAddSavedAmount from "@/custom-hooks/goals/useAddSavedAmount";
import useShowToast from "@/custom-hooks/useShowToast";
import { formatCurrency } from "@/lib/utils";

interface GoalCardPopupProps {
  handleCloseGoalPopup: () => void;
  isDeleteGoalPending: boolean;
  handleDeleteGoal: (arg: string) => void;
  goal: Goal;
}

function GoalCardPopup({
  handleCloseGoalPopup,
  goal,
  handleDeleteGoal,
  isDeleteGoalPending,
}: GoalCardPopupProps) {
  const showToast = useShowToast();

  const { mutateAsync: addSavedAmount, isPending: isAddSavedAmountPending } =
    useAddSavedAmount();
  const { mutateAsync: setGoalAsReached, isPending: isGoalAsReachedPending } =
    useMarkGoalAsReached();

  const [addSaveAmount, setAddSaveAmount] = useState<boolean>(false);
  const [savedAmount, setSavedAmount] = useState<number>(0);
  const fadeInVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: -20 },
    exit: { opacity: 0, y: -20 },
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleAddSavedAmount = async (
    e: React.FormEvent,
    goalId: string,
    savedAmount: number
  ) => {
    e.preventDefault();
    const leftAmount = goal.targetAmount - goal.savedAlready;
    if (savedAmount > leftAmount) {
      showToast({
        variant: "destructive",
        description: `The amount you're trying to save (${savedAmount}) exceeds the remaining goal amount (${leftAmount}). Please adjust the value.`,
      });
      return;
    }
    await addSavedAmount({ goalId, savedAmount });
    setAddSaveAmount(false);
    setSavedAmount(0);
    handleCloseGoalPopup();
  };

  const handleGoalReached = async (goalId: string) => {
    await setGoalAsReached({ goalId });
  };

  const goalCompletedPercent = Math.ceil(
    (goal.savedAlready / goal.targetAmount) * 100
  );

  return (
    <motion.div
      onClick={
        !isGoalAsReachedPending &&
        !isDeleteGoalPending &&
        !isAddSavedAmountPending
          ? handleCloseGoalPopup
          : undefined
      }
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeInVariants}
      transition={{ duration: 0.3 }}
      className="fixed  top-5   left-0 transform -translate-x-1/2 -translate-y-1/2  bg-black bg-opacity-80 z-30 h-full  w-full  "
    >
      <div
        className="w-auto flex flex-col items-center gap-6 p-4  h-auto bg-black border border-zinc-800 rounded-lg absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2"
        onClick={handlePopupClick}
      >
        <div className="flex items-center justify-between w-[300px]">
          <div>
            <h2 className="text-2xl font-semibold">{goal.name}</h2>
            <span className=" text-sm text-zinc-500">
              Due date - {goal.goalDeadline}
            </span>
          </div>
          <Button
            disabled={
              isDeleteGoalPending ||
              isAddSavedAmountPending ||
              isGoalAsReachedPending
            }
            onClick={handleCloseGoalPopup}
            variant="ghost"
            className="w-1 h-8"
          >
            <X />
          </Button>
        </div>
        <div className="flex flex-col gap-7 items-center">
          {/* radial progress */}
          <div
            className="radial-progress text-[#917FFF] bg-zinc-950 "
            style={
              {
                "--value": goalCompletedPercent,
                "--size": "12rem",
                "--thickness": "1rem",
              } as React.CSSProperties
            }
            role="progressbar"
          >
            <span className="text-white text-xl font-semibold">
              {formatCurrency(goal.savedAlready)}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-md text-zinc-500">Last added amount</h3>
            <span className="text-lg font-semibold">
              {formatCurrency(goal.lastAddedAmount)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {addSaveAmount ? (
            <form
              onSubmit={(e) => handleAddSavedAmount(e, goal._id, savedAmount)}
              className="flex items-center justify-center gap-3"
            >
              <input
                disabled={
                  isGoalAsReachedPending ||
                  isDeleteGoalPending ||
                  isAddSavedAmountPending
                }
                value={savedAmount}
                onChange={(e) => setSavedAmount(Number(e.target.value))}
                className="border border-zinc-800 bg-black rounded-lg h-10 outline-none p-2"
                type="number"
              />
              <Button
                disabled={
                  isGoalAsReachedPending ||
                  isDeleteGoalPending ||
                  isAddSavedAmountPending
                }
                size="sm"
                className="bg-[#917FFF]"
              >
                {isAddSavedAmountPending ? <LoadingSpinner /> : "Add"}
              </Button>
            </form>
          ) : (
            <Button
              disabled={
                isGoalAsReachedPending ||
                isDeleteGoalPending ||
                isAddSavedAmountPending
              }
              onClick={() => setAddSaveAmount((prev) => !prev)}
              size="lg"
              className="bg-[#917FFF]"
            >
              Add saved amount
            </Button>
          )}
          <div className="flex items-center gap-3 w-[300px]">
            <Button
              className="w-full"
              disabled={
                isGoalAsReachedPending ||
                isDeleteGoalPending ||
                isAddSavedAmountPending
              }
              onClick={() => handleGoalReached(goal._id)}
              size="lg"
              variant="ghost"
            >
              {isGoalAsReachedPending ? (
                <LoadingSpinner />
              ) : (
                "Set goal as reached"
              )}
            </Button>
            <Button
              disabled={
                isDeleteGoalPending ||
                isGoalAsReachedPending ||
                isAddSavedAmountPending
              }
              variant="destructive"
              size="lg"
              onClick={() => handleDeleteGoal(goal._id)}
            >
              {isDeleteGoalPending ? <LoadingSpinner /> : "Delete"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default GoalCardPopup;
