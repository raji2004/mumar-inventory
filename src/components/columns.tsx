"use client"

import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"
import { Edit2, Trash2, Copy, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { Product, Sales, Supplier } from "@/lib/type";
import Link from "next/link";
import { deleteProduct, deleteSupplier,deleteSale } from "@/lib/db/delete";
import { toast } from "react-toastify";
import { convertToNaira } from "@/lib/defaults";

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
const handleDeleteSale = async (id: string) => {
  try {
    await deleteSale(id);
    toast.success("Sale deleted successfully");
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while deleting the Sale");
  }
}


const formatDate = (dateInput: Date | string): string => {
  const date = new Date(dateInput); // Convert to Date object

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }

  // Get day, month, and year
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`; // Return formatted date
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
    cell: ({ row }) => formatDate(row.getValue("expiryDate")),
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
    size: 180,
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

export const salesColumns: ColumnDef<Sales>[] = [
  {
    accessorKey: "product_name",
    header: "Name",
  },
  {
    accessorKey: "quantity_sold",
    header: "Quantity Sold",
    cell: ({ row }) => (
      <div className="flex justify-center">
        {String(row.getValue("quantity_sold"))}
      </div>
    ),
   
  },
  {
    accessorKey: "date_sold",
    header: "Date Sold",
    cell: ({ row }) => formatDate(row.getValue("date_sold")),

  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => convertToNaira(row.getValue("price")),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Link href={`sell/${row.original.sale_id}/edit`}>
          <Button
            variant={"outline"}
            className="text-blue-500 bg-transparent hover:text-blue-700"
          >
            <Edit2 size={16} />
          </Button>
        </Link>
        <Button
          variant={"outline"}
          onClick={() => handleDeleteSale(row.original.sale_id)} // Replace with your delete logic
          className="text-red-500 bg-transparent hover:text-red-700"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    ),
  },
];
