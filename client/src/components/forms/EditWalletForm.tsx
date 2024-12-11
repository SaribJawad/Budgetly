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
import { walletTypes } from "@/constants/constants";
import { Button } from "../ui/button";
import useShowToast from "@/custom-hooks/useShowToast";
import { Wallet } from "@/@types/Types";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import {
  EditWalletData,
  EditWalletResponse,
} from "@/custom-hooks/wallet/useEditWallet";

interface EditWalletFormProps {
  wallet: Wallet;
  handleDeleteWallet: (arg: string) => void;
  isDeleteWalletPending: boolean;
  isEditWalletPending: boolean;
  editWallet: (arg: EditWalletData) => Promise<EditWalletResponse>;
  onClose: () => void;
}

const editWalletFormSchema = z.object({
  walletName: z
    .string()
    .optional()
    .refine((value) => !value || value.length > 4, {
      message: "Name must be at least 4 letters",
    }),
  type: z.string().optional(),
  balance: z.number().optional(),
});

function EditWalletForm({
  wallet,
  handleDeleteWallet,
  isDeleteWalletPending,
  isEditWalletPending,
  editWallet,
  onClose,
}: EditWalletFormProps) {
  const showToast = useShowToast();

  const initialValues = {
    walletName: wallet.walletName,
    type: wallet.type,
    balance: wallet.balance,
  };

  const form = useForm<z.infer<typeof editWalletFormSchema>>({
    resolver: zodResolver(editWalletFormSchema),
    defaultValues: initialValues,
  });

  const isFormUpdated = (values: {
    walletName?: string;
    type?: string;
    balance?: number;
  }) => {
    return (
      (values.walletName ?? "") !== initialValues.walletName ||
      (values.type ?? "") !== initialValues.type ||
      (values.balance ?? 0) !== initialValues.balance
    );
  };

  const onSubmit = async (values: z.infer<typeof editWalletFormSchema>) => {
    if (isFormUpdated(values)) {
      const toEditData = Object.assign(
        {},
        values.balance !== initialValues.balance && { balance: values.balance },
        values.walletName !== initialValues.walletName && {
          walletName: values.walletName,
        },
        values.type !== initialValues.type && { type: values.type }
      );

      await editWallet({
        formData: toEditData as Object,
        walletId: wallet._id,
      }).then(() => {
        onClose();
      });
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
      <form onSubmit={form.handleSubmit(onSubmit)} action="">
        <div className="grid  grid-cols-1 gap-3 min-w-[320px]">
          <FormField
            disabled={isDeleteWalletPending || isEditWalletPending}
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
            disabled={isDeleteWalletPending || isEditWalletPending}
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
            disabled={isDeleteWalletPending || isEditWalletPending}
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
        </div>
        <div className="flex justify-center mt-8 gap-2">
          <Button
            disabled={isDeleteWalletPending || isEditWalletPending}
            type="submit"
            variant="default"
            size="sm"
            className="h-10 w-32 bg-[#8470FF] hover:bg-[#6C5FBC] text-md"
          >
            Edit
          </Button>
          <Button
            disabled={isEditWalletPending || isDeleteWalletPending}
            type="button"
            onClick={() => handleDeleteWallet(wallet._id)}
            variant="destructive"
            size="sm"
            className="h-10 w-32  text-md"
          >
            {isDeleteWalletPending ? <LoadingSpinner /> : "Delete"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EditWalletForm;
