import { z } from "zod"

// Schema for form validation using Zod
export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})
export type LoginSchema = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});
export const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  buyingPrice: z.number().positive("Buying price must be positive"),
  sellingPrice: z.number().positive("Selling price must be positive"),
  quantity: z.number().int().nonnegative("Quantity must be a non-negative integer"),
  expiryDate: z.date(),
  availability: z.enum(["in-stock", "low-stock", "out-of-stock"]),
});

export const SupplierSchema = z.object({
  name: z.string().min(1, "Supplier name is required"),
  phoneNumber: z.string().min(11, "Phone number must be at least 11 characters long"),
  bank: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(10,"Account number must be at least 10 characters long"),
  accountName: z.string().min(1, "Account name is required"),
});
export const SaleSchema = z.object({
  quantity_sold: z.number().nonnegative("Quantity sold must be a non-negative number"),
});
