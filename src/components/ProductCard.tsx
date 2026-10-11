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
      className="group block bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-200 overflow-hidden relative p-5"
    >
      {/* Top row: Category tag & Change badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
          <span>{product.categoryIcon}</span>
          <span>{product.categoryNameBn}</span>
        </span>

        <span
          className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border ${badgeConfig.classes}`}
        >
          <span>{badgeConfig.symbol}</span>
          <span>{toBengaliNumber(pct)}%</span>
        </span>
      </div>

      {/* Emoji Illustration */}
      <div className="w-16 h-16 mx-auto my-3 rounded-2xl bg-emerald-50/60 flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform duration-200">
        {product.image || '🛒'}
      </div>

      {/* Product Name */}
      <div className="text-center mt-2">
        <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-700 transition-colors line-clamp-1">
          {product.nameBn}
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          {formatUnit(product.unit)}
        </p>
      </div>

      {/* Price Section */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-end justify-between">
        <div>
          <span className="text-xs font-medium text-slate-400 block mb-0.5">
            আজকের দাম
          </span>
          <span className="text-xl font-black text-slate-900">
            {formatPrice(product.today)}
          </span>
        </div>

        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-emerald-600 text-slate-500 group-hover:text-white flex items-center justify-center transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
