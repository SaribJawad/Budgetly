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

const changeUserPasswordSchema = z.object({
  oldPassword: z.string().min(1, "Add an old password to update."),
  newPassword: z.string().min(1, "Add a new password to update."),
});

function ChangeUserPasswordForm() {
  const form = useForm<z.infer<typeof changeUserPasswordSchema>>({
    resolver: zodResolver(changeUserPasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof changeUserPasswordSchema>) => {
    console.log(values);
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
            type="submit"
            variant="default"
            size="sm"
            className="h-10 w-32 bg-[#8470FF] hover:bg-[#6C5FBC] text-md"
          >
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ChangeUserPasswordForm;
