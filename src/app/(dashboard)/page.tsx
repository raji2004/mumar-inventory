import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getSalesForToday } from '@/lib/db/read'
import { revalidateTag } from 'next/cache'
import { DataTable } from '@/components/table'
import { salesColumns } from '@/components/columns'
import { Plus } from 'lucide-react'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
    
  
  const sales = await getSalesForToday()
  revalidateTag('sales');
  return (
    <div className=' flex items-center w-full h-screen justify-center pt-20'>
      {
        sales.length > 0 ?
          <div className=' space-y-10'>
            <div className=' flex justify-between items-center'>

              <h1 className=" font-semibold text-2xl">Sales Record Table</h1>
              <Link href={'/sell'}>
                <Button className=' w-fit bg-primary-900'>
                  <Plus />
                  </Button>
              </Link>
            </div>
            <DataTable
              data={sales}
              columns={salesColumns}
            />
          </div>

          :
          <div className=' flex flex-col gap-5 items-center'>
            <p> Hello you have no sales for today</p>
            <Link href={'/sell'}>
              <Button className=' w-80 bg-primary-900'>Record Sales</Button>
            </Link>
          </div>
      }
    </div>
  )
}