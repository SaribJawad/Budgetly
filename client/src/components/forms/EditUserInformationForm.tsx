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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { currencies } from "@/constants/constants";
import useUpdateUserInfo from "@/custom-hooks/user/useUpdateUserInfo";
import { LoadingSpinner } from "../ui/LoadingSpinner";

const editUserInformationSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  currency: z.string().optional(),
});

function EditUserInformationForm() {
  const showToast = useShowToast();
  const { mutateAsync: updateUserInfo, isPending: isUpdateUserInfoPending } =
    useUpdateUserInfo();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    currency: "",
  };

  const form = useForm<z.infer<typeof editUserInformationSchema>>({
    resolver: zodResolver(editUserInformationSchema),
    defaultValues: initialValues,
  });

  const isFormUpdated = (values: z.infer<typeof editUserInformationSchema>) => {
    return (
      (values.email ?? "") !== initialValues.email ||
      (values.firstName ?? "") !== initialValues.firstName ||
      (values.lastName ?? "") !== initialValues.lastName ||
      (values.currency ?? "") !== initialValues.currency
    );
  };

  const onSubmit = async (
    values: z.infer<typeof editUserInformationSchema>
  ) => {
    if (isFormUpdated(values)) {
      console.log(values);
      await updateUserInfo({ formData: values });
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
        <div className="grid sm:grid-cols-2 grid-cols-2 gap-3 xl:w-[800px] lg:w-[600px] ">
          <FormField
            name="firstName"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">First name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isUpdateUserInfoPending}
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
                  Update your first name.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Last name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isUpdateUserInfoPending}
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
                  Update your last name.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isUpdateUserInfoPending}
                    className="border text-sm border-zinc-800 bg-black h-10"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                    }}
                    type="email"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Update your email.
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
                    disabled={isUpdateUserInfoPending}
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
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem
                          key={currency.code}
                          className="text-start block"
                          value={currency.code}
                        >
                          {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-sm">
                  Change your currency.
                </FormDescription>
                <FormMessage className=" text-sm" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center mt-8">
          <Button
            disabled={isUpdateUserInfoPending}
            type="submit"
            variant="default"
            size="sm"
            className="h-10 w-32 bg-[#8470FF] hover:bg-[#6C5FBC] text-md"
          >
            {isUpdateUserInfoPending ? <LoadingSpinner /> : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EditUserInformationForm;
