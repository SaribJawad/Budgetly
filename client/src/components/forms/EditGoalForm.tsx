import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarRange } from "lucide-react";
import { Calendar } from "../ui/calendar";

const editGoalSchema = z
  .object({
    name: z.string().min(4, "Name must be at least 4 letters.").optional(),
    targetAmount: z
      .number()
      .min(1, "Invalid amount")
      .positive("Target amount is required")
      .optional(),
    goalDealLine: z
      .date()
      .refine(
        (date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return date >= today;
        },
        { message: "Invalid deadline" }
      )
      .optional(),
    savedAlready: z.number().optional(),
    note: z.string().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field is required",
  });

function EditGoalForm() {
  const form = useForm<z.infer<typeof editGoalSchema>>({
    resolver: zodResolver(editGoalSchema),
    defaultValues: {
      // TODO: Add values from goal
      name: "",
      targetAmount: 0,
      goalDealLine: new Date(),
      savedAlready: 0,
      note: "",
    },
  });

  const onSubmit = (value: z.infer<typeof editGoalSchema>) => {
    console.log(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} action="">
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-3 min-w-[320px]">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Name</FormLabel>
                <FormControl>
                  <Input
                    className="border text-sm border-zinc-800 bg-black h-10"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                    }}
                    type="text"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Edit goal name.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="targetAmount"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Target amount</FormLabel>
                <FormControl>
                  <Input
                    className="border text-sm border-zinc-800 bg-black h-10 "
                    style={{
                      boxShadow: "none",
                      outline: "none",
                    }}
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Edit target amount.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="savedAlready"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Saved already.</FormLabel>
                <FormControl>
                  <Input
                    className="border text-sm border-zinc-800 bg-black h-10"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                    }}
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Edit saved already amount.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="goalDealLine"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Goal deadline</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="h-10 w-full col-span-1 text-sm font-normal  bg-black border-zinc-800"
                      >
                        <CalendarRange />
                        {field.value
                          ? format(field.value, "LLL dd, y")
                          : format(new Date(), "LLL dd, y")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        {...field}
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription className="text-sm">
                  Edit deadline for the goal.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="note"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="text-md">Note</FormLabel>
                <FormControl>
                  <Input
                    className="border text-sm border-zinc-800 bg-black h-10"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                    }}
                    type="text"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Edit note/description.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center mt-8">
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="h-10 w-32 bg-[#8470FF] hover:bg-[#6C5FBC] text-md"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EditGoalForm;
