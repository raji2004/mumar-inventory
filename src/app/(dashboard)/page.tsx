import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getSalesForToday } from '@/lib/db/read'
import { revalidateTag } from 'next/cache'
import { DataTable } from '@/components/table'
import { salesColumns } from '@/components/columns'
import { Plus } from 'lucide-react'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cn } from '@/lib/utils'
import { RESPONSIVE_LAYOUT_PADDING } from '@/lib/defaults'
import { convertToNaira } from '@/lib/defaults'

export default async function Page() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }


  const sales = await getSalesForToday()
  const TotalSalesToday = convertToNaira(sales.reduce((total, sale) => total + sale.price, 0))
  revalidateTag('sales');
  return (
    <div className=' flex items-center w-full h-screen justify-center pt-72'>
      {
        sales.length > 0 ?
          <div className={cn('space-y-10 ',RESPONSIVE_LAYOUT_PADDING)}>
            <div className='flex flex-row px-6 justify-between items-center'>
              <h1 className="font-semibold text-2xl mb-4 md:mb-0">Sales Record Table</h1>
              <Link href={'/sell'}>
                <Button className='w-full md:w-fit bg-primary-900 flex items-center justify-center'>
                  <Plus className="mr-2" />
                  <span className=' hidden md:block'>Add Sale</span>
                </Button>
              </Link>
            </div>
            <div className=' pl-6 max-w-sm md:max-w-none'>
            <DataTable
              data={sales}
              columns={salesColumns}
            />
            <h1 className=' -mt-10 text-lg' >Total : <span className=' text-xl font-medium'>{TotalSalesToday}</span> </h1>
            </div>
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