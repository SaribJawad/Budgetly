function FeaturesSection() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="flex flex-col items-center">
        <h3 className="font-medium text-sm">Track Transactions</h3>
        <p className="text-xs text-zinc-500">
          Easily monitor your spending and income.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="font-medium text-sm">Achieve Saving Goals</h3>
        <p className="text-xs text-zinc-500">
          Set and reach your financial goals effortlessly.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="font-medium text-sm">View Analytics</h3>
        <p className="text-xs text-zinc-500">
          Gain insights into your financial habits.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="font-medium text-sm">Create Budgets</h3>
        <p className="text-xs text-zinc-500">
          Plan your expenses with custom budgets.
        </p>
      </div>
    </div>
  );
}

export default FeaturesSection;
