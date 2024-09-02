"use server";
import { createClient } from '@/utils/supabase/client';
import { Product, Sales, Supplier } from '../type';
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

export const updateSupplier = async (id: string, supplier: Supplier): Promise<Supplier> => {
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
export const updateSale = async (id: string, sale: Omit<Sales,'sale_id'> ): Promise<Supplier> => {
  const { data, error } = await supabase
    .from('sales')
    .update(sale)
    .eq('sale_id', id)
    .single();

  if (error) {
    throw error;
  }
  revalidateTag('sales');
  revalidatePath('/');
  revalidatePath(`/${id}/edit`);
  return data;
}






export const recordSales = async (salesArray: { productId: string; quantity: number }[]) => {
  const updates = [];
  const salesToRecord: any[] = [];

  for (const sale of salesArray) {
    const { productId, quantity: quantitySold } = sale;

    // Fetch the current product details
    const { data: productData, error: productError } = await supabase
      .from('products')
      .select('quantity, name, sellingPrice')
      .eq('productId', productId)
      .single();

    if (productError) {
      console.error(`Error fetching product details for productId ${productId}:`, productError.message);
      continue; // Skip to the next sale
    }

    // Check if the product exists and if there's enough stock
    if (!productData) {
      console.error(`Product not found for productId ${productId}`);
      continue; // Skip to the next sale
    }

    if (productData.quantity < quantitySold) {
      console.error(`Not enough stock available for productId ${productId}`);
      throw new Error(`Not enough stock available for productId ${productId}`);
    }

    // Prepare updates and sales entries
    updates.push({
      productId,
      newQuantity: productData.quantity - quantitySold,
      productName: productData.name,
      price: productData.sellingPrice * quantitySold, // Calculate price based on quantity sold
      quantitySold,
    });
  }

  // Batch update quantities
  const updatePromises = updates.map(({ productId, newQuantity }) =>
    supabase
      .from('products')
      .update({ quantity: newQuantity })
      .eq('productId', productId)
      .single()
  );

  // Execute updates
  const updateResults = await Promise.all(updatePromises);

  // Check for errors in updates
  for (let i = 0; i < updateResults.length; i++) {
    const { error } = updateResults[i];
    if (error) {
      console.error(`Error updating product quantity for productId ${updates[i].productId}:`, error.message);
      continue; // Handle update error
    }
  }

  // Prepare sales records
  updates.forEach(({ productId, quantitySold, productName, price }) => {
    salesToRecord.push({
      productId,
      quantity_sold: quantitySold,
      date_sold: new Date().toISOString(),
      price,
      product_name: productName,
    });
  });

  // Check if there are sales to record
  if (salesToRecord.length > 0) {
    // Batch insert sales records
    const { error: saleError } = await supabase.from('sales').insert(salesToRecord);

    if (saleError) {
      console.error('Error recording sales:', saleError.message);
      return; // Handle insert error
    }

    console.log('Sales recorded successfully:', salesToRecord);
  } else {
    console.log('No sales records to insert.');
  }
};