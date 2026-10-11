import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice, formatUnit, toBengaliNumber } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const pct = Math.abs(product.change?.pct || 0);

  const badgeConfig = isUp
    ? {
        symbol: '▲',
        classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      }
    : isDown
    ? {
        symbol: '▼',
        classes: 'bg-rose-50 text-rose-700 border-rose-200',
      }
    : {
        symbol: '—',
        classes: 'bg-slate-100 text-slate-600 border-slate-200',
      };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-200 overflow-hidden relative p-4 sm:p-5"
    >
      {/* Top row: Category tag & Change badge */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
        <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60 truncate max-w-[130px] sm:max-w-none">
          <span>{product.categoryIcon}</span>
          <span className="truncate">{product.categoryNameBn}</span>
        </span>

        <span
          className={`inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full border shrink-0 ${badgeConfig.classes}`}
        >
          <span>{badgeConfig.symbol}</span>
          <span>{toBengaliNumber(pct)}%</span>
        </span>
      </div>

      {/* Emoji Illustration */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto my-2 sm:my-3 rounded-2xl bg-emerald-50/60 flex items-center justify-center text-3xl sm:text-4xl shadow-inner group-hover:scale-110 transition-transform duration-200">
        {product.image || '🛒'}
      </div>

      {/* Product Name */}
      <div className="text-center mt-1 sm:mt-2">
        <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-emerald-700 transition-colors line-clamp-1">
          {product.nameBn}
        </h3>
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
          {formatUnit(product.unit)}
        </p>
      </div>

      {/* Price Section */}
      <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100 flex items-end justify-between">
        <div>
          <span className="text-[11px] sm:text-xs font-medium text-slate-400 block mb-0.5">
            আজকের দাম
          </span>
          <span className="text-lg sm:text-xl font-black text-slate-900">
            {formatPrice(product.today)}
          </span>
        </div>

        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 group-hover:bg-emerald-600 text-slate-500 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
      </div>
    </Link>
  );
}
