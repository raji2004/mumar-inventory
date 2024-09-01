export type Product = {
    productId: string;
    name: string;
    buyingPrice: number;
    quantity: string;
    sellingPrice: number;
    expiryDate: string;
    availability: "in-stock" | "low-stock" | "out-of-stock";
}
export type Supplier = {
    supplierId: string;
    name: string;
    phoneNumber: string;
    bank: string;
    accountNumber: string;
    accountName: string;
}