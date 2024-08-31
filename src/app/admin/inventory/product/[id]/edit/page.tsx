import { getProductById } from "@/lib/db/read"
import { EditProductForm } from "@/components/forms";




export default async function Page({ params }: { params: { id?: string, } }) {
    const product = await getProductById(params.id ?? "");
    return (
       
            <EditProductForm product={product} />
    )
}