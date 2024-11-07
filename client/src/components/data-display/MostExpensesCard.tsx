import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ExpenseCard from "./ExpenseCard";

function MostExpensesCard() {
  return (
    <div className="h-auto w-full border border-zinc-800 p-2 rounded-2xl flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold">Most expenses</h2>
        <Select defaultValue="Month">
          <SelectTrigger
            className="w-fit flex gap-2 items-center p-4 rounded-full text-sm"
            style={{
              outline: "none",
              boxShadow: "none",
            }}
          >
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem className="block" value="Month">
                This month
              </SelectItem>
              <SelectItem className="block" value="banana">
                This year
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-y-auto max-h-[320px] ">
        <ExpenseCard />
        <ExpenseCard />
        <ExpenseCard />
        <ExpenseCard />
      </div>
    </div>
  );
}

export default MostExpensesCard;
