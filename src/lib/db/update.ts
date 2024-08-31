import { createClient } from '@/utils/supabase/client';
import { Product } from '../type';
import { revalidatePath } from 'next/cache';

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
    return data;
}