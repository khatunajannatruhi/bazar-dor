'use client';

import React from 'react';
import { Product } from '@/types';
import { formatPrice, formatUnit, toBengaliNumber } from '@/lib/utils';
import Link from 'next/link';

interface TickerProps {
  products: Product[];
}

export default function Ticker({ products }: TickerProps) {
  if (!products || products.length === 0) return null;

  // Duplicate items to ensure smooth infinite loop
  const tickerItems = [...products, ...products];

  return (
    <div className="bg-emerald-950 text-emerald-100 border-y border-emerald-800/60 overflow-hidden py-2 text-xs sm:text-sm select-none">
      <div className="animate-ticker items-center gap-6 whitespace-nowrap">
        {tickerItems.map((p, idx) => {
          const isUp = p.change?.dir === 'up';
          const isDown = p.change?.dir === 'down';
          const badgeClass = isUp
            ? 'text-emerald-400 bg-emerald-900/60'
            : isDown
            ? 'text-rose-400 bg-rose-950/60'
            : 'text-slate-400 bg-slate-800/60';
          const symbol = isUp ? '▲' : isDown ? '▼' : '—';
          const pct = Math.abs(p.change?.pct || 0);

          return (
            <Link
              key={`${p.id}-${idx}`}
              href={`/product/${p.slug}`}
              className="inline-flex items-center gap-2 hover:text-emerald-300 transition-colors cursor-pointer px-1"
            >
              <span className="text-base">{p.image || '🛒'}</span>
              <span className="font-medium text-white">{p.nameBn}</span>
              <span className="text-emerald-200">
                {formatPrice(p.today)}/{formatUnit(p.unit).replace('প্রতি ', '')}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-semibold ${badgeClass}`}
              >
                <span>{symbol}</span>
                <span>{toBengaliNumber(pct)}%</span>
              </span>
              <span className="text-emerald-700 mx-2">•</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
