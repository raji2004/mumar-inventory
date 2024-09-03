"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { signupSchema } from "@/lib/schemas";
import { signup } from "@/utils/action";
import Link from "next/link";



export default function SignupPage() {
  const form = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    signup(data); 
  };

  return (
    <div className={cn("flex h-screen")}>
      <div className="relative hidden md:block w-1/2 h-full">
        <Image
          src="/inventory.svg"
          alt="logo"
          fill
          objectFit="cover"
          className="w-full h-full"
        />
      </div>

      <div className="md:w-1/2 flex flex-col items-center justify-center space-y-5 p-4">
        <Image
          src="/logo.svg"
          alt="logo"
          width={40}
          height={40}
          className="w-40 h-auto"
        />
        <h1 className="text-4xl font-semibold mt-4">Create your account</h1>
        <p className="text-sm text-gray-500">Join us today! Please fill in your details.</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-primary-900">
              Sign up
            </Button>
          </form>
        </Form>
        <Link href="/login" className="text-primary-900">
          <span className=" text-black"> Already have an account?</span> Login here
        </Link>
      </div>
    </div>
  );
}
