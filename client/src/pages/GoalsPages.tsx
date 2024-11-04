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

function GoalsPages() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [togglePopup, setTogglePopup] = useState<boolean>(false);
  const [toggleEditPopup, setToggleEditPopup] = useState<boolean>(false);

  const [filter, setFilter] = useState<"All" | "In progress" | "Completed">(
    "All"
  );

  const handleOnClose = (): void => {
    setTogglePopup(false);
    setToggleEditPopup(false);
  };

  const handleEditPopup = (): void => {
    setToggleEditPopup((prev) => !prev);
  };

  useEffect(() => {
    if (togglePopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [togglePopup]);

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
      <GoalsDisplaySection handleToggleEditPopup={handleEditPopup} />
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-3">
        <TotalGoals />
        <SavingsOverviewCard />
      </div>
      {togglePopup && <CreateGoalPopup onClose={handleOnClose} />}
      {toggleEditPopup && <EditGoalPopup onClose={handleOnClose} />}
    </div>
  );
}

export default GoalsPages;
