import { categories } from "@/constants/constants";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { Budget } from "@/@types/Types";
import useShowToast from "@/custom-hooks/useShowToast";
import { EditBudgetData } from "@/custom-hooks/budget/useEditBudget";
import { useForm } from "react-hook-form";

interface EditBudgetFormProps {
  isDeleteBudgetPending: boolean;
  handleDeleteBudget: (budgetId: string) => void;
  budget: Budget;
  isEditBudgetPending: boolean;
  handleEditBudget: (values: EditBudgetData) => void;
}

const PeriodEnum = z.enum(["Week", "Month", "Year"]);

const editBudgetSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 letters"),
  period: PeriodEnum,
  amount: z.number().min(1, "Invalid amount").positive("Amount is required"),
  category: z.string().min(1, "Category is required"),
});

function EditBudgetForm({
  isDeleteBudgetPending,
  handleDeleteBudget,
  budget,
  isEditBudgetPending,
  handleEditBudget,
}: EditBudgetFormProps) {
  const showToast = useShowToast();
  const initialValues = {
    name: budget.name,
    period: budget.period as "Week" | "Month" | "Year",
    amount: budget.amount,
    category: budget.category,
  };

  const form = useForm<z.infer<typeof editBudgetSchema>>({
    resolver: zodResolver(editBudgetSchema),
    defaultValues: initialValues,
  });

  const filteredCategories = categories.filter(
    (category) => category !== "Others" && category !== "Income"
  );

  const isFormUpdated = (values: z.infer<typeof editBudgetSchema>) => {
    return (
      values.amount !== initialValues.amount ||
      values.category !== initialValues.category ||
      values.name !== initialValues.name ||
      values.period !== initialValues.period
    );
  };

  const onSubmit = (values: z.infer<typeof editBudgetSchema>) => {
    if (isFormUpdated(values)) {
      const editBudgetData = Object.assign(
        {},
        values.amount !== initialValues.amount && { amount: values.amount },
        values.category !== initialValues.category && {
          category: values.category,
        },
        values.name !== initialValues.name && {
          name: values.name,
        },
        values.period !== initialValues.period && {
          period: values.period,
        }
      );

      handleEditBudget({ formData: editBudgetData, budgetId: budget._id });
    } else {
      showToast({
        variant: "destructive",
        description:
          "No changes were made. Please update at least one field to update.",
      });
    }
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
                    disabled={isDeleteBudgetPending || isEditBudgetPending}
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
                    disabled={isDeleteBudgetPending || isEditBudgetPending}
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
                    disabled={isDeleteBudgetPending || isEditBudgetPending}
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
            name="period"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Period</FormLabel>
                <FormControl>
                  <Select
                    disabled={isDeleteBudgetPending || isEditBudgetPending}
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
                      <SelectItem className="text-start block" value={"Week"}>
                        Week
                      </SelectItem>
                      <SelectItem className="text-start block" value={"Month"}>
                        Month
                      </SelectItem>
                      <SelectItem className="text-start block" value={"Year"}>
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
            disabled={isDeleteBudgetPending || isEditBudgetPending}
            type="submit"
            variant="default"
            size="sm"
            className="h-9 w-32 bg-[#8470FF] hover:bg-[#6C5FBC] text-md"
          >
            {isEditBudgetPending ? <LoadingSpinner /> : "Edit"}
          </Button>
        </div>
        <Button
          disabled={isDeleteBudgetPending || isEditBudgetPending}
          onClick={() => handleDeleteBudget(budget._id)}
          type="button"
          variant="destructive"
          size="sm"
          className=" self-end h-9 w-fit text-md"
        >
          {isDeleteBudgetPending ? <LoadingSpinner /> : <Trash2 />}
        </Button>
      </form>
    </Form>
  );
}

export default EditBudgetForm;
