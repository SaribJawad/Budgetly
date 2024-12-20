interface ExpenseCardProps {
  amount: number;
  category: string;
}

function ExpenseCard({ amount, category }: ExpenseCardProps) {
  return (
    <div className="w-full flex items-center justify-between p-2">
      <h4 className="text-lg ">{category}</h4>
      <span className="text-lg font-semibold">{amount}</span>
    </div>
  );
}

export default ExpenseCard;
