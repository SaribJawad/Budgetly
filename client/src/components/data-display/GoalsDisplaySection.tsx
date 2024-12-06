import { useState } from "react";

import GoalCardPopup from "../popups/GoalCardPopup";
import GoalCard from "./GoalCard";

import { Goal } from "@/@types/Types";

interface GoalsDisplaySection {
  handleToggleEditPopup: (goalId: string) => void;
  goals: Goal[];
}

function GoalsDisplaySection({
  handleToggleEditPopup,
  goals,
}: GoalsDisplaySection) {
  const [toggleGoalPopup, setToggleGoalPopup] = useState<boolean>(false);

  const handleToggleGoalPopup = (): void => {
    setToggleGoalPopup((prev) => !prev);
  };

  const handleCloseGoalPopup = (): void => {
    setToggleGoalPopup(false);
  };

  return (
    <div className="grid gap-2  ">
      <h4 className="text-sm text-zinc-500">
        {goals.length} {goals.length === 1 ? "Goal" : "Goals"}{" "}
      </h4>

      <div className="flex gap-3 w-auto    overflow-x-auto ">
        {goals.map((goal) => (
          <GoalCard
            key={goal._id}
            handleToggleEditPopup={handleToggleEditPopup}
            handleToggleGoalPopup={handleToggleGoalPopup}
            goal={goal}
          />
        ))}
      </div>
      {toggleGoalPopup && (
        <GoalCardPopup handleCloseGoalPopup={handleCloseGoalPopup} />
      )}
    </div>
  );
}

export default GoalsDisplaySection;
