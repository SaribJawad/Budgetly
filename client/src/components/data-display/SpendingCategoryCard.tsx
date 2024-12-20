interface SpendingCategoryCardProps {
  category: string;
  amount: number;
}

function SpendingCategoryCard({ category, amount }: SpendingCategoryCardProps) {
  return (
    <div className="w-full  border-b border-zinc-800 ">
      <div className="flex items-center justify-between gap-2 p-3">
        <h1 className="font-semibold">{category}</h1>
        <span>{amount}</span>
      </div>
    </div>
  );
}

export default SpendingCategoryCard;
