import { ProductForm } from "@/components/forms"
import { getAllProduct } from "@/lib/db/read"
import { recordSales } from "@/lib/db/update"
import { Product } from "@/lib/type"



export default async function Page() {
    const products = await getAllProduct()

   
    return(
            <div>
                <ProductForm productOptions={products} />
            </div>
       
    )
}