// components/LoadingSkeleton.tsx

import React from 'react';

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

