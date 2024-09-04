// SalesSummary.tsx
import { OverviewCard,BestSellingProductCard } from "@/components/card";
import { OverviewSkeleton } from "@/components/skeleton";
import { getSalesSummary,getBestSellingProducts, getRevenueProfit } from "@/lib/db/read";
import { LineGraph } from "./graph";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const SalesSummary = async ({ query }: { query: string }) => {
    await delay(2000); // Delay for demonstration

    const salesSummary = await getSalesSummary(query);
    const data = {
        totalProfit: salesSummary?.total_profit,
        totalRevenue: salesSummary?.total_revenue,
        totalSales: salesSummary?.total_sales,
        filter: query
    };

    return <OverviewCard data={data} />;
};

export const BestSellingProducts = async () => {
    await delay(2000); // Delay for demonstration

    const bestSellingProducts = await getBestSellingProducts();
    return <BestSellingProductCard data={bestSellingProducts} />;

}

export const ProfitVsRevenueGraph = async () =>{
    await delay(2000); // Delay for demonstration

    const revenueProfit = await getRevenueProfit();
    return <LineGraph chartData={revenueProfit} />;
}

