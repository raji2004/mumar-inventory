'use client';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";
import { ProductSchema } from "@/lib/schemas";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProduct } from "@/lib/db/update";
import { Product } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";


export const EditProductForm = ({ product, }: { product: Product }) => {
    const router = useRouter();
    const updateProductSchema = ProductSchema.omit({ availability: true });
    const form = useForm({
        resolver: zodResolver(updateProductSchema),
        defaultValues: {
            name: product.name,
            buyingPrice: product.buyingPrice,
            quantity: product.quantity,
            sellingPrice: product.sellingPrice,
            expiryDate: new Date(product.expiryDate),
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log("Form submission triggered");
        const formattedData: Omit<Product, 'availability'> = {
            productId: product.productId,
            name: data.name,
            buyingPrice: data.buyingPrice,
            quantity: data.quantity,
            sellingPrice: data.sellingPrice,
            expiryDate: data.expiryDate,
        };

        try {
            updateProduct(product.productId, formattedData);
            toast.success("Product updated successfully");
            router.push('/admin/inventory');
        } catch (e) {
            console.error("Error creating product", e);
        }
    };

    return (
        <div className={cn("flex h-screen justify-center")}>
            <div className="flex flex-col items-center justify-center space-y-5 p-4">
                <h1 className="text-2xl md:text-4xl font-semibold mt-4">Edit Product</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-3xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter product name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="buyingPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Buying Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="Enter buying price"
                                                onChange={(e) => {
                                                    const value = Number(e.target.value);
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
                                name="sellingPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Selling Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="Enter selling price"
                                                onChange={(e) => {
                                                    const value = Number(e.target.value);
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
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="Enter quantity"
                                                onChange={(e) => {
                                                    const value = Number(e.target.value);
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
                                name="expiryDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block mb-1">Expiry Date</FormLabel>
                                        <FormControl>         
                                                <DatePicker
                                                    {...field}
                                                    defaultValue={new Date(product.expiryDate)}
                                                    placeholder="Select expiry date"
                                                    onChange={(date) => field.onChange(date)}
                                                />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" className="w-full bg-primary-900">
                            Update Product
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};