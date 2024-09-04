"use server";
import { createClient } from '@/utils/supabase/client';
import { BestSales, Product, Sales, SalesSummary, Supplier } from '../type';
import { revalidatePath, revalidateTag } from 'next/cache';
import { createClient as server } from '@/utils/supabase/server'

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

export const isAdmin = async () => {
    const supabaseServer = server();
    const { data, error } = await supabaseServer.auth.getUser();
    if (error) {
        throw error;
    }

    return data.user?.email === 'suleman_raji@yahoo.com';
};




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
export const getSaleById = async (id: string): Promise<Sales> => {
    const { data, error } = await supabase
        .from('sales')
        .select('*')
        .eq('sale_id', id)
        .single();

    if (error) {
        throw error;
    }

    // Revalidate all paths or components associated with the 'suppliers' tag
    revalidateTag('sales');
    revalidatePath('/');
    revalidatePath(`/${id}/edit`);
    return data;
}

export const getSalesForToday = async () => {
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10); // Format: YYYY-MM-DD

    const { data, error } = await supabase
        .from('sales')
        .select('*')
        .gte('date_sold', todayString)
        .lt('date_sold', new Date(today.getFullYear(), today.getMonth() + 1, 1).toISOString().slice(0, 10)); // Get all sales for the current day

    if (error) {
        console.error("Error fetching sales for today:", error.message);
        return [];
    }

    revalidateTag('sales');
    revalidatePath('/')
    return data;
}

export const getSalesSummary = async (filter:string):Promise<SalesSummary>  => {
    // await new Promise(resolve => setTimeout(resolve, 2000));
    const { data, error } = await supabase
        .rpc('get_sales_summary', { filter });

    if (error) {
        console.error('Error fetching sales summary:', error.message);
        throw error;
    }

   revalidatePath('/admin/reports');

    return data[0]
};

export const getBestSellingProducts=async():Promise<BestSales[]>=> {
    const { data, error } = await supabase.rpc('get_best_selling_product');

    if (error) {
        console.error('Error fetching best-selling products:', error);
        throw error;
    }
    revalidatePath('/admin/reports');
    return data;
}

export const getRevenueProfit = async ()=>{
    const { data, error } = await supabase.rpc('get_daily_revenue_profit');

    if (error) {
        console.error('Error fetching revenue and profit:', error);
        throw error;
    }
    revalidatePath('/admin/reports');
    return data;
}

