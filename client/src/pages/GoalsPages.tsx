import Header from "@/components/navigation/Header";
import YearSelector from "@/components/filters/YearSelector";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import GoalFilterButtons from "@/components/filters/GoalFilterButtons";
import GoalsDisplaySection from "@/components/data-display/GoalsDisplaySection";
import TotalGoals from "@/components/data-display/TotalGoals";
import SavingsOverviewCard from "@/components/finance/SavingsOverviewCard";
import CreateGoalPopup from "@/components/popups/CreateGoalPopup";
import EditGoalPopup from "@/components/popups/EditGoalPopup";
import useGetAllGoals from "@/custom-hooks/useGetAllGoals";
import { useAppSelector } from "@/app/hook";
import { selectUserGoals } from "@/features/goal/goalSlice";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import useGetSavingOverview from "@/custom-hooks/useGetSavingOverview";

function GoalsPages() {
  useGetAllGoals();
  useGetSavingOverview();

  const { data: goals, status } = useAppSelector(selectUserGoals);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [togglePopup, setTogglePopup] = useState<boolean>(false);
  const [toggleEditPopup, setToggleEditPopup] = useState<boolean>(false);

  const [editGoal, setEditGoal] = useState<string>("");

  const [filter, setFilter] = useState<"All" | "In progress" | "Completed">(
    "All"
  );

  const handleOnClose = (): void => {
    setTogglePopup(false);
    setToggleEditPopup(false);
  };

  const handleEditPopup = (goalId: string): void => {
    setToggleEditPopup((prev) => !prev);
    setEditGoal(goalId);
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

      <div className="w-full  flex items-center justify-between  ">
        <YearSelector year={year} setYear={setYear} />
        <Button
          onClick={() => setTogglePopup((prev) => !prev)}
          size="lg"
          className="bg-[#8470FF] hover:bg-[#6C5FBC] hover:text-white rounded-xl  border-zinc-800 w-fit text-md font-medium"
          variant="outline"
        >
          Add new Goal
        </Button>
      </div>

      <GoalFilterButtons filter={filter} setFilter={setFilter} />
      <GoalsDisplaySection
        handleToggleEditPopup={handleEditPopup}
        goals={goals}
      />
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-3">
        <TotalGoals goals={goals} />
        <SavingsOverviewCard />
      </div>
      {togglePopup && <CreateGoalPopup onClose={handleOnClose} />}
      {toggleEditPopup && <EditGoalPopup onClose={handleOnClose} />}
    </div>
  );
}

export default GoalsPages;
