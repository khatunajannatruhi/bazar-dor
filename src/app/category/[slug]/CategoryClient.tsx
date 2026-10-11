'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Category, Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import SortDropdown, { SortOption, sortProducts } from '@/components/SortDropdown';
import { Home, ArrowLeft } from 'lucide-react';

interface CategoryClientProps {
  category: Category | null;
  products: Product[];
  categorySlug: string;
}

export default function CategoryClient({
  category,
  products,
  categorySlug,
}: CategoryClientProps) {
  const [sortOption, setSortOption] = useState<SortOption>('default');

  // Empty state if category not found or no items in category
  if (!category || products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-10 sm:p-16 shadow-xs max-w-lg mx-auto">
          <div className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
            🧺
          </div>
          <span className="text-sm font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-wider">
            খালি বা অপ্রাপ্য ক্যাটাগরি
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-4 mb-3">
            কোনো পণ্য খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            &quot;{category?.nameBn || categorySlug}&quot; ক্যাটাগরিতে বর্তমানে কোনো পণ্য নিবন্ধিত নেই অথবা ক্যাটাগরিটি সঠিক নয়।
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  const sortedProducts = sortProducts(products, sortOption);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumb / Back button */}
      <div className="mb-4 sm:mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজ</span>
        </Link>
      </div>

      {/* Header with Title + Icon and Sort control */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 md:p-8 shadow-xs mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl sm:text-3xl shadow-xs shrink-0">
            {category.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-100 px-2 sm:px-2.5 py-0.5 rounded-full">
                ক্যাটাগরি
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500">
                মোট {products.length}টি পণ্য
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-1">
              {category.nameBn}
            </h1>
          </div>
        </div>

        {/* Sort control - C1 */}
        <div className="w-full md:w-auto shrink-0">
          <SortDropdown currentSort={sortOption} onSortChange={setSortOption} />
        </div>
      </div>

      {/* Product Cards List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
