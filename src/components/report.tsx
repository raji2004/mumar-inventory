// SalesSummary.tsx
import { OverviewCard,BestSellingProductCard } from "@/components/card";
import { getSalesSummary,getBestSellingProducts, getRevenueProfit } from "@/lib/db/read";
import { LineGraph } from "./graph";

export const SalesSummary = async ({ query }: { query: string }) => {
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
    const bestSellingProducts = await getBestSellingProducts();
    return <BestSellingProductCard data={bestSellingProducts} />;

}

export const ProfitVsRevenueGraph = async () =>{
    const revenueProfit = await getRevenueProfit();
    return <LineGraph chartData={revenueProfit} />;
}

