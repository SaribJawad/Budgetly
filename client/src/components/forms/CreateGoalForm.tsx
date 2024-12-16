import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
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
import { FormData } from "@/custom-hooks/goals/useAddGoal";
import { LoadingSpinner } from "../ui/LoadingSpinner";

interface CreateGoalFormProps {
  handleAddGoal: (arg: FormData) => void;
  isAddGoalPending: boolean;
}

const createGoalSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 letters."),
  targetAmount: z
    .number()
    .min(1, "Invalid amount")
    .positive("Target amount is required"),
  goalDeadline: z.date().refine(
    (date) => {
      const today = new Date();
      // today.setHours(0, 0, 0, 0);
      return date > today;
    },
    {
      message: "Invalid deadline",
    }
  ),
  savedAlready: z.number().optional(),
});

function CreateGoalForm({
  handleAddGoal,
  isAddGoalPending,
}: CreateGoalFormProps) {
  const form = useForm<z.infer<typeof createGoalSchema>>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      name: "",
      targetAmount: 0,
      goalDeadline: new Date(),
      savedAlready: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof createGoalSchema>) => {
    handleAddGoal(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} action="">
        <div className="grid lg:grid-cols-2 grid-cols-2 gap-3 min-w-[320px]">
          <FormField
            disabled={isAddGoalPending}
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
                  Name your goal.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          <FormField
            disabled={isAddGoalPending}
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
                  Target amount of your goal.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          <FormField
            disabled={isAddGoalPending}
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
                  Amount you have saved already.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          <FormField
            disabled={isAddGoalPending}
            name="goalDeadline"
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
                  Add deadline for the goal.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center mt-8">
          <Button
            disabled={isAddGoalPending}
            type="submit"
            variant="default"
            size="sm"
            className="h-10 w-32 bg-[#8470FF] hover:bg-[#6C5FBC] text-md"
          >
            {isAddGoalPending ? <LoadingSpinner /> : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateGoalForm;
