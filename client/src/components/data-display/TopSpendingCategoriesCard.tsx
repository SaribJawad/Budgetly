import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SpendingCategoryCard from "./SpendingCategoryCard";

function TopSpendingCategoriesCard() {
  const [period, setPeriod] = useState<string>("month");

  return (
    <div className="border max-h-full border-zinc-800 col-span-1  rounded-2xl flex flex-col gap-5 p-2">
      <div className="flex items-start justify-between">
        <h1 className="font-semibold text-xl"> Top spending categories </h1>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger
            className="flex h-10 w-fit items-center gap-2"
            style={{
              boxShadow: "none",
              outline: "none",
            }}
          >
            <SelectValue placeholder="From wallet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className=" text-start block  " value="month">
              Month
            </SelectItem>
            <SelectItem className=" text-start block  " value="year">
              Year
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1 overflow-auto max-h-[540px]">
        {/*  category card */}
        <SpendingCategoryCard />
      </div>
    </div>
  );
}

export default TopSpendingCategoriesCard;
