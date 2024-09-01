import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    if (data?.user?.email === 'suleman_raji@yahoo.com') {
      redirect('/admin')
  }
    redirect('/login')
  }

  return <p>Hello {data.user.email}</p>
}