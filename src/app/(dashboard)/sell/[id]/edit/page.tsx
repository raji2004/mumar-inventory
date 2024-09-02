import { EditSaleForm } from "@/components/forms";
import { getSaleById } from "@/lib/db/read";
import { revalidateTag } from 'next/cache';


import { Sales } from "@/lib/type"; // Assuming you have a type definition file for Sales

export default async function Page({ params }: { params: { id?: string, } }) {
    const sale = await getSaleById(params.id ?? "");
    revalidateTag('sales');
    return (
        <EditSaleForm sale={sale} />
    )
}