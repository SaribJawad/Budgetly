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
import { currencies, walletTypes } from "@/constants/constants";
import { Button } from "../ui/button";

const editWalletFormSchema = z.object({
  walletName: z.string().min(4, "Name must be at least 4 letters").optional(),
  type: z.string().optional(),
  balance: z.number().optional(),
  currency: z
    .string()
    .min(1, { message: "Currency is required" })
    .optional()
    .refine((value) => value && /^[A-Z]{3}$/.test(value), {
      message: "Invalid currency",
    }),
});

function EditWalletForm() {
  const form = useForm<z.infer<typeof editWalletFormSchema>>({
    resolver: zodResolver(editWalletFormSchema),
    defaultValues: {
      // TODO: Add values from wallet
      walletName: "",
      type: "",
      balance: 0,
      currency: "",
    },
  });

  const onSubmit = (values: z.infer<typeof editWalletFormSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} action="">
        <div className="grid  grid-cols-2 gap-3 min-w-[320px]">
          <FormField
            name="walletName"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Wallet name</FormLabel>
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
                  Name your wallet.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="type"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Type</FormLabel>
                <FormControl>
                  <Select
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
                      <SelectValue placeholder="Wallet type" />
                    </SelectTrigger>
                    <SelectContent>
                      {walletTypes.map((type) => (
                        <SelectItem
                          className=" text-start block  "
                          key={type}
                          value={type}
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-sm">
                  Type of your wallet.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />

          <FormField
            name="balance"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Balance</FormLabel>
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
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Initial balance.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="currency"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Currency</FormLabel>
                <FormControl>
                  <Select
                    value={field.value || ""}
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
                      <SelectValue placeholder="Currency type" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem
                          className=" text-start block  "
                          key={currency.code}
                          value={currency.code}
                        >
                          {currency.name} ({currency.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-sm">
                  Type of currency.
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

export default EditWalletForm;
