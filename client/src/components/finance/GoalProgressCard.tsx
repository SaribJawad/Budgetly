import { Progress } from "../ui/progress";

interface GoalProgressCardProps {
  goalName: string;
  targetAmount: number;
  progress: number;
}

function GoalProgressCard({
  goalName,
  targetAmount,
  progress,
}: GoalProgressCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm capitalize">{goalName}</h2>
        <span className="text-sm text-[#917FFF]">{targetAmount}</span>
      </div>
      <Progress value={progress} className="h-3" />
    </div>
  );
}

export default GoalProgressCard;
