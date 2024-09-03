"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { login } from "@/utils/action"
import { loginSchema } from "@/lib/schemas"
import Link from "next/link"


export default function Page() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    login(data)
  }

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

      <div className="md:w-1/2 flex flex-col items-center justify-center space-y-5 p-4 mx-auto md:mx-0">
        <Image
          src="/logo.svg"
          alt="logo"
          width={40}
          height={40}
          className="w-40 h-auto"
        />
        <h1 className="text-2xl md:text-4xl font-semibold mt-4">Log in to your account</h1>
        <p className="text-sm text-gray-500">Welcome back! Please enter your details.</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
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
              Log in
            </Button>
          </form>
        </Form>
        <Link href="/signup" className="text-primary-900">
          <span className=" text-black"> Don't have an account?</span> Register here
        </Link>
      </div>
    </div>
  )
}
