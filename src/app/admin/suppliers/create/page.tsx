"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SupplierSchema } from "@/lib/schemas";
import { uid } from 'uid';
import { createSupplier } from "@/lib/db/create"; // Ensure this function is defined to handle supplier creation
import { Supplier } from "@/lib/type";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CreateSupplierPage() {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(SupplierSchema),
        defaultValues: {
            name: '',
            phoneNumber: null,
            bank: '',
            accountNumber: null,
            accountName: '',
        },
    });
     console.log('form',form.formState.errors);
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log("Form submission triggered");
        const formattedData: Supplier = {
            supplierId: uid(),
            name: data.name,
            phoneNumber: data.phoneNumber,
            bank: data.bank,
            accountNumber: data.accountNumber,
            accountName: data.accountName,
        };

        try {
            createSupplier(formattedData);
            toast.success("Supplier created successfully");
            router.push('/admin/suppliers'); // Redirect to the suppliers list or another page
        } catch (e) {
            console.error("Error creating supplier", e);
            toast.error("Failed to create supplier");
        }
    };

    return (
        <div className={cn("flex h-screen justify-center")}>
            <div className="flex flex-col items-center justify-center space-y-5 p-4">
                <h1 className="text-2xl md:text-4xl font-semibold mt-4">Create a New Supplier</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-3xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Supplier Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter supplier name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="Enter phone number"
                                                value={field.value || ""}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    field.onChange(value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bank"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bank</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter bank name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="accountNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="Enter account number"
                                                value={field.value || ""} // Set value to an empty string if it's null
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    field.onChange(value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="accountName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter account name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" className="w-full bg-primary-900">
                            Create Supplier
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}