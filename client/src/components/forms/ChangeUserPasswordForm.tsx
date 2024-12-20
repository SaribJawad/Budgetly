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
import { Button } from "../ui/button";
import useShowToast from "@/custom-hooks/useShowToast";
import useUpdateUserPassword from "@/custom-hooks/user/useUpdateUserPassword";
import { LoadingSpinner } from "../ui/LoadingSpinner";

const changeUserPasswordSchema = z.object({
  oldPassword: z.string().optional(),
  newPassword: z.string().optional(),
});

function ChangeUserPasswordForm() {
  const {
    mutateAsync: updateUserPassword,
    isPending: isUpdateUserPasswordPending,
  } = useUpdateUserPassword();
  const showToast = useShowToast();
  const intialValues = {
    oldPassword: "",
    newPassword: "",
  };

  const form = useForm<z.infer<typeof changeUserPasswordSchema>>({
    resolver: zodResolver(changeUserPasswordSchema),
    defaultValues: intialValues,
  });

  const isFormUpdated = (values: z.infer<typeof changeUserPasswordSchema>) => {
    return (
      (values.newPassword ?? "" !== intialValues.newPassword) ||
      (values.oldPassword ?? "" !== intialValues.oldPassword)
    );
  };

  const onSubmit = async (values: z.infer<typeof changeUserPasswordSchema>) => {
    if (isFormUpdated(values)) {
      await updateUserPassword({ formData: values });
    } else {
      showToast({
        variant: "destructive",
        description:
          "  No changes were made. Please provide both old and new password.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} action="">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 xl:w-[800px] lg:w-[600px]">
          <FormField
            name="oldPassword"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Old password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isUpdateUserPasswordPending}
                    className="border text-sm border-zinc-800 bg-black h-10"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                    }}
                    type="password"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Insert your old password.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="newPassword"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">New password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isUpdateUserPasswordPending}
                    className="border text-sm border-zinc-800 bg-black h-10"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                    }}
                    type="password"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Add new password.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center mt-8">
          <Button
            disabled={isUpdateUserPasswordPending}
            type="submit"
            variant="default"
            size="sm"
            className="h-10 w-32 bg-[#8470FF] hover:bg-[#6C5FBC] text-md"
          >
            {isUpdateUserPasswordPending ? <LoadingSpinner /> : "Change"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ChangeUserPasswordForm;
