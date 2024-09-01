"use server";
import { createClient } from '@/utils/supabase/client';
import { Product ,Supplier} from '../type';
import { revalidatePath, revalidateTag } from 'next/cache';

const supabase = createClient();


export const updateProduct = async (id: string, product: Omit<Product, 'availability'>): Promise<Product> => {
    const { data, error } = await supabase
        .from('products')
        .update(product)
        .eq('productId', id)
        .single();
    
    if (error) {
        throw error;
    }
    revalidateTag('products');
    revalidatePath('/admin/inventory');
    revalidatePath(`/admin/inventory/${id}/edit`);
    return data;
}

export const updateSupplier = async (id: string, supplier:Supplier): Promise<Supplier> => {
    const { data, error } = await supabase
        .from('suppliers')
        .update(supplier)
        .eq('supplierId', id)
        .single();
    
    if (error) {
        throw error;
    }
    revalidateTag('suppliers');
    revalidatePath('/admin/suppliers');
    revalidatePath(`/admin/suppliers/${id}/edit`);
    return data;
}