'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import SortDropdown, { SortOption, sortProducts } from '@/components/SortDropdown';
import { TrendingUp, TrendingDown, LayoutGrid, Search } from 'lucide-react';

interface HomePageClientProps {
  products: Product[];
}

export default function HomePageClient({ products }: HomePageClientProps) {
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [searchQuery, setSearchQuery] = useState('');

  // Top 6 Risers (দাম বেড়েছে ▲)
  const topRisers = useMemo(() => {
    return products
      .filter((p) => p.change?.dir === 'up' || (p.change?.pct && p.change.pct > 0))
      .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
      .slice(0, 6);
  }, [products]);

  // Top 6 Fallers (দাম কমেছে ▼)
  const topFallers = useMemo(() => {
    return products
      .filter((p) => p.change?.dir === 'down' || (p.change?.pct && p.change.pct < 0))
      .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
      .slice(0, 6);
  }, [products]);

  // All Products with filtering and sorting
  const processedProducts = useMemo(() => {
    let filtered = products;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.nameBn.toLowerCase().includes(q) ||
          p.categoryNameBn.toLowerCase().includes(q)
      );
    }
    return sortProducts(filtered, sortOption);
  }, [products, searchQuery, sortOption]);

  return (
    <div className="space-y-16 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section A — আজ দাম বেড়েছে ▲ */}
      {topRisers.length > 0 && (
        <section className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-emerald-100 gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-xs">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  আজ দাম বেড়েছে <span className="text-emerald-600 font-extrabold">▲</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  গতকালের তুলনায় বাজারে সবচেয়ে বেশি মূল্যবৃদ্ধি হওয়া শীর্ষ ৬টি পণ্য
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {topRisers.map((p) => (
              <ProductCard key={`riser-${p.id}`} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Section B — আজ দাম কমেছে ▼ */}
      {topFallers.length > 0 && (
        <section className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-rose-100 gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold shadow-xs">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  আজ দাম কমেছে <span className="text-rose-600 font-extrabold">▼</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  গতকালের তুলনায় বাজারে উল্লেখযোগ্য দরপতন হওয়া শীর্ষ ৬টি পণ্য
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {topFallers.map((p) => (
              <ProductCard key={`faller-${p.id}`} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Section C — সব পণ্য with subtitle and Sort */}
      <section id="সব-পণ্য" className="scroll-mt-24 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs shrink-0 mt-1">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                সব পণ্য
              </h2>
              <p className="text-sm text-slate-500 font-medium mt-1">
                দৈনন্দিন সব নিত্যপ্রয়োজনীয় পণ্যের বিস্তারিত তালিকা ও বর্তমান বাজারমূল্য
              </p>
            </div>
          </div>

          {/* Controls: Search and Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="পণ্য খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-slate-800"
              />
            </div>

            <SortDropdown currentSort={sortOption} onSortChange={setSortOption} />
          </div>
        </div>

        {processedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
            <span className="text-4xl block mb-2">🔍</span>
            <h3 className="text-lg font-bold text-slate-800">কোনো পণ্য পাওয়া যায়নি</h3>
            <p className="text-sm text-slate-500 mt-1">
              অনুগ্রহ করে ভিন্ন কোনো নাম দিয়ে খুঁজুন
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {processedProducts.map((p) => (
              <ProductCard key={`all-${p.id}`} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
