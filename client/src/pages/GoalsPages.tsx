import Header from "@/components/navigation/Header";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import GoalFilterButtons from "@/components/filters/GoalFilterButtons";
import GoalsDisplaySection from "@/components/data-display/GoalsDisplaySection";
import TotalGoals from "@/components/data-display/TotalGoals";
import SavingsOverviewCard from "@/components/finance/SavingsOverviewCard";
import CreateGoalPopup from "@/components/popups/CreateGoalPopup";
import useGetAllGoals from "@/custom-hooks/goals/useGetAllGoals";
import { useAppSelector } from "@/app/hook";

import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import useGetSavingOverview from "@/custom-hooks/analytics/useGetSavingOverview";
import { selectUserGoals } from "@/features/goal/goalSlice";

function GoalsPages() {
  useGetAllGoals();
  useGetSavingOverview();

  const { data: goals, status } = useAppSelector(selectUserGoals);
  const [togglePopup, setTogglePopup] = useState<boolean>(false);

  const [filter, setFilter] = useState<"all" | "inProgress" | "completed">(
    "all"
  );

  const handleOnClose = (): void => {
    setTogglePopup(false);
  };

  useEffect(() => {
    if (togglePopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [togglePopup]);

  if (status === "loading") {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  return (
    <div className="h-full w-full p-2 flex flex-col gap-3">
      <Header
        heading={"Goals"}
        note={"Create financial goals and manage your savings"}
      />

      <div className="w-full  flex justify-end  ">
        <Button
          onClick={() => setTogglePopup((prev) => !prev)}
          size="lg"
          className="bg-[#8470FF] hover:bg-[#6C5FBC]  hover:text-white rounded-xl  border-zinc-800 w-fit text-md font-medium"
          variant="outline"
        >
          Add new Goal
        </Button>
      </div>

      <GoalFilterButtons filter={filter} setFilter={setFilter} />
      <GoalsDisplaySection goals={goals} filter={filter} />
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-3">
        <TotalGoals goals={goals} />
        <SavingsOverviewCard />
      </div>
      {togglePopup && <CreateGoalPopup onClose={handleOnClose} />}
    </div>
  );
}

export default GoalsPages;
