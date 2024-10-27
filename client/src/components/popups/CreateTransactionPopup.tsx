import { z } from "zod";
import { motion } from "framer-motion";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { categories } from "@/constants/categories";

interface CreateTransactionPopupProps {
  onClose: () => void;
}

const createTransactionSchema = z
  .object({
    amount: z
      .number()
      .min(1, "Invalid amount")
      .positive("Amount is required and must be provided"),
    transactionType: z.enum(["Income", "Expense", "Transfer"]),
    note: z.string().optional(),
    category: z.string().optional(),
    payee: z.string().optional(),
    payer: z.string().optional(),
    fromWallet: z.string().optional(),
    toWallet: z.string().optional(),
    paymentType: z.string().optional(),
    time: z.date().optional(),
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
      data.transactionType === "Income" ||
      data.transactionType === "Expense"
    ) {
      if (!data.fromWallet || !data.category) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["fromWallet", "category"],
          message: "From wallet and category is required",
        });
      }
      if (data.transactionType === "Income" && data.payee) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["payee"],
          message: "Payee is not allowed for income",
        });
      }
      if (data.transactionType === "Expense" && data.payer) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["payer"],
          message: "Payer is not allowed for expense",
        });
      }
    } else if (data.transactionType === "Transfer") {
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

function CreateTransactionPopup({ onClose }: CreateTransactionPopupProps) {
  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      transactionType: "Income",
      category: "Others",
    },
  });

  const fadeInVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: -20 },
    exit: { opacity: 0, y: -20 },
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      onClick={onClose}
      className="fixed inset-0  bg-black bg-opacity-50 z-10"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeInVariants}
      transition={{ duration: 0.2 }}
    >
      <div
        onClick={handlePopupClick}
        className="w-[550px] h-96 bg-black z-20 border border-zinc-800 absolute top-1/2 left-1/2 rounded-lg transform -translate-x-1/2 -translate-y-1/2 p-5 flex flex-col gap-8"
      >
        <div className="flex items-center flex-col ">
          <h3 className="font-semibold">Adding a new Transaction</h3>
          <p className="text-xs text-zinc-500">Please fill in the form below</p>
        </div>
        <Form {...form}>
          <form action="" className="">
            <div className="w-full grid grid-cols-3 gap-2">
              <FormField
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Amount</FormLabel>
                    <FormControl>
                      <Input
                        className="border text-xs border-zinc-800 bg-black h-8"
                        style={{
                          boxShadow: "none",
                          outline: "none",
                        }}
                        type="number"
                        min={1}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Transaction amount.
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                name="transactionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Transaction type</FormLabel>
                    <FormControl>
                      <Select defaultValue="Income">
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
                        <SelectContent className="">
                          <SelectItem value="Income">Income</SelectItem>
                          <SelectItem value="Expense">Expense</SelectItem>
                          <SelectItem value="Transfer">Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription className="text-xs">
                      Transaction type.
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Category</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || "Others"}
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
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className=" w-fit " value="Others">
                            Others
                          </SelectItem>
                          {categories.map((category) => (
                            <SelectItem
                              className=" w-fit "
                              key={category}
                              value={category}
                            >
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription className="text-xs">
                      Choose category.
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}

export default CreateTransactionPopup;
