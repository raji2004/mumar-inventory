import { OverviewSkeleton, BestSellingProductSkeleton,LineGraphSkeleton } from "@/components/skeleton";
import { SalesSummary, BestSellingProducts,ProfitVsRevenueGraph } from "@/components/report";
import { Suspense } from "react";



export default async function Page({ searchParams }: { searchParams: { query: string } }) {
    const filter = searchParams.query;
    return (
        <div className="w-full space-y-6 p-4 pb-10">
            <div className=" flex flex-col md:flex-row items-center gap-5">
                <Suspense fallback={<OverviewSkeleton />}>
                    <SalesSummary query={filter} />
                </Suspense>
                <div className=" md:w-2/5">

                    <Suspense fallback={<BestSellingProductSkeleton />}>
                        <BestSellingProducts />
                    </Suspense>
                </div>
            </div>
            <Suspense fallback={<LineGraphSkeleton />}>
                <ProfitVsRevenueGraph />
            </Suspense>
           

        </div>
    );
}