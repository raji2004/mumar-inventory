'use server';
import { revalidatePath, revalidateTag } from "next/cache";
import { createClient } from '@/utils/supabase/client';
const supabase = createClient();

export const deleteProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('product_availability')
    .delete()
    .eq('productId', id)
    .single();

  if (error) {
    console.error('Supabase deletion error:', error);
    throw error;
  }
  revalidateTag('products');
  revalidatePath('/admin/inventory');
  revalidatePath(`/admin/inventory/${id}/edit`);

  return data;
};
export const deleteSupplier = async (id: string) => {
  const { data, error } = await supabase
    .from('suppliers')
    .delete()
    .eq('supplierId', id)
    .single();

  if (error) {
    console.error('Supabase deletion error:', error);
    throw error;
  }
  revalidateTag('suppliers');
  revalidatePath('/admin/suppliers');
  revalidatePath(`/admin/suppliers/${id}/edit`);

  return data;
};
export const deleteSale = async (id: string) => {
  // const response = await fetch(`/api/sell/${id}`, {
  //   method: 'DELETE',
  // });


  // if (!response.ok) {
  //   throw new Error('Failed to delete product');
  // }
  const { data, error } = await supabase
    .from('sales')
    .delete()
    .eq('sale_id', id)
    .single();

  if (error) {
    console.error('Supabase deletion error:', error);
    throw error;
  }
  revalidatePath('/');
  revalidatePath(`/${id}/edit`);

  return data;
};