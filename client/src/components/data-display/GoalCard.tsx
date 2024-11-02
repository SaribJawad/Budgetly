import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

function GoalCard() {
  return (
    <div className="border w-[300px] border-zinc-800 shrink-0 p-2 rounded-lg flex flex-col gap-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">MacBook Pro</h2>
          <p className="text-xs text-zinc-500">Due date - 7 Oct 2024</p>
        </div>
        <Button
          size="sm"
          className="rounded-full  h-10 bg-black w-10 border border-zinc-800 hover:border-white"
        >
          <Pencil size={20} />
        </Button>
      </div>

      <div className="flex items-end gap-1">
        <h2 className="text-4xl font-semibold">$512.0</h2>/
        <span className="text-sm font-normal text-[#917FFF]">$10241</span>
      </div>

      <div className="flex flex-col gap-1">
        <Progress value={50} className="h-3" />
        <div className="flex justify-between items-center">
          <h4 className="text-sm text-zinc-500">Left to complete the goal</h4>
          <span className="text-sm font-semibold">$123.00</span>
        </div>
      </div>
    </div>
  );
}

export default GoalCard;
