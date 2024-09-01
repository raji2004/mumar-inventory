import { getSupplierById } from "@/lib/db/read"
import { EditSupplierForm } from "@/components/forms";
import { revalidateTag } from "next/cache";




export default async function Page({ params }: { params: { id?: string, } }) {
    const supplier = await getSupplierById(params.id ?? "");
    revalidateTag('suppliers');
    return (
       
            <EditSupplierForm supplier={supplier} />
    )
}