"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/lib/Axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RegisterFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Define the validation schema using Zod
const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "First name must be at least 3 characters long" }),
    lastName: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignupPage = () => {
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);

  // Router instance for navigation
  const router = useRouter();

  // Initialize the form using react-hook-form and Zod for validation
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = async (data: RegisterFormInputs) => {
    console.log(data);

    const payload = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      password: data.password,
    };
    console.log(payload);

    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/api/auth/register", payload);
      console.log(response.data);
      if (response.status === 201) {
        toast.success("Account created successfully!");
        setIsLoading(false);
        form.reset(); // Reset the form after successful submission
        // Redirect to login page or perform any other action
        router.push("/login");
      } else if (response.status === 409) {
        toast.error("User already exists. Please login.");
        setIsLoading(false);
      } else {
        toast.error("Failed to create account. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Failed to create account. Please try again.");
      setIsLoading(false);
    }
    // setIsLoading(true);
    // // Simulate a signup request
    // setTimeout(() => {
    //   setIsLoading(false);
    //   alert("Account created successfully!");
    // }, 2000); // Simulate a 2-second delay
  };
  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold pb-4">Create account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="First name"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Last name (surname)"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email, e.g joy@edupay.org"
                    {...field}
                    value={field.value ?? ""}
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
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Confirm password"
                    {...field}
                    type="password"
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            variant="elevated"
            className="bg-green-600 w-full cursor-pointer flex items-center justify-center"
            type="submit"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </Form>
      <div className="max-w-md mx-auto flex items-center justify-center mt-4">
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-yellow-500">
            login.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
