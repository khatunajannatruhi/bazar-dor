import React from 'react';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';

export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Header skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 animate-pulse flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-slate-200 shrink-0" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-slate-200 rounded-md" />
            <div className="h-7 sm:h-8 w-36 sm:w-40 bg-slate-200 rounded-md" />
          </div>
        </div>
        <div className="h-10 w-full sm:w-44 bg-slate-200 rounded-xl" />
      </div>

      {/* Grid of skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
