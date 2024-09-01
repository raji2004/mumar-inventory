import { revalidatePath, revalidateTag } from "next/cache";

export const deleteProduct = async (id: string) => {
    const response = await fetch(`/api/product/${id}`, {
      method: 'DELETE',
    });
   
  
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    revalidateTag('products');
    revalidatePath('/admin/inventory');
    revalidatePath(`/admin/inventory/${id}/edit`);
  
    return await response.json();
  };
export const deleteSupplier = async (id: string) => {
    const response = await fetch(`/api/supplier/${id}`, {
      method: 'DELETE',
    });
   
  
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    revalidateTag('suppliers');
    revalidatePath('/admin/suppliers');
    revalidatePath(`/admin/suppliers/${id}/edit`);
  
    return await response.json();
  };