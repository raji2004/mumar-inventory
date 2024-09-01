import { createClient } from '@/utils/supabase/client';
import { Product ,Supplier} from '../type';
import { revalidatePath } from 'next/cache'

const supabase = createClient();

export const getAllProduct = async ({query}:{query?: string}={}): Promise<Product[]> => {
  

    let queryBuilder = supabase.from('product_availability').select('*');

    // If a query is provided, filter by name
    if (query) {
        queryBuilder = queryBuilder.ilike('name', `%${query}%`); // Case-insensitive search
    }

    const { data, error } = await queryBuilder;

    if (error) {
        throw error;
    }

    revalidatePath('/admin/inventory', 'layout');
    return data;
}
export const getAllSupplier= async ({query}:{query?: string}={}): Promise<Supplier[]> => {
  

    let queryBuilder = supabase.from('suppliers').select('*');

    // If a query is provided, filter by name
    if (query) {
        queryBuilder = queryBuilder.ilike('name', `%${query}%`); // Case-insensitive search
    }

    const { data, error } = await queryBuilder;

    if (error) {
        throw error;
    }

    revalidatePath('/admin/suppliers', 'page');
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