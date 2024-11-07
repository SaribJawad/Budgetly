import { Progress } from "../ui/progress";

function GoalProgressCard() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xs">Macbook</h2>
        <span className="text-xs text-[#917FFF]">$123</span>
      </div>
      <Progress value={82} className="h-3" />
    </div>
  );
}

export default GoalProgressCard;
