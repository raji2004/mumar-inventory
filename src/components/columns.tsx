"use client"

import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"
import { Edit2, Trash2, Copy, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { Product, Supplier } from "@/lib/type";
import Link from "next/link";
import { deleteProduct,deleteSupplier } from "@/lib/db/delete";
import { toast } from "react-toastify";

// This type is used to define the shape of our data.
const handleDelete = async (id: string) => {
  try {
    await deleteProduct(id);
    toast.success("Product deleted successfully");
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while deleting the product");
  }
}
const handleSupplierDelete = async (id: string) => {
  try {
    await deleteSupplier(id);
    toast.success("Supplier deleted successfully");
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while deleting the product");
  }
}
const convertToNaira = (price: number): string => {
  const nairaValue = price.toFixed(2); // Format to 2 decimal places
  const parts = nairaValue.split('.'); // Split into whole and decimal parts
  const wholePart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas
  return `₦${wholePart}.${parts[1]}`; // Combine and return
};

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name", // Changed from "email" to "products"
    header: "Products",
  },
  {
    accessorKey: "buyingPrice", // Changed from "amount" to "buyingPrice"
    header: "Buying Price",
    cell: ({ row }) => convertToNaira(row.getValue("buyingPrice")),

  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            null
          )}
        </Button>
      )
    },
    cell: ({ getValue }) => (
      <div className="flex justify-center mr-6">
          {String(getValue())}
      </div>
    ),
  },
  {
    accessorKey: "sellingPrice",
    header: "Selling Price",
    cell: ({ row }) => convertToNaira(row.getValue("sellingPrice")),
  },
  {
    accessorKey: "expiryDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          expire date
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            null
          )}
        </Button>
      )
    },
  },
  {
    accessorKey: "availability", // Changed from "status" to "availability"
    header: "availability",
    cell: ({ row }) => {
      const availability = row.getValue("availability") as Product["availability"];
      return (
        <span
          className={cn({
            "text-success": availability === "in-stock",
            "text-warning": availability === "low-stock",
            "text-error": availability === "out-of-stock",
            "text-sm": true,
          })}
        >
          {availability}
        </span>
      );
    },


  },
  {
    id: "actions", // Unique ID for the actions column

    cell: ({ row }) => (
      <div className="flex gap-2">
        <Link href={`/admin/inventory/product/${row.original.productId}/edit`}>
          <Button
            variant={"outline"}
            // onClick={() => handleEdit(row.original.id)} // Replace with your edit logic
            className="text-blue-500 bg-transparent hover:text-blue-700"
          >
            <Edit2 size={16} className="text-blue-500 bg-transparent hover:text-blue-700" />
          </Button>
        </Link>
        <Button
          variant={"outline"}
          onClick={() => handleDelete(row.original.productId)} // Replace with your delete logic
          className="text-red-500 bg-transparent hover:text-red-700"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    ),
  },
];

export const supplierColumns: ColumnDef<Supplier>[] = [

  {
    accessorKey: "name",
    header: "Supplier Name",
  },
  {
    accessorKey: "accountName",
    header: "Account Name",
  },
  {
    accessorKey: "accountNumber",
    header: "Account Number",
    size:180,
    cell: ({ getValue }) => {
      const accountNumber = getValue();
      const handleCopy = () => {
        navigator.clipboard.writeText(String(accountNumber).toString()).then(() => {
          toast.success("Account number copied to clipboard!");
        }).catch(err => {
          console.error("Failed to copy: ", err);
        });
      };
  
      return (
        <div 
          className="flex items-center justify-center cursor-pointer"
          onClick={handleCopy}
        >
          {String(accountNumber)}
          <Copy size={16} className="ml-2" />
        </div>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
   
  },
  {
    accessorKey: "bank",
    header: "Bank",
   
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Link href={`/admin/suppliers/${row.original.supplierId}/edit`}>
          <Button
            variant={"outline"}
            className="text-blue-500 bg-transparent hover:text-blue-700"
          >
            <Edit2 size={16} />
          </Button>
        </Link>
        <Button
          variant={"outline"}
          onClick={() => handleSupplierDelete(row.original.supplierId)} // Replace with your delete logic
          className="text-red-500 bg-transparent hover:text-red-700"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    ),
  },
];
export const productsData: Product[] = [
  {
    productId: "1",
    name: "Apple",
    buyingPrice: 1500.50, // Changed to number
    quantity: "100",
    sellingPrice: 0.75, // Changed to number
    expiryDate: "2024-09-10",
    availability: "in-stock",
  },
  {
    productId: "2",
    name: "Banana",
    buyingPrice: 0.30, // Changed to number
    quantity: "150",
    sellingPrice: 0.50, // Changed to number
    expiryDate: "2024-09-12",
    availability: "in-stock",
  },
  {
    productId: "3",
    name: "Orange",
    buyingPrice: 0.40, // Changed to number
    quantity: "200",
    sellingPrice: 0.60, // Changed to number
    expiryDate: "2024-09-15",
    availability: "in-stock",
  },
  {
    productId: "4",
    name: "Milk",
    buyingPrice: 1.20, // Changed to number
    quantity: "50",
    sellingPrice: 1.50, // Changed to number
    expiryDate: "2024-08-30",
    availability: "low-stock",
  },
  {
    productId: "5",
    name: "Bread",
    buyingPrice: 1.00, // Changed to number
    quantity: "80",
    sellingPrice: 1.20, // Changed to number
    expiryDate: "2024-09-05",
    availability: "in-stock",
  },
  {
    productId: "6",
    name: "Cheese",
    buyingPrice: 2.50, // Changed to number
    quantity: "30",
    sellingPrice: 3.00, // Changed to number
    expiryDate: "2024-10-01",
    availability: "out-of-stock",
  },
];