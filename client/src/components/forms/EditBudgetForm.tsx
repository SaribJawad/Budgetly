import { categories } from "@/constants/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

const PeriodEnum = z.enum(["week", "month", "year"]);

const editBudgetSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 letters"),
  period: PeriodEnum,
  amount: z.number().min(1, "Invalid amount").positive("Amount is required"),
  category: z.string().min(1, "Category is required"),
  wallet: z.string().min(1, "Wallet is required"),
});

function EditBudgetForm() {
  const form = useForm<z.infer<typeof editBudgetSchema>>({
    resolver: zodResolver(editBudgetSchema),
    defaultValues: {
      // Add budget values TODO
      name: "",
      period: "month",
      amount: 0,
      category: "Food & Drinks",
      wallet: "",
    },
  });

  const filteredCategories = categories.filter(
    (category) => category !== "Others" && category !== "Income"
  );

  const onSubmit = (values: z.infer<typeof editBudgetSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        action=""
        className="flex flex-col"
      >
        <div className="grid grid-cols-2 gap-3 min-w-[300px]">
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
                  Name your budget.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="amount"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Amount</FormLabel>
                <FormControl>
                  <Input
                    className="border text-sm border-zinc-800 bg-black h-10"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                    }}
                    type="number"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Budget amount.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="category"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Category</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      {...field}
                      className="flex h-10 items-center gap-2"
                      style={{
                        boxShadow: "none",
                        outline: "none",
                      }}
                    >
                      <SelectValue placeholder="Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredCategories.map((category) => (
                        <SelectItem
                          className="text-start block"
                          key={category}
                          value={category}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-sm">
                  Budget category.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="wallet"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Wallet</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      {...field}
                      className="flex h-10 items-center gap-2"
                      style={{
                        boxShadow: "none",
                        outline: "none",
                      }}
                    >
                      <SelectValue placeholder="For wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        className="text-start block"
                        value={"wallet1"}
                      >
                        Wallet 1
                      </SelectItem>
                      <SelectItem
                        className="text-start block"
                        value={"wallet2"}
                      >
                        Wallet 2
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-sm">
                  Choose wallet.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="period"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Period</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      {...field}
                      className="flex h-10 items-center gap-2"
                      style={{
                        boxShadow: "none",
                        outline: "none",
                      }}
                    >
                      <SelectValue placeholder="Period of budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="text-start block" value={"week"}>
                        Week
                      </SelectItem>
                      <SelectItem className="text-start block" value={"month"}>
                        Month
                      </SelectItem>
                      <SelectItem className="text-start block" value={"year"}>
                        Year
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-sm">
                  Budget period.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center gap-3 mt-8">
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="h-9 w-32 bg-[#8470FF] hover:bg-[#6C5FBC] text-md"
          >
            Create
          </Button>
        </div>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          className=" self-end h-9 w-fit text-md"
        >
          <Trash2 />
        </Button>
      </form>
    </Form>
  );
}

export default EditBudgetForm;
