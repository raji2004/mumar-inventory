"use server";
import { createClient } from '@/utils/supabase/client';
import { Product, Supplier } from '../type';
import { revalidatePath, revalidateTag } from 'next/cache';

const supabase = createClient();

export const getAllProduct = async ({ query }: { query?: string } = {}): Promise<Product[]> => {
    let queryBuilder = supabase.from('product_availability').select('*');

    // If a query is provided, filter by name
    if (query) {
        queryBuilder = queryBuilder.ilike('name', `%${query}%`); // Case-insensitive search
    }

    const { data, error } = await queryBuilder;

    if (error) {
        throw error;
    }

    // Revalidate all paths or components associated with the 'products' tag
    revalidateTag('products');
    revalidatePath('/admin/inventory');
    return data;
}

export const getAllSupplier = async ({ query }: { query?: string } = {}): Promise<Supplier[]> => {
    let queryBuilder = supabase.from('suppliers').select('*');

    // If a query is provided, filter by name
    if (query) {
        queryBuilder = queryBuilder.ilike('name', `%${query}%`); // Case-insensitive search
    }

    const { data, error } = await queryBuilder;

    if (error) {
        throw error;
    }

    // Revalidate all paths or components associated with the 'suppliers' tag
    revalidateTag('suppliers');
    revalidatePath('/admin/suppliers');
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

    // Revalidate all paths or components associated with the 'products' tag
    revalidateTag('products');
    revalidatePath('/admin/inventory');
    revalidatePath(`/admin/inventory/${id}/edit`);
    return data;
}

export const getSupplierById = async (id: string): Promise<Supplier> => {
    const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .eq('supplierId', id)
        .single();

    if (error) {
        throw error;
    }

    // Revalidate all paths or components associated with the 'suppliers' tag
    revalidateTag('suppliers');
    revalidatePath('/admin/suppliers');
    revalidatePath(`/admin/suppliers/${id}/edit`);
    return data;
}
