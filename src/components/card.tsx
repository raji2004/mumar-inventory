'use client';
import { Card, CardHeader, CardDescription, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { convertToNaira } from "@/lib/defaults";
import { BestSales } from "@/lib/type";
import Image from "next/image";


export const OverviewCard = ({ data }: { data: { totalProfit: number, totalRevenue: number, totalSales: number, filter: string } }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleSelect = (term: string) => {
        const params = new URLSearchParams(searchParams);
        console.log('term', term);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }
    return (
        <Card className=" min-h-72">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Overview</CardTitle>
                    </div>
                    <div className="relative w-32">
                        <Select defaultValue={data.filter} onValueChange={handleSelect}>
                            <SelectTrigger className="flex pl-10 items-center">
                                <Calendar className="absolute left-2" /> {/* Calendar icon inside the input */}
                                <SelectValue placeholder="Select Filter" className="pl-8" /> {/* Add padding to accommodate the icon */}
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="day">Day</SelectItem>
                                <SelectItem value="week">Week</SelectItem>
                                <SelectItem value="month">Month</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <p>{convertToNaira(data.totalProfit)}</p>
                        <h2 className="text-sm md:text-lg ">Total Profit</h2>
                    </div>
                    <div>
                        <p>{convertToNaira(data.totalRevenue)}</p>
                        <h2 className="text-sm md:text-lg text-orange  ">Total Revenue</h2>
                    </div>
                    <div >
                        <p>{data.totalSales}</p>
                        <h2 className="text-sm  md:text-lg text-purple  ">Number of Sales</h2>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


export const BestSellingProductCard = ({ data }: { data: BestSales[] }) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Best Selling Product</CardTitle>
            </CardHeader>
            <CardContent>
                {
                    data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full"> {/* Center the empty state */}
                            <Image src="/Empty.svg" alt="empty" width={150} height={150} />
                            <p className="mt-2  text-gray-500">No sales made</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-end text-gray-500 mb-2">
                                <h1>Category</h1>
                                <h1>Total Sold</h1>
                            </div>
                            {data.map((product, index) => (
                                <div key={index} className="flex justify-between items-center py-2">
                                    <h1>{product.product_name}</h1>
                                    <h1 className="mr-9">{product.total_quantity_sold}</h1>
                                </div>
                            ))}
                        </>
                    )
                }
            </CardContent>
        </Card>
    )
}