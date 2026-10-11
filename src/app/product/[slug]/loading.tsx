import React from 'react';

export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-pulse">
      <div className="h-6 w-32 bg-slate-200 rounded-md" />

      {/* Top summary card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-slate-200" />
          <div className="space-y-3 flex-1">
            <div className="h-5 w-40 bg-slate-200 rounded-md" />
            <div className="h-8 w-60 bg-slate-200 rounded-md" />
            <div className="h-4 w-80 bg-slate-200 rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="h-28 bg-slate-100 rounded-2xl" />
          <div className="h-28 bg-slate-100 rounded-2xl" />
          <div className="h-28 bg-slate-100 rounded-2xl" />
        </div>
      </div>

      {/* Markets skeleton */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
        <div className="h-7 w-52 bg-slate-200 rounded-md mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 bg-slate-100 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
