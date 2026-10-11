import React from 'react';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';

export default function HomeLoading() {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">
      {/* Hero skeleton */}
      <div className="h-48 sm:h-64 bg-slate-100 rounded-3xl animate-pulse" />

      {/* Product Grid skeleton */}
      <div className="space-y-4">
        <div className="h-6 sm:h-8 w-36 sm:w-48 bg-slate-200 rounded-md animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
