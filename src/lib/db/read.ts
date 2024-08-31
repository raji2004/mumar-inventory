import { createClient } from '@/utils/supabase/client';
import { Product } from '../type';
import { revalidatePath } from 'next/cache'

const supabase = createClient();

export const getAllProduct = async (): Promise<Product[]> => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(3000);

    const { data, error } = await supabase
        .from('product_availability')
        .select('*');
    if (error) {
        throw error;
    }
   revalidatePath('/admin/inventory', 'layout')
    return data;
}

export const getProductById = async (id: string): Promise<Product> => {
    const { data, error } = await supabase
        .from('product_availability')
        .select('*')
        .eq('productId', id)
        .single();
    
    if (error) {
        throw error;
    }
    
    return data;
}