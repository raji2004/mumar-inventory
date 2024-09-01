import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } } // Correctly access params here
) {
  console.log('DELETE request received for product ID:', params.id);

  const { id } = params;

  if (!id) {
    console.log('Invalid product ID');
    return NextResponse.json({ message: 'Valid product ID is required' }, { status: 400 });
  }

  const supabase = createClient();

  try {
    console.log('Attempting to delete product from Supabase');
    const { data, error } = await supabase
      .from('product_availability')
      .delete()
      .eq('productId', id)
      .single();

    if (error) {
      console.error('Supabase deletion error:', error);
      throw error;
    }

    console.log('Product deleted successfully:', data);

    // Revalidate the path
    revalidatePath('/admin/inventory',"page");

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
