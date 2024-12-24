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
import { walletTypes } from "@/constants/constants";
import {
  CreateWalletData,
  CreateWalletResponse,
} from "@/custom-hooks/wallet/useCreateWallet";
import { LoadingSpinner } from "../ui/LoadingSpinner";

export const createWalletSchema = z.object({
  walletName: z.string().min(4, "Name must be at least 4 letters"),
  type: z.string().optional(),
  balance: z.number().optional(),
});

interface CreateWalletFormProps {
  onClose: () => void;
  createWallet: (arg: CreateWalletData) => Promise<CreateWalletResponse>;
  isCreateWalletPending: boolean;
}

function CreateWalletForm({
  onClose,
  createWallet,
  isCreateWalletPending,
}: CreateWalletFormProps) {
  const form = useForm<z.infer<typeof createWalletSchema>>({
    resolver: zodResolver(createWalletSchema),
    defaultValues: {
      walletName: "",
      type: "General",
      balance: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof createWalletSchema>) => {
    await createWallet(values);
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid  md:grid-cols-1 grid-cols-1 gap-3 sm:w-[320px] w-[300px] ">
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
                    onChange={(e) =>
                      field.onChange(Number(e.currentTarget.value))
                    }
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Initial balance.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-center mt-8 ">
          <Button
            disabled={isCreateWalletPending}
            type="submit"
            variant="default"
            size="sm"
            className="h-10 w-32 bg-[#8470FF] hover:bg-[#6C5FBC] text-md"
          >
            {isCreateWalletPending ? <LoadingSpinner /> : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateWalletForm;
