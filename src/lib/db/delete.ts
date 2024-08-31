import { createClient } from '@/utils/supabase/client';
import { Product } from '../type';

const supabase = createClient();

export const deleteProduct = async (id: string): Promise<Product> => {
    const { data, error } = await supabase
        .from('product_availability')
        .delete()
        .eq('productId', id)
        .single();
    
    if (error) {
        throw error;
    }
    
    return data;
}