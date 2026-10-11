'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useAuth } from '@/lib/auth-context';
import { formatPrice, formatUnit, toBengaliNumber } from '@/lib/utils';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  Store,
  MapPin,
  TrendingUp,
  TrendingDown,
  Calendar,
  Lock,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface ProductDetailClientProps {
  product: Product | null;
  slug: string;
}

export default function ProductDetailClient({ product, slug }: ProductDetailClientProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedDivision, setSelectedDivision] = useState<string>('all');

  // Protected route check
  useEffect(() => {
    if (!isLoading && !user) {
      toast.error('পণ্য দেখতে প্রথমে লগইন করুন');
      router.replace(`/signin?redirect=/product/${encodeURIComponent(slug)}`);
    }
  }, [user, isLoading, router, slug]);

  // Loading state during auth check
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center animate-pulse">
        <div className="w-16 h-16 bg-slate-200 rounded-2xl mx-auto mb-4" />
        <div className="h-6 w-48 bg-slate-200 rounded-md mx-auto mb-2" />
        <p className="text-sm text-slate-400">নিরাপত্তা যাচাই করা হচ্ছে...</p>
      </div>
    );
  }

  // If not logged in yet, show auth gate message
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">
            লগইন প্রয়োজন
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            পণ্যের বাজারভিত্তিক বিস্তারিত বিশ্লেষণ ও দরদাম দেখতে অনুগ্রহ করে লগইন করুন।
          </p>
          <Link
            href={`/signin?redirect=/product/${encodeURIComponent(slug)}`}
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors"
          >
            <span>লগইন পেজে যান</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // If product not found
  if (!product) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <span className="text-4xl block mb-3">🔍</span>
          <h2 className="text-xl font-black text-slate-900 mb-2">
            পণ্যটি পাওয়া যায়নি
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            আপনার অনুরোধকৃত পণ্যের তথ্য ডাটাবেজে পাওয়া যায়নি।
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোমে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate Price Summaries
  const markets = product.markets || [];
  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((m) => m.min))
      : product.today;

  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((m) => m.max))
      : product.today;

  const avgPrice =
    markets.length > 0
      ? Math.round(
          markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) / markets.length
        )
      : product.today;

  // Extract unique divisions
  const divisions = Array.from(new Set(markets.map((m) => m.division)));

  const filteredMarkets =
    selectedDivision === 'all'
      ? markets
      : markets.filter((m) => m.division === selectedDivision);

  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const pct = Math.abs(product.change?.pct || 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সব পণ্যের তালিকায় ফিরুন</span>
        </Link>
      </div>

      {/* Top — Summary */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-5xl sm:text-6xl shadow-inner shrink-0">
              {product.image || '🛒'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Link
                  href={`/category/${product.category}`}
                  className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                >
                  <span>{product.categoryIcon}</span>
                  <span>{product.categoryNameBn}</span>
                </Link>

                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  {formatUnit(product.unit)}
                </span>

                <span
                  className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${
                    isUp
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : isDown
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{isUp ? '▲' : isDown ? '▼' : '—'}</span>
                  <span>{toBengaliNumber(pct)}% পরিবর্তন</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {product.nameBn}
              </h1>

              {/* Subtitle / Market summary line */}
              <p className="text-slate-500 text-sm sm:text-base font-medium mt-1">
                আজকের জাতীয় গড় বাজারদর অনুযায়ী প্রতি {formatUnit(product.unit).replace('প্রতি ', '')} এর মূল্য {formatPrice(product.today)}।
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center md:text-right">
            <span className="text-xs font-medium text-slate-500 block mb-0.5">
              আজকের জাতীয় গড় মূল্য
            </span>
            <span className="text-3xl font-black text-emerald-700">
              {formatPrice(product.today)}
            </span>
          </div>
        </div>

        {/* Price - Summary Cards (Min, Max, Avg) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
          {/* Minimum Price */}
          <div className="bg-emerald-50/60 rounded-2xl border border-emerald-200/80 p-5 text-center">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              সর্বনিম্ন বাজারমূল্য
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {formatPrice(minPrice)}
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              বিভিন্ন বাজারের মধ্যে সর্বনিম্ন
            </span>
          </div>

          {/* Average Price */}
          <div className="bg-sky-50/60 rounded-2xl border border-sky-200/80 p-5 text-center">
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block mb-1">
              গড় বাজারমূল্য
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {formatPrice(avgPrice)}
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              সকল বাজারের গড় হিসাব
            </span>
          </div>

          {/* Maximum Price */}
          <div className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-5 text-center">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
              সর্বোচ্চ বাজারমূল্য
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {formatPrice(maxPrice)}
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              বিভিন্ন বাজারের মধ্যে সর্বোচ্চ
            </span>
          </div>
        </div>

        {/* Historical Price Comparison Strip */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-xs text-slate-500 block mb-0.5">গতকাল</span>
            <span className="font-bold text-slate-800 text-sm sm:text-base">
              {formatPrice(product.yesterday)}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-xs text-slate-500 block mb-0.5">গত সপ্তাহ</span>
            <span className="font-bold text-slate-800 text-sm sm:text-base">
              {formatPrice(product.lastWeek)}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-xs text-slate-500 block mb-0.5">গত মাস</span>
            <span className="font-bold text-slate-800 text-sm sm:text-base">
              {formatPrice(product.lastMonth)}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl flex flex-col justify-center">
            <span className="text-xs text-slate-500 block mb-0.5">মূল্য প্রবণতা</span>
            <span
              className={`font-bold text-xs sm:text-sm flex items-center justify-center gap-1 ${
                isUp ? 'text-emerald-600' : isDown ? 'text-rose-600' : 'text-slate-600'
              }`}
            >
              {isUp ? (
                <>
                  <TrendingUp className="w-3.5 h-3.5" /> ঊর্ধ্বমুখী
                </>
              ) : isDown ? (
                <>
                  <TrendingDown className="w-3.5 h-3.5" /> নিম্নমুখী
                </>
              ) : (
                'স্থিতিশীল'
              )}
            </span>
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম (Market Breakdown) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                বাজারভিত্তিক আজকের দাম
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                দেশের বিভিন্ন পাইকারি ও খুচরা বাজারের বর্তমান দর ও তারতম্য
              </p>
            </div>
          </div>

          {/* Division Filter */}
          {divisions.length > 1 && (
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-sm font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">সকল বিভাগ ({markets.length}টি বাজার)</option>
                {divisions.map((div) => (
                  <option key={div} value={div}>
                    {div} বিভাগ
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Market Table / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMarkets.map((m, idx) => {
            const spread = m.max - m.min;
            return (
              <div
                key={`${m.market}-${idx}`}
                className="p-5 rounded-2xl border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all bg-slate-50/50"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {m.market}
                    </h3>
                    <div className="inline-flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{m.division} বিভাগ</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                    {formatUnit(product.unit)}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block">
                      মূল্য পরিসীমা
                    </span>
                    <span className="text-lg font-black text-slate-900">
                      {formatPrice(m.min)} – {formatPrice(m.max)}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-slate-500">
                    ব্যবধান {toBengaliNumber(spread)}৳
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
