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
import { AddTransactionFormData } from "@/custom-hooks/transactions/useAddTranscations";
import { useAppSelector } from "@/app/hook";
import { selectAllWallets } from "@/features/wallet/walletSlice";
import { LoadingSpinner } from "../ui/LoadingSpinner";

interface CreateTransactionFormProps {
  handleCreateTranscations: (arg: AddTransactionFormData) => void;
  isAddTransactionPending: boolean;
}

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
    if (
      data.transactionType === "Income" ||
      data.transactionType === "Expense"
    ) {
      if (!data.fromWallet) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["fromWallet"],
          message: "From wallet is required ",
        });
      }
      if (data.transactionType === "Income" && data.payee) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["payee"],
          message: "Payee is not allowed for Income",
        });
      }
      if (data.transactionType === "Expense" && data.payer) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["payer"],
          message: "Payer is not allowed for Expense",
        });
      }
    }

    // Validate Transfer
    if (data.transactionType === "Transfer") {
      if (!data.fromWallet) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["fromWallet"],
          message: "From wallet is required ",
        });
      }
      if (!data.toWallet) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["toWallet"],
          message: "To wallet is required ",
        });
      }
      if (data.category) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["category"],
          message: "Category is not allowed for Transfer transactions",
        });
      }
    }
  });

function CreateTransactionForm({
  handleCreateTranscations,
  isAddTransactionPending,
}: CreateTransactionFormProps) {
  const { data: userWallets } = useAppSelector(selectAllWallets);

  const [selectedTransactionType, setSelectedTransactionType] =
    useState<string>("Income");
  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      transactionType: "Income",
      category: "",
      paymentType: "Cash",
      amount: 0,
      note: "",
      payee: "",
      payer: "",
      fromWallet: "",
      toWallet: "",
      date: new Date(),
    },
  });

  const handleTransactionTypeChange = (value: string) => {
    setSelectedTransactionType(value);
    form.setValue("fromWallet", "");
    form.setValue("toWallet", "");
    form.setValue("category", "");
    form.setValue("payee", "");
    form.setValue("payer", "");
  };

  const onSubmit = (values: z.infer<typeof createTransactionSchema>) => {
    handleCreateTranscations({ formData: values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} action="" className="">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-3">
          <FormField
            name="amount"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Amount</FormLabel>
                <FormControl>
                  <Input
                    disabled={isAddTransactionPending}
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
                  Transaction amount.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="transactionType"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Transaction type</FormLabel>
                <FormControl>
                  <Select
                    disabled={isAddTransactionPending}
                    defaultValue={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleTransactionTypeChange(value);
                    }}
                  >
                    <SelectTrigger
                      {...field}
                      className="flex h-10 items-center gap-2"
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
                <FormDescription className="text-sm">
                  Transaction type.
                </FormDescription>
                <FormMessage className="text-sm " />
              </FormItem>
            )}
          />
          {selectedTransactionType !== transactionsType.TRANSFER && (
            <FormField
              name="category"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-md">Category</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isAddTransactionPending}
                      value={field.value}
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
                  <FormDescription className="text-sm">
                    Choose category.
                  </FormDescription>
                  <FormMessage className=" text-sm" />
                </FormItem>
              )}
            />
          )}
          <FormField
            name="paymentType"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Payment type</FormLabel>
                <FormControl>
                  <Select
                    disabled={isAddTransactionPending}
                    value={field.value || "Cash"}
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
                <FormDescription className="text-sm">
                  Choose category.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          {selectedTransactionType === transactionsType.INCOME ? (
            <FormField
              name="payer"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-md">Payer</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isAddTransactionPending}
                      className="border text-md border-zinc-800 bg-black h-10"
                      style={{
                        boxShadow: "none",
                        outline: "none",
                      }}
                      type="text"
                      min={1}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm">
                    Name of the person or entity.
                  </FormDescription>
                  <FormMessage className=" text-sm" />
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
                  <FormLabel className="text-md">Payee</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isAddTransactionPending}
                      className="border text-md border-zinc-800 bg-black h-10"
                      style={{
                        boxShadow: "none",
                        outline: "none",
                      }}
                      type="text"
                      min={1}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm">
                    Name of the person or entity.
                  </FormDescription>
                  <FormMessage className=" text-sm" />
                </FormItem>
              )}
            />
          )}

          <FormField
            name="fromWallet"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">From wallet</FormLabel>
                <FormControl>
                  <Select
                    disabled={isAddTransactionPending}
                    value={field.value}
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
                      <SelectValue placeholder="From wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      {userWallets.map((wallet) => (
                        <SelectItem
                          className=" text-start block  "
                          key={wallet._id}
                          value={wallet._id}
                        >
                          {wallet.walletName}
                        </SelectItem>
                      ))}
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
          {selectedTransactionType === transactionsType.TRANSFER && (
            <FormField
              name="toWallet"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-md">To wallet</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isAddTransactionPending}
                      value={field.value}
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
                        <SelectValue placeholder="To wallet" />
                      </SelectTrigger>
                      <SelectContent>
                        {userWallets.map((wallet) => (
                          <SelectItem
                            className=" text-start block  "
                            key={wallet._id}
                            value={wallet._id}
                          >
                            {wallet.walletName}
                          </SelectItem>
                        ))}
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
          )}
          <FormField
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        disabled={isAddTransactionPending}
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
                  Select a date.
                </FormDescription>
                <FormMessage className=" text-sm" />
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
                <FormLabel className="text-md">Note</FormLabel>
                <FormControl>
                  <Input
                    disabled={isAddTransactionPending}
                    className="border text-md border-zinc-800 bg-black h-10"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                    }}
                    type="text"
                    min={1}
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Add a note.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          ></FormField>
        </div>
        <div className="flex justify-center mt-8">
          <Button
            disabled={isAddTransactionPending}
            type="submit"
            variant="default"
            size="sm"
            className="h-10 w-32 bg-[#8470FF] hover:bg-[#6C5FBC] text-md"
          >
            {isAddTransactionPending ? <LoadingSpinner /> : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateTransactionForm;
