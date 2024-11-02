import GoalCard from "./GoalCard";

function GoalsDisplaySection() {
  return (
    <div className="grid gap-2 ">
      <h4 className="text-sm text-zinc-500">4 goals</h4>

      <div className="flex gap-3 w-auto    overflow-x-auto ">
        <GoalCard />
        <GoalCard />
        <GoalCard />
        <GoalCard />
        <GoalCard />
      </div>
    </div>
  );
}

export default GoalsDisplaySection;
