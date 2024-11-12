function FeaturesSection() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="flex flex-col items-center">
        <h3 className="font-medium text-md">Track Transactions</h3>
        <p className="text-sm text-zinc-500">
          Easily monitor your spending and income.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="font-medium text-md">Achieve Saving Goals</h3>
        <p className="text-sm text-zinc-500">
          Set and reach your financial goals effortlessly.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="font-medium text-md">View Analytics</h3>
        <p className="text-sm text-zinc-500">
          Gain insights into your financial habits.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="font-medium text-md">Create Budgets</h3>
        <p className="text-sm text-zinc-500">
          Plan your expenses with custom budgets.
        </p>
      </div>
    </div>
  );
}

export default FeaturesSection;
