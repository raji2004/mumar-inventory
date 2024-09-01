export const deleteProduct = async (id: string) => {
    const response = await fetch(`/api/product/${id}`, {
      method: 'DELETE',
    });
   
  
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  
    return await response.json();
  };