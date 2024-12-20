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
import useSignUp from "@/custom-hooks/auth/useSignUp";
import { useNavigate } from "react-router-dom";
import { currencies } from "@/constants/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { LoadingSpinner } from "../ui/LoadingSpinner";

const signUpSchema = z.object({
  firstName: z.string().min(3, { message: "Must be at least 3 characters" }),
  lastName: z.string().min(3, { message: "Must be at least 3 characters" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  currency: z.string({ message: "Currency is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export function SignUpFrom() {
  const { mutateAsync: signUp, isPending: isSignUpPending } = useSignUp();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    await signUp(values);
    navigate("/auth/login");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center   text-white md:w-[400px] w-[300px]"
      >
        <div className="grid grid-cols-2  w-full gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full mb-[-10px]">
                <FormLabel className="text-white">First Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSignUpPending}
                    className="bg-black border-2 border-zinc-800 px-1  py-1 text-sm"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Your first name.
                </FormDescription>
                <FormMessage className="md:text-sm text-xs" />
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
                    disabled={isSignUpPending}
                    className="bg-black border-2 border-zinc-800 px-1  py-1 text-sm"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Your last name.
                </FormDescription>
                <FormMessage className="md:text-sm text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full mb-[-10px]">
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSignUpPending}
                    className="bg-black border-2 border-zinc-800 px-1  py-1 text-sm"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Your email.
                </FormDescription>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full mb-[-10px]">
                <FormLabel className="text-white">Currency</FormLabel>
                <FormControl>
                  <Select
                    disabled={isSignUpPending}
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
                  Choose currency.
                </FormDescription>
                <FormMessage className="md:text-sm text-xs" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full mb-[-10px]">
              <FormLabel className="text-white">Password</FormLabel>
              <FormControl>
                <Input
                  disabled={isSignUpPending}
                  className="bg-black border-2 border-zinc-800 px-1  py-1 text-sm"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-sm">
                Enter a secure password.
              </FormDescription>
              <FormMessage className="md:text-sm text-xs" />
            </FormItem>
          )}
        />
        <Button
          disabled={isSignUpPending}
          size="sm"
          className="text-sm bg-[#917FFF] hover:bg-[#8471FF]"
          type="submit"
        >
          {isSignUpPending ? <LoadingSpinner /> : "Signup"}
        </Button>
      </form>
    </Form>
  );
}
