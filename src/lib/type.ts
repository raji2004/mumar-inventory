export type Product = {
    productId: string;
    name: string;
    buyingPrice: number;
    quantity: string;
    sellingPrice: number;
    expiryDate: string;
    availability: "in-stock" | "low-stock" | "out-of-stock";
}

export type Sales = {
    productId: string;
    quantity_sold: number;
    date_sold: string;
    product_name: string;
    price: number;
    sale_id: string;
}
export type Supplier = {
    supplierId: string;
    name: string;
    phoneNumber: string;
    bank: string;
    accountNumber: string;
    accountName: string;
}
export interface SingleProductFormProps {
    index: number;
    productOptions: string[];
    formData: ProductFormData;
    onProductNameChange: (value: string) => void;
    onQuantityChange: (value: number) => void;
    onDelete: () => void; // New prop for delete functionality
    canDelete?: boolean; // Optional prop to enable delete button
}

export type ProductFormData = Pick<Product, 'productId' | 'quantity'| 'name'|'sellingPrice'>;



export interface ProductFormProps {
    productOptions: Product[]; // List of products
}

export type SalesSummary = {
    total_profit: number;
    total_sales: number;
    total_revenue: number;
}

export type BestSales = Pick<Sales, 'product_name'> & { total_quantity_sold: Sales['quantity_sold'] };

