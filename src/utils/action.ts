'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from './supabase/server'
import { FieldValues} from "react-hook-form"


export async function login(formData: FieldValues) {
  const supabase = createClient();

  // Validate and extract form data
  const email = formData.email as string;
  const password = formData.password as string;

  // Perform login
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.log('Login Error:', error.message);

    return;
  }

  if (email === 'suleman_raji@yahoo.com') {
    redirect('/admin');
  } else {
    // Revalidate the cache for the root path and layout
     revalidatePath('/');
    redirect('/');
  }
}


export async function signup(formData: FieldValues) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email as string,
    password: formData.password as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout() {
  const supabase = createClient()
  console.log('logout')
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}