import React from 'react';

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs animate-pulse">
      {/* Top Tag & Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-20 bg-slate-200 rounded-full" />
        <div className="h-5 w-14 bg-slate-200 rounded-full" />
      </div>

      {/* Emoji Circle */}
      <div className="w-16 h-16 mx-auto my-3 bg-slate-200 rounded-2xl" />

      {/* Name and unit */}
      <div className="space-y-2 mt-2 flex flex-col items-center">
        <div className="h-5 w-32 bg-slate-200 rounded-md" />
        <div className="h-3 w-16 bg-slate-200 rounded-md" />
      </div>

      {/* Price row */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-3 w-14 bg-slate-200 rounded-md" />
          <div className="h-6 w-24 bg-slate-200 rounded-md" />
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}
