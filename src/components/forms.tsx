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
import { ProductSchema, SaleSchema, SupplierSchema } from "@/lib/schemas";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProduct, updateSale, updateSupplier } from "@/lib/db/update";
import { Product, ProductFormData, ProductFormProps, Sales, SingleProductFormProps, Supplier } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { FormEventHandler, useState } from "react";
import { X } from 'lucide-react'
import Combobox from "./ui/combobox";
import { Label } from "./ui/label";
import { GridLoader } from 'react-spinners';
import { convertToNaira } from "@/lib/defaults";



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
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log("Form submission triggered");
        setLoading(true);
        const formattedData: Omit<Product, 'availability'> = {
            productId: product.productId,
            name: data.name,
            buyingPrice: data.buyingPrice,
            quantity: data.quantity,
            sellingPrice: data.sellingPrice,
            expiryDate: data.expiryDate,
        };

        try {
            await updateProduct(product.productId, formattedData);
            toast.success("Product updated successfully");
            router.push('/admin/inventory');
        } catch (e) {
            console.error("Error creating product", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex h-screen justify-center")}>
            <div className="flex flex-col items-center justify-center space-y-5 p-4">
                <h1 className="text-2xl md:text-4xl font-semibold mt-4">Edit Product</h1>
                {
                    loading ? <GridLoader /> :
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
                }
            </div>
        </div>
    );
};

export const EditSupplierForm = ({ supplier }: { supplier: Supplier }) => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(SupplierSchema),
        defaultValues: {
            name: supplier.name,
            phoneNumber: supplier.phoneNumber,
            bank: supplier.bank,
            accountNumber: supplier.accountNumber,
            accountName: supplier.accountName,
        },
    });
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log("Form submission triggered");
        setLoading(true);
        const formattedData: Supplier = {
            supplierId: supplier.supplierId,
            name: data.name,
            phoneNumber: data.phoneNumber, // Ensure this is a number
            bank: data.bank,
            accountNumber: data.accountNumber, // Ensure this is a number
            accountName: data.accountName,
        };

        try {
            await updateSupplier(supplier.supplierId, formattedData);
            toast.success("Supplier updated successfully");
            router.push('/admin/suppliers');
        } catch (e) {
            console.error("Error updating supplier", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex h-screen justify-center")}>
            <div className="flex flex-col items-center justify-center space-y-5 p-4">
                <h1 className="text-2xl md:text-4xl font-semibold mt-4">Edit Supplier</h1>

                {
                    loading ? <GridLoader /> :
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
                                                        type="text" // Keep as text to allow leading zeros
                                                        placeholder="Enter phone number"
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            // Ensure only digits are entered
                                                            if (/^\d*$/.test(value)) {
                                                                field.onChange(value);
                                                            }
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
                                                        type="text" // Keep as text to allow leading zeros
                                                        placeholder="Enter account number"
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            // Ensure only digits are entered
                                                            if (/^\d*$/.test(value)) {
                                                                field.onChange(value);
                                                            }
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
                                    Update Supplier
                                </Button>
                            </form>
                        </Form>}
            </div>
        </div>
    );
};

export const ProductForm: React.FC<ProductFormProps> = ({ productOptions }) => {
    const router = useRouter();
    const [productForms, setProductForms] = useState<ProductFormData[]>([
        { productId: '', name: '', quantity: '1', sellingPrice: 0 } // Initialize sellingPrice
    ]);
    const [loading, setLoading] = useState(false); // Loading state
    const productMap = new Map(productOptions.map(product => [product.name, product]));

    const handleAddProduct = () => {
        setProductForms([...productForms, { productId: '', name: '', quantity: '1', sellingPrice: 0 }]);
    };

    const handleDeleteProduct = (index: number) => {
        const updatedForms = productForms.filter((_, i) => i !== index);
        setProductForms(updatedForms);
    };

    const formatCurrency = (value: any) => {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) return '₦0.00';
        return `₦${numValue
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    };

    const calculateTotalPrice = () => {
        const total = productForms.reduce((total, formData) => {
            const quantity = parseFloat(formData.quantity) || 0;
            const sellingPrice = Number(formData.sellingPrice) || 0;
            return total + (quantity * sellingPrice);
        }, 0);
        return formatCurrency(total);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading state to true

        const data = productForms.map((formData) => ({
            productId: formData.productId,
            quantity: formData.quantity,
            sellingPrice: formData.sellingPrice,
        }));

        try {
            const response = await fetch('/api/sell', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ products: data }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit data');
            }

            
            toast.success('Products updated successfully');
            router.push('/');
        } catch (error) {
            console.error('Error updating products', error);
            toast.error('Failed to update products');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="flex flex-col h-screen justify-center items-center space-y-5 pt-24 md:pt-0 p-4">
            <h1 className="text-2xl md:text-4xl font-semibold mt-4">Record Sales</h1>

            {
                loading ? <GridLoader /> :
                    (<form onSubmit={handleSubmit} className="w-full max-w-lg">
                        {productForms.map((formData, index) => (
                            <SingleProductForm
                                key={index}
                                index={index}
                                productOptions={productOptions.map((product) => product.name)}
                                formData={formData}
                                onProductNameChange={(value) => {
                                    const selectedProduct = productMap.get(value);
                                    if (selectedProduct) {
                                        const updatedForms = [...productForms];
                                        updatedForms[index].name = value;
                                        updatedForms[index].productId = selectedProduct.productId;
                                        updatedForms[index].sellingPrice = selectedProduct.sellingPrice;
                                        setProductForms(updatedForms);
                                    }
                                }}
                                onQuantityChange={(value) => {
                                    const updatedForms = [...productForms];
                                    updatedForms[index].quantity = value.toString();
                                    setProductForms(updatedForms);
                                }}
                                onDelete={() => handleDeleteProduct(index)}
                                canDelete={productForms.length > 1}
                            />
                        ))}
                        <div className="text-right">
                            <h1>Total Price</h1>
                            <h1>{calculateTotalPrice()}</h1>
                        </div>

                        <div className="flex items-center justify-between w-full my-10">
                            <Button type="button" onClick={handleAddProduct} className="bg-primary-900">
                                Add
                            </Button>

                            <Button variant={'destructive'} type="submit"  disabled={loading}>
                                Sell
                            </Button>
                        </div>
                    </form>)
            }       </div>
    );
};
const SingleProductForm: React.FC<SingleProductFormProps> = ({
    index,
    productOptions,
    formData,
    onProductNameChange,
    onQuantityChange,
    onDelete,
    canDelete,
}) => {


    const totalSellingPrice = convertToNaira(Number(formData.quantity) * Number(formData.sellingPrice));

    return (
        <div className="my-6 w-full max-w-6xl bg-white border rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-2">
                    <Label htmlFor={`productName_${index}`}>Product Name</Label>
                    <Combobox
                        title="Select Product"
                        data={productOptions}
                        set_v={onProductNameChange} // Handle selection
                        default_v={formData.name} // Set default value
                        allow_custom={true} // Allow custom input
                        onQueryChange={onProductNameChange} // Update name based on input
                    />
                </div>

                <div>
                    <Label htmlFor={`quantity_${index}`}>Quantity</Label>
                    <Input
                        id={`quantity_${index}`}
                        type="number"
                        placeholder="Enter quantity"
                        value={formData.quantity}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            onQuantityChange(value);
                        }}
                        className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mr-18">
                    <Label>Price</Label>
                    <div className="p-2">
                        {formData.sellingPrice ? `${totalSellingPrice}` : 'N/A'}
                    </div>
                </div>

                {canDelete && (
                    <div className="flex mx-auto md:mx-0 items-end justify-end">
                        <Button
                            type="button"
                            variant={'outline'}
                            onClick={onDelete}
                            className="rounded-md p-2 hover:bg-red-700 hover:text-white transition"
                        >
                            <X size={20} /> {/* Use icon for delete button */}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};




export const EditSaleForm = ({ sale }: { sale: Sales }) => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(SaleSchema),
        defaultValues: {
            productId: sale.productId,
            quantity_sold: sale.quantity_sold,
        },
    });
    const [loading, setLoading] = useState(false);
    const originalPrice = sale.price / sale.quantity_sold;
    const calculatedPrice = originalPrice * form.watch('quantity_sold');
    const displayPrice = convertToNaira(calculatedPrice);
    console.log(form.formState.errors)
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log("Form submission triggered");
        setLoading(true); // Set loading to true
        try {
            const formattedData: Omit<Sales, 'sale_id'> = {
                productId: sale.productId,
                quantity_sold: data.quantity_sold,
                date_sold: sale.date_sold,
                product_name: sale.product_name,
                price: calculatedPrice // Retain the original selling price
            };
            await updateSale(sale.sale_id, formattedData);
            toast.success("Sale updated successfully");
            router.push('/'); // Redirect after success
        } catch (e) {
            console.error("Error updating sale", e);
            toast.error("Failed to update sale");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className={cn("flex h-screen justify-center")}>
            <div className="flex flex-col items-center justify-center space-y-5 p-4">
                <h1 className="text-2xl md:text-4xl font-semibold mt-4">Edit Sale</h1>

                {
                    loading ? <GridLoader /> :
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-3xl">
                            <div className="flex flex-col">
                                    <FormLabel>Product Name</FormLabel>
                                    <span className="text-lg font-semibold">
                                        {sale.product_name} {/* Format as needed */}
                                    </span>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="quantity_sold"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quantity Sold</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    placeholder="Enter quantity sold"
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

                                {/* Display calculated price as text */}
                                <div className="flex flex-col">
                                    <FormLabel>Selling Price</FormLabel>
                                    <span className="text-lg font-semibold">
                                        {displayPrice} {/* Format as needed */}
                                    </span>
                                </div>



                                <Button type="submit" className="w-full bg-primary-900">
                                    Update Sale
                                </Button>
                            </form>
                        </Form>
                        }
            </div>
        </div>
    );
};
