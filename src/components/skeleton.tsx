import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';


export const InvoiceSkeleton: React.FC = () => {
    return (
        <div className="p-4 space-y-6">
            {/* Title Skeleton */}
            <div className="h-8 bg-gray-300 animate-pulse rounded-md w-1/4"></div>

            {/* Search Skeleton */}
            <div className="flex md:flex-row md:gap-0 flex-col-reverse items-center justify-between">
                <div className="h-10 bg-gray-300 animate-pulse rounded-md w-1/3"></div>
            </div>

            {/* Buttons Skeleton */}
            <div className="space-x-3 flex justify-end">
                <div className="h-10 bg-gray-300 animate-pulse rounded-md w-1/4"></div>
                <div className="h-10 bg-gray-300 animate-pulse rounded-md w-1/4"></div>
            </div>

            {/* Table Skeleton */}
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex justify-between p-4 bg-gray-200 rounded-md animate-pulse">
                        <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
                        <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
                        <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const OverviewSkeleton = () => {
    return (
        <div className="p-4 w-full md:w1/2 border rounded-lg bg-white shadow">
            {/* Card Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="relative w-32">
                    <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
                </div>
            </div>
            {/* Card Content */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
    );
};

// EditProductSkeleton.tsx
 export const EditFormSkeleton = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-5 p-4">
            <h1 className="text-2xl md:text-4xl font-semibold mt-4 bg-gray-200 animate-pulse w-1/2 h-8"></h1>
            <div className="space-y-4 w-full max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="animate-pulse bg-gray-200 rounded h-12"></div>
                    ))}
                </div>
                <div className="animate-pulse bg-gray-200 rounded h-12"></div>
            </div>
        </div>
    );
};

export const BestSellingProductSkeleton = () => {
    return (
        <Card className=' w-full md:w1/2'>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="animate-pulse bg-gray-200 h-6 w-1/2"></CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="animate-pulse">
                        <p className="bg-gray-200 h-4 w-full mb-2"></p>
                        <h2 className="bg-gray-200 h-4 w-1/2"></h2>
                    </div>
                    <div className="animate-pulse">
                        <p className="bg-gray-200 h-4 w-full mb-2"></p>
                        <h2 className="bg-gray-200 h-4 w-1/2"></h2>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export const LineGraphSkeleton = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="animate-pulse w-full min-h-[200px] bg-gray-200 rounded-lg">
                {/* Placeholder for the chart */}
                <div className="h-full flex justify-center items-center">
                    <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <div className="flex items-center mr-4">
                    <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                    <span className="ml-2 bg-gray-300 w-16 h-4 rounded"></span>
                </div>
                <div className="flex items-center mr-4">
                    <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                    <span className="ml-2 bg-gray-300 w-16 h-4 rounded"></span>
                </div>
            </div>
        </div>
    );
};



