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
  period: "Week" | "Month" | "Year" | "All";
  setPeriod: (arg: "Week" | "Month" | "Year" | "All") => void;
}

function BudgetFilterButtons({
  setPeriod,
  period: periodState,
}: BudgetFilterButtonsProps) {
  return (
    <div className="flex gap-2">
      <Select
        value={periodState}
        onValueChange={(e: "Week" | "Month" | "Year") => setPeriod(e)}
      >
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
        onClick={() => setPeriod("All")}
        variant="ghost"
        size="sm"
        className="rounded-full hover:bg-[#8470FF] hover:text-white transition-all duration-300"
      >
        <RotateCcw /> Reset
      </Button>
    </div>
  );
}

export default BudgetFilterButtons;
