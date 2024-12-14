import { useState } from "react";
import GoalCard from "./GoalCard";
import { Goal } from "@/@types/Types";
import EmptySection from "../ui/EmptySection";

interface GoalsDisplaySection {
  goals: Goal[];
  filter: "all" | "inProgress" | "completed";
}

function GoalsDisplaySection({ goals, filter }: GoalsDisplaySection) {
  const [toggleEditPopup, setToggleEditPopup] = useState<boolean>(false);
  const [toggleGoalPopup, setToggleGoalPopup] = useState<boolean>(false);

  const filteredGoals =
    filter === "completed"
      ? goals.filter((goal) => goal.goalReached)
      : filter === "inProgress"
      ? goals.filter((goal) => !goal.goalReached)
      : goals;

  const handleToggleGoalPopup = (): void => {
    setToggleGoalPopup((prev) => !prev);
  };

  const handleToggleEditPopup = (): void => {
    setToggleEditPopup((prev) => !prev);
  };

  const handleCloseGoalsPopup = (): void => {
    setToggleGoalPopup(false);
    setToggleEditPopup(false);
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
              isEditGoalPopupOpen={toggleEditPopup}
              isGoalPopupOpen={toggleGoalPopup}
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
