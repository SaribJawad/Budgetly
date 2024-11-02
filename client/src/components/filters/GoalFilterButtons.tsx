import { RotateCcw } from "lucide-react";
import { Button } from "../ui/button";

interface GoalFilterButtonsProps {
  filter: "All" | "In progress" | "Completed";
  setFilter: (arg: "All" | "In progress" | "Completed") => void;
}

function GoalFilterButtons({ filter, setFilter }: GoalFilterButtonsProps) {
  return (
    <div className="flex items-center gap-2 ">
      <Button
        onClick={() => setFilter("In progress")}
        size="sm"
        className={`border  bg-black rounded-full  ${
          filter === "In progress"
            ? "border-[#917FFF] text-[#917FFF]"
            : "border-zinc-800 text-white"
        } `}
      >
        In Progress
      </Button>
      <Button
        onClick={() => setFilter("Completed")}
        size="sm"
        className={`border border-zinc-800 bg-black rounded-full  ${
          filter === "Completed"
            ? "border-[#917FFF] text-[#917FFF]"
            : "border-zinc-800 text-white"
        } `}
      >
        Completed
      </Button>
      <Button
        onClick={() => setFilter("All")}
        variant="ghost"
        size="sm"
        className="rounded-full hover:bg-[#8470FF] hover:text-white"
      >
        <RotateCcw /> Reset
      </Button>
    </div>
  );
}

export default GoalFilterButtons;
