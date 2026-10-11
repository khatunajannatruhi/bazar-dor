import React from 'react';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';

export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 animate-pulse flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-slate-200 rounded-md" />
            <div className="h-8 w-40 bg-slate-200 rounded-md" />
          </div>
        </div>
        <div className="h-10 w-44 bg-slate-200 rounded-xl" />
      </div>

      {/* Grid of skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
