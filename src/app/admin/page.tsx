import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function Page(){
      const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
    if (data.user.email !== 'suleman_raji@yahoo.com') {
        redirect('/')
    }
    return (
        <div className="w-full ">
            <h1>Admin Page</h1>
            <p>This is the admin page</p>
        </div>
    )
}