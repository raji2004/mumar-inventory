import { getProductById } from "@/lib/db/read"
import { EditProductForm } from "@/components/forms";
import { revalidateTag } from 'next/cache';



export default async function Page({ params }: { params: { id?: string, } }) {
    const product = await getProductById(params.id ?? "");
    revalidateTag('products');
    return (
       
            <EditProductForm product={product} />
    )
}