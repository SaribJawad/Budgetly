import {
  categories,
  paymentTypes,
  transactionsType,
} from "@/constants/constants";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { CalendarRange } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

const createTransactionSchema = z
  .object({
    amount: z.number().min(1, "Invalid amount").positive("Amount is required "),
    transactionType: z.enum(["Income", "Expense", "Transfer"]),
    note: z.string().optional(),
    category: z.string().optional(),
    payee: z.string().optional(),
    payer: z.string().optional(),
    fromWallet: z.string().optional(),
    toWallet: z.string().optional(),
    paymentType: z.enum([
      "Cash",
      "Debit card",
      "Credit card",
      "Bank transfer",
      "Voucher",
      "Mobile payment",
      "Web payment",
    ]),
    date: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.amount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["amount"],
        message: "Amount is required",
      });
    }

    if (
      data.transactionType === transactionsType.INCOME ||
      data.transactionType === transactionsType.EXPENSE
    ) {
      if (!data.fromWallet || !data.category) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["fromWallet", "category"],
          message: "From wallet and category is required",
        });
      }
      if (data.transactionType === transactionsType.INCOME && data.payee) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["payee"],
          message: "Payee is not allowed for income",
        });
      }
      if (data.transactionType === transactionsType.EXPENSE && data.payer) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["payer"],
          message: "Payer is not allowed for expense",
        });
      }
    } else if (data.transactionType === transactionsType.TRANSFER) {
      if (!data.fromWallet || !data.toWallet) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["fromWallet", "toWallet"],
          message:
            "From wallet and to wallet are required for transfer transaction",
        });
      }
      if (data.category) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["category"],
          message: "Category is not allowed for transfer transaction",
        });
      }
    }
  });

function CreateTransactionForm() {
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<string>("Income");
  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      transactionType: "Income",
      category: "Others",
      paymentType: "Cash",
      amount: 0,
      note: "",
      payee: "",
      payer: "",
      fromWallet: "temp",
      toWallet: "temp",
      date: new Date(),
    },
  });

  const handleTransactionTypeChange = (value: string) => {
    setSelectedTransactionType(value);
  };

  const onSubmit = (values: z.infer<typeof createTransactionSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} action="" className="">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          <FormField
            name="amount"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-xs">Amount</FormLabel>
                <FormControl>
                  <Input
                    className="border text-xs border-zinc-800 bg-black h-8"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                    }}
                    type="text"
                    min={1}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription className="text-[10px]">
                  Transaction amount.
                </FormDescription>
                <FormMessage className=" text-[10px]" />
              </FormItem>
            )}
          />
          <FormField
            name="transactionType"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-xs">Transaction type</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleTransactionTypeChange(value);
                    }}
                  >
                    <SelectTrigger
                      {...field}
                      className="flex h-8 items-center gap-2"
                      style={{
                        boxShadow: "none",
                        outline: "none",
                      }}
                    >
                      <SelectValue placeholder="Transaction type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(transactionsType).map(([key, value]) => (
                        <SelectItem
                          className="text-start block"
                          key={key}
                          value={value}
                        >
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-[10px]">
                  Transaction type.
                </FormDescription>
                <FormMessage className="text-[10px] " />
              </FormItem>
            )}
          />
          {selectedTransactionType !== transactionsType.TRANSFER && (
            <FormField
              name="category"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-xs">Category</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        {...field}
                        className="flex h-8 items-center gap-2"
                        style={{
                          boxShadow: "none",
                          outline: "none",
                        }}
                      >
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            className=" text-start block "
                            key={category}
                            value={category}
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-[10px]">
                    Choose category.
                  </FormDescription>
                  <FormMessage className=" text-[10px]" />
                </FormItem>
              )}
            />
          )}
          <FormField
            name="paymentType"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-xs">Payment type</FormLabel>
                <FormControl>
                  <Select
                    value={field.value || "Cash"}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      {...field}
                      className="flex h-8 items-center gap-2"
                      style={{
                        boxShadow: "none",
                        outline: "none",
                      }}
                    >
                      <SelectValue placeholder="Payment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentTypes.map((category) => (
                        <SelectItem
                          className=" text-start block  "
                          key={category}
                          value={category}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-[10px]">
                  Choose category.
                </FormDescription>
                <FormMessage className=" text-[10px]" />
              </FormItem>
            )}
          />
          {selectedTransactionType === transactionsType.INCOME ? (
            <FormField
              name="payer"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-xs">Payer</FormLabel>
                  <FormControl>
                    <Input
                      className="border text-xs border-zinc-800 bg-black h-8"
                      style={{
                        boxShadow: "none",
                        outline: "none",
                      }}
                      type="text"
                      min={1}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-[10px]">
                    Name of the person or entity.
                  </FormDescription>
                  <FormMessage className=" text-[10px]" />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              name="payee"
              render={({ field }) => (
                <FormItem
                  className={`${
                    selectedTransactionType === transactionsType.TRANSFER
                      ? "col-span-1"
                      : "col-span-1"
                  }`}
                >
                  <FormLabel className="text-xs">Payee</FormLabel>
                  <FormControl>
                    <Input
                      className="border text-xs border-zinc-800 bg-black h-8"
                      style={{
                        boxShadow: "none",
                        outline: "none",
                      }}
                      type="text"
                      min={1}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-[10px]">
                    Name of the person or entity.
                  </FormDescription>
                  <FormMessage className=" text-[10px]" />
                </FormItem>
              )}
            />
          )}

          <FormField
            name="fromWallet"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-xs">From wallet</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      {...field}
                      className="flex h-8 items-center gap-2"
                      style={{
                        boxShadow: "none",
                        outline: "none",
                      }}
                    >
                      <SelectValue placeholder="From wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentTypes.map((category) => (
                        <SelectItem
                          className=" text-start block  "
                          key={category}
                          value={category}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-[10px]">
                  Choose wallet.
                </FormDescription>
                <FormMessage className=" text-[10px]" />
              </FormItem>
            )}
          />
          {selectedTransactionType === transactionsType.TRANSFER && (
            <FormField
              name="toWallet"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-xs">To wallet</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        {...field}
                        className="flex h-8 items-center gap-2"
                        style={{
                          boxShadow: "none",
                          outline: "none",
                        }}
                      >
                        <SelectValue placeholder="From wallet" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentTypes.map((category) => (
                          <SelectItem
                            className=" text-start block  "
                            key={category}
                            value={category}
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-[10px]">
                    Choose wallet.
                  </FormDescription>
                  <FormMessage className=" text-[10px]" />
                </FormItem>
              )}
            />
          )}
          <FormField
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="h-8 w-full col-span-1 text-xs font-normal  bg-black border-zinc-800"
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
                <FormDescription className="text-[10px]">
                  Select a date.
                </FormDescription>
                <FormMessage className=" text-[10px]" />
              </FormItem>
            )}
          />
          <FormField
            name="note"
            render={({ field }) => (
              <FormItem
                className={`${
                  selectedTransactionType === transactionsType.TRANSFER
                    ? "col-span-2"
                    : "col-span-2"
                }`}
              >
                <FormLabel className="text-xs">Note</FormLabel>
                <FormControl>
                  <Input
                    className="border text-xs border-zinc-800 bg-black h-8"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                    }}
                    type="text"
                    min={1}
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-[10px]">
                  Add a note.
                </FormDescription>
                <FormMessage className=" text-[10px]" />
              </FormItem>
            )}
          ></FormField>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            variant="default"
            size="sm"
            className="h-8 w-32 bg-[#8470FF] hover:bg-[#6C5FBC] text-xs"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateTransactionForm;
