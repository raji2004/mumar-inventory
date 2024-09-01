import Search from "@/components/search"
import { Button } from "@/components/ui/button"
import { RESPONSIVE_LAYOUT_PADDING } from "@/lib/defaults"
import { cn } from "@/lib/utils"
import { DataTable } from "@/components/table"
import { supplierColumns,productsData } from "@/components/columns"
import Link from "next/link"
import { DownloadSuplier } from "@/components/download"
import { getAllSupplier } from "@/lib/db/read"

export default async function Page({searchParams,}:{searchParams:{query?: string}}) {
    console.log('searchParams',searchParams.query);
    const supplier = await getAllSupplier({query:searchParams.query});

   
    return (
        <div className={cn(RESPONSIVE_LAYOUT_PADDING, "space-y-10 ")}>
            <div className=" flex md:flex-row gap-7 md:gap-0 flex-col-reverse items-center justify-between">
                <h1 className=" font-semibold text-2xl">Product Inventory Table</h1>
                <Search placeholder="Search for products" />
            </div>
            <div className=" space-x-3 flex  justify-end">
              <Link href={'/admin/suppliers/create'}>
              <Button className=" bg-primary-900" >Add Supplier</Button>
              </Link>  
                <DownloadSuplier supplier={supplier} />
            </div>

           <DataTable columns={supplierColumns} data={supplier} />
        </div>
    )
}