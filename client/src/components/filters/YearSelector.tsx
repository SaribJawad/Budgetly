import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface YearSelectorProps {
  year: number;
  setYear: (arg: number) => void;
}

function YearSelector({ year, setYear }: YearSelectorProps) {
  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );
  return (
    <Select
      defaultValue={year.toString()}
      onValueChange={(value) => {
        setYear(Number(value));
      }}
    >
      <SelectTrigger className="border p-5 rounded-xl text-md border-zinc-800 w-auto flex items-center   gap-1 outline-none">
        <SelectValue placeholder="This year" className="" />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem
            className="text-start  text-md "
            key={year}
            value={year.toString()}
          >
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default YearSelector;
