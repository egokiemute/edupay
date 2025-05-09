"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react"; // Changed from Loader to Loader2
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Define the schema first, then use it for the interface
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

// Derive the type from the schema
type LoginFormInputs = z.infer<typeof loginSchema>;

// Renamed to LoginPage with capital L for React component best practices
const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error || "Invalid email or password");
      } else {
        toast.success("Login successful");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold pb-4">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email, e.g joy@edupay.org"
                    {...field}
                    type="email" // Added type="email" for better mobile keyboards
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-fit ml-auto text-sm cursor-pointer hover:text-green-800 -mt-2">
            <Link href={"/forgot-password"}>
              Forgot password?
            </Link>
          </div>
          <Button
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 w-full text-white"
            type="submit"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center">
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-yellow-500 hover:text-yellow-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;