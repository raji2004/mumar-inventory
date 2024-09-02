// app/api/products/route.js
import { NextResponse,NextRequest } from 'next/server';
import { recordSales } from '@/lib/db/update';

export async function POST(request: NextRequest) {
    const { products } = await request.json();

    // Validate the input
    if (!Array.isArray(products) || products.length === 0) {
        return NextResponse.json({ message: 'Invalid products data' }, { status: 400 });
    }

    // Here, you would typically process the data (e.g., save to database)
    // For demonstration, we're just logging it
   
    try {
        await recordSales(products);
    } catch (error) {    
        return NextResponse.json({ message: 'Failed to store products' }, { status: 500 });
    }

    // Respond with success
    return NextResponse.json({ message: 'Products stored successfully' }, { status: 200 });
}