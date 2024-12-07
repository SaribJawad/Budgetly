import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { RotateCcw } from "lucide-react";
import { period } from "@/constants/constants";

interface BudgetFilterButtonsProps {
  setPeriod: (arg: "Week" | "Month" | "Year" | "None") => void;
}

function BudgetFilterButtons({ setPeriod }: BudgetFilterButtonsProps) {
  return (
    <div className="flex gap-2">
      <Select onValueChange={(e: "Week" | "Month" | "Year") => setPeriod(e)}>
        <SelectTrigger
          className="w-fit flex gap-3 p-[17px] text-md rounded-full "
          style={{
            outline: "none",
            boxShadow: "none",
          }}
        >
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {period.map((val) => (
              <SelectItem key={val} className="block" value={val}>
                {val}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        onClick={() => setPeriod("None")}
        variant="ghost"
        size="sm"
        className="rounded-full hover:bg-[#8470FF] hover:text-white"
      >
        <RotateCcw /> Reset
      </Button>
    </div>
  );
}

export default BudgetFilterButtons;
