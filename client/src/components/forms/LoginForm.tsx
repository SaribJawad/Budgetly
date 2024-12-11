import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import useLogin from "@/custom-hooks/auth/useLogin";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export function LoginForm() {
  const { mutateAsync: login } = useLogin();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await login(values, {
      onError: () => {
        form.reset({
          email: "",
          password: "",
        });
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center text-white w-[300px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full mb-[-10px] ">
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input
                  className="bg-black border-2 border-zinc-800 px-1  py-1 text-sm no-outline"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-sm">
                Your email address.
              </FormDescription>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="text-white">Password</FormLabel>
              <FormControl>
                <Input
                  className="bg-black border-2 border-zinc-800 px-1  py-1  text-sm no-outline"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-sm">
                Your password.
              </FormDescription>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <Button
          size="sm"
          className="text-sm bg-[#917FFF] hover:bg-[#8471ff]"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
