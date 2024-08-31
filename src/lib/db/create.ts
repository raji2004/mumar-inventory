import { createClient } from '@/utils/supabase/client';
import { Product } from '../type';

const supabase = createClient();

export const createProduct = async (product:  Omit<Product, 'availability'>) => {
    const { data, error } = await supabase.from('products').insert(product);
    if (error) {
        throw error;
    }
    return data;
}