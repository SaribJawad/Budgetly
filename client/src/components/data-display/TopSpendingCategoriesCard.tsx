import SpendingCategoryCard from "./SpendingCategoryCard";

function TopSpendingCategoriesCard() {
  return (
    <div className="border max-h-full border-zinc-800 col-span-1  rounded-2xl flex flex-col gap-5 p-2">
      <div className="flex items-start justify-between">
        <h1 className="font-semibold text-xl">
          {" "}
          Top spending categories for this month{" "}
        </h1>
      </div>
      <div className="flex flex-col gap-1 overflow-auto max-h-[540px]">
        <SpendingCategoryCard />
      </div>
    </div>
  );
}

export default TopSpendingCategoriesCard;
