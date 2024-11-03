import { useState } from "react";
import GoalCard from "./GoalCard";
import GoalCardPopup from "../popups/GoalCardPopup";

interface GoalsDisplaySection {
  handleToggleEditPopup: () => void;
}

function GoalsDisplaySection({ handleToggleEditPopup }: GoalsDisplaySection) {
  const [toggleGoalPopup, setToggleGoalPopup] = useState<boolean>(false);

  const handleToggleGoalPopup = (): void => {
    setToggleGoalPopup((prev) => !prev);
  };

  const handleCloseGoalPopup = (): void => {
    setToggleGoalPopup(false);
  };

  return (
    <div className="grid gap-2 ">
      <h4 className="text-sm text-zinc-500">4 goals</h4>

      <div className="flex gap-3 w-auto    overflow-x-auto ">
        <GoalCard
          handleToggleEditPopup={handleToggleEditPopup}
          handleToggleGoalPopup={handleToggleGoalPopup}
        />
      </div>
      {toggleGoalPopup && (
        <GoalCardPopup handleCloseGoalPopup={handleCloseGoalPopup} />
      )}
    </div>
  );
}

export default GoalsDisplaySection;
