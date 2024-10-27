import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-zinc-950 text-zinc-100 rounded-md  ", className)}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 ",
        month: "space-y-4 bg-zinc-950 rounded-lg p-4  ",
        caption:
          "flex justify-center pt-1 relative items-center text-zinc-300 ",
        caption_label: "text-sm font-medium text-zinc-400 ",
        nav: "space-x-1 flex items-center ",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-zinc-800 text-zinc-300 p-0  hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1 border-none",
        nav_button_next: "absolute right-1 border-none",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-zinc-600 rounded-md w-9 font-normal text-[0.8rem] dark:text-zinc-500",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center  text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected])]:bg-zinc-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal text-zinc-200 aria-selected:opacity-100 "
        ),
        day_range_end: "day-range-end bg-zinc-100 text-zinc-950",
        day_selected:
          "bg-zinc-100  font-semibold hover:bg-zinc-100 focus:bg-zinc-100 text-zinc-950",
        day_today: "bg-zinc-800 text-zinc-300  rounded-md ",
        day_outside: "text-zinc-500 opacity-40 dark:text-zinc-500",
        day_disabled: "text-zinc-700 opacity-50 dark:text-zinc-600",
        day_range_middle: "aria-selected:bg-zinc-800 aria-selected:text-white",
        day_hidden: "invisible opacity-0",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-4 w-4 text-zinc-400" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4 text-zinc-400" />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
