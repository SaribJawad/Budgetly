import { period } from "@/constants/constants";
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

function BudgetFilterButtons() {
  return (
    <div className="flex gap-2">
      <Select>
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
        // onClick={() => setFilter("All")}
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
