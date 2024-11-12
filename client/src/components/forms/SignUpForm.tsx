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

const signUpSchema = z.object({
  firstName: z.string().min(3, { message: "Must be at least 3 characters" }),
  lastName: z.string().min(3, { message: "Must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export function SignUpFrom() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center text-white w-auto"
      >
        <div className="flex items-center gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full mb-[-10px]">
                <FormLabel className="text-white">First Name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-black border-2 border-zinc-800 px-1  py-1 text-sm"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Your first name.
                </FormDescription>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full mb-[-10px]">
                <FormLabel className="text-white">Last Name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-black border-2 border-zinc-800 px-1  py-1 text-sm"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Your last name.
                </FormDescription>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full mb-[-10px]">
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input
                  className="bg-black border-2 border-zinc-800 px-1  py-1 text-sm"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-sm">Your email.</FormDescription>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full mb-[-10px]">
              <FormLabel className="text-white">Password</FormLabel>
              <FormControl>
                <Input
                  className="bg-black border-2 border-zinc-800 px-1  py-1 text-sm"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-sm">
                Enter a secure password.
              </FormDescription>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <Button size="sm" className="text-sm" type="submit">
          Signup
        </Button>
      </form>
    </Form>
  );
}
