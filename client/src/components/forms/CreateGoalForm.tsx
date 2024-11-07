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

const createGoalSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 letters."),
  targetAmount: z
    .number()
    .min(1, "Invalid amount")
    .positive("Target amount is required"),
  goalDealLine: z.date().refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    },
    {
      message: "Invalid deadline",
    }
  ),
  savedAlready: z.number().optional(),
  note: z.string().optional(),
});

function CreateGoalForm() {
  const form = useForm<z.infer<typeof createGoalSchema>>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      name: "",
      targetAmount: 0,
      goalDealLine: new Date(),
      savedAlready: 0,
      note: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createGoalSchema>) => {
    console.log(values);
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
                  Name your goal.
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
                  Target amount of your goal.
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
                  Amount you have saved already.
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
                  Add deadline for the goal.
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
                  Note / description.
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

export default CreateGoalForm;
