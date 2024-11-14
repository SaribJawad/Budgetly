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
import { useToast } from "@/hooks/use-toast";

const editUserInformationSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
});

function EditUserInformationForm() {
  const { toast } = useToast();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const form = useForm<z.infer<typeof editUserInformationSchema>>({
    resolver: zodResolver(editUserInformationSchema),
    defaultValues: initialValues,
  });

  const isFormUpdated = (values: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }) => {
    return (
      (values.email ?? "") !== initialValues.email ||
      (values.firstName ?? "") !== initialValues.firstName ||
      (values.lastName ?? "") !== initialValues.lastName
    );
  };

  const onSubmit = (values: z.infer<typeof editUserInformationSchema>) => {
    if (isFormUpdated(values)) {
      console.log("updated fields", values);
    } else {
      toast({
        variant: "destructive",
        className: "  border border-red-800 rounded-lg p-5 shadow-xl ",
        description:
          "No changes were made. Please update at least one field to update.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} action="">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 xl:w-[800px] lg:w-[600px] ">
          <FormField
            name="firstName"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel className="text-md">First name</FormLabel>
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

export default EditUserInformationForm;
