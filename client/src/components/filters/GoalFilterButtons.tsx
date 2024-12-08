import { RotateCcw } from "lucide-react";
import { Button } from "../ui/button";

interface GoalFilterButtonsProps {
  filter: "all" | "inProgress" | "completed";
  setFilter: (arg: "all" | "inProgress" | "completed") => void;
}

function GoalFilterButtons({ filter, setFilter }: GoalFilterButtonsProps) {
  return (
    <div className="flex items-center gap-2 ">
      <Button
        onClick={() => setFilter("inProgress")}
        size="sm"
        className={`border  bg-black rounded-full  ${
          filter === "inProgress"
            ? "border-[#917FFF] text-[#917FFF]"
            : "border-zinc-800 text-white"
        } `}
      >
        In Progress
      </Button>
      <Button
        onClick={() => setFilter("completed")}
        size="sm"
        className={`border border-zinc-800 bg-black rounded-full  ${
          filter === "completed"
            ? "border-[#917FFF] text-[#917FFF]"
            : "border-zinc-800 text-white"
        } `}
      >
        Completed
      </Button>
      <Button
        onClick={() => setFilter("all")}
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
