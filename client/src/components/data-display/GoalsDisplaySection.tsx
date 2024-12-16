import { useState } from "react";
import GoalCard from "./GoalCard";
import { Goal } from "@/@types/Types";
import EmptySection from "../ui/EmptySection";

interface GoalsDisplaySection {
  goals: Goal[];
  filter: "all" | "inProgress" | "completed";
}

function GoalsDisplaySection({ goals, filter }: GoalsDisplaySection) {
  const [toggleEditPopup, setToggleEditPopup] = useState<string | null>(null);
  const [toggleGoalPopup, setToggleGoalPopup] = useState<string | null>(null);

  const filteredGoals =
    filter === "completed"
      ? goals.filter((goal) => goal.goalReached)
      : filter === "inProgress"
      ? goals.filter((goal) => !goal.goalReached)
      : goals;

  const handleToggleGoalPopup = (goalId: string): void => {
    setToggleGoalPopup(toggleEditPopup === goalId ? null : goalId);
  };

  const handleToggleEditPopup = (goalId: string): void => {
    setToggleEditPopup(toggleEditPopup === goalId ? null : goalId);
  };

  const handleCloseGoalsPopup = (): void => {
    setToggleGoalPopup(null);
    setToggleEditPopup(null);
  };

  return (
    <div className="grid gap-2  ">
      <h4 className="text-sm text-zinc-500">
        {filteredGoals.length} {filteredGoals.length === 1 ? "Goal" : "Goals"}{" "}
      </h4>

      <div className="flex gap-3 w-auto    overflow-x-auto ">
        {filteredGoals.length >= 1 ? (
          filteredGoals.map((goal) => (
            <GoalCard
              key={goal._id}
              handleToggleGoalPopup={handleToggleGoalPopup}
              goal={goal}
              onClose={handleCloseGoalsPopup}
              isEditGoalPopupOpen={toggleEditPopup === goal._id}
              isGoalPopupOpen={toggleGoalPopup === goal._id}
              handleEditPopup={handleToggleEditPopup}
            />
          ))
        ) : (
          <div className="h-[200px]  w-full">
            <EmptySection
              title="No Goals Set Yet"
              description="Start setting your goals to track progress and achieve milestones!"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default GoalsDisplaySection;
