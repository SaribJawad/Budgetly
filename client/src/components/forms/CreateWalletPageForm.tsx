import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createWalletSchema } from "./CreateWalletForm";
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
import { walletTypes } from "@/constants/constants";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { CreateWalletResponse } from "@/custom-hooks/wallet/useCreateWallet";
import { LoadingSpinner } from "../ui/LoadingSpinner";

interface CreateWalletPageFormProps {
  createWallet: (
    values: z.infer<typeof createWalletSchema>
  ) => Promise<CreateWalletResponse>;
  isCreateWalletPending: boolean;
}

function CreateWalletPageForm({
  createWallet,
  isCreateWalletPending,
}: CreateWalletPageFormProps) {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof createWalletSchema>>({
    resolver: zodResolver(createWalletSchema),
  });

  const onSubmit = async (values: z.infer<typeof createWalletSchema>) => {
    console.log(values);
    await createWallet(values);
    navigate("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" p-3 rounded-xl"
        action=""
      >
        <div className="grid  md:grid-cols-2 grid-cols-1 gap-5 md:w-[720px] sm:w-[400px] w-[300px]">
          <FormField
            name="walletName"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Wallet name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isCreateWalletPending}
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
                    disabled={isCreateWalletPending}
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
                    disabled={isCreateWalletPending}
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
        <div className="flex justify-center mt-8">
          <Button
            disabled={isCreateWalletPending}
            type="submit"
            variant="default"
            size="sm"
            className="h-10 w-32 bg-[#8470FF] hover:bg-[#6C5FBC] text-md"
          >
            {isCreateWalletPending ? <LoadingSpinner /> : "Set Wallet"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateWalletPageForm;
