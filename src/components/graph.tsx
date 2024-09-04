"use client"

import { CartesianGrid, XAxis, YAxis, LineChart, Line } from "recharts"
import { convertToNaira, convertToNairaGraph } from "@/lib/defaults";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// const chartData = [
//     { month: "January", revenue: 8000, profit: 3000 },
//     { month: "February", revenue: 12000, profit: 5000 },
//     { month: "March", revenue: 9500, profit: 4000 },
//     { month: "April", revenue: 3000, profit: 1000 },
//     { month: "May", revenue: 11000, profit: 6000 },
//     { month: "June", revenue: 13000, profit: 7000 },
//     { month: "July", revenue: 1000, profit: 200 },
//     { month: "August", revenue: 20000, profit: 15000 },
//     { month: "September", revenue: 500, profit: 50 },
//     { month: "October", revenue: 15000, profit: 8000 },
//     { month: "November", revenue: 2400, profit: 1000 },
//     { month: "December", revenue: 4000, profit: 1200 },
// ];

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "#2563eb", // Color for the revenue line
    },
    profit: {
        label: "Profit",
        color: "#DBA362", // Color for the profit line
    },
} satisfies ChartConfig;

const LegendItem = ({ color, label }: any) => {
    return (
        <div className="flex items-center mr-4">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
            <span className="ml-2">{label}</span>
        </div>
    );
};

export const LineGraph = ({ chartData }: { chartData: { day: string, revenue: number, profit: number }[] }) => {
    return (
        <div>
            <h1 className=" font-medium text-lg md:text-2xl my-10"> Profit & Revenue</h1>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <LineChart data={chartData} >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="day"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={true}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        tickFormatter={(value) => convertToNairaGraph(value)}
                    />
                    <ChartTooltip
                        content={
                            <ChartTooltipContent
                               
                            />
                        }
                    />

                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke={chartConfig.revenue.color}
                        dot={false}

                    />
                    <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="#DBA362"
                        dot={false}
                    />
                </LineChart>
            </ChartContainer>
            <div className="flex justify-center mt-4">
                <LegendItem color={chartConfig.revenue.color} label={chartConfig.revenue.label} />
                <LegendItem color={chartConfig.profit.color} label={chartConfig.profit.label} />
            </div>
        </div>

    )
}