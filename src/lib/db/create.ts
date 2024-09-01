"use server";
import { createClient } from '@/utils/supabase/client';
import { Product,Supplier } from '../type';
import { revalidatePath, revalidateTag } from 'next/cache';

const supabase = createClient();

export const createProduct = async (product:  Omit<Product, 'availability'>) => {
    const { data, error } = await supabase.from('products').insert(product);
    if (error) {
        throw error;
    }
    revalidateTag('products');
    revalidatePath('/admin/inventory');
    return data;
}
export const createSupplier = async (supplier:Supplier) => {
    const { data, error } = await supabase.from('suppliers').insert(supplier);
    if (error) {
        throw error;
    }
    revalidateTag('suppliers');
    revalidatePath('/admin/suppliers');
    return data;
}