'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowDownUp } from 'lucide-react';
import { Product } from '@/types';

export type SortOption = 'default' | 'price_asc' | 'price_desc';

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'default', label: 'ডিফল্ট' },
  { id: 'price_asc', label: 'দাম: কম থেকে বেশি' },
  { id: 'price_desc', label: 'দাম: বেশি থেকে কম' },
];

export function sortProducts(products: Product[], sortOption: SortOption): Product[] {
  const cloned = [...products];
  if (sortOption === 'price_asc') {
    return cloned.sort((a, b) => Number(a.today) - Number(b.today));
  }
  if (sortOption === 'price_desc') {
    return cloned.sort((a, b) => Number(b.today) - Number(a.today));
  }
  return cloned;
}

export default function SortDropdown({ currentSort, onSortChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    SORT_OPTIONS.find((opt) => opt.id === currentSort)?.label || 'ডিফল্ট';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-600 hidden sm:inline">
          সাজান:
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between gap-2 px-3.5 py-2 text-sm font-semibold text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-xs cursor-pointer min-w-[160px]"
        >
          <div className="flex items-center gap-2">
            <ArrowDownUp className="w-4 h-4 text-emerald-600" />
            <span>{selectedLabel}</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-500 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-30 mt-2 w-52 origin-top-right rounded-xl bg-white shadow-xl border border-slate-200 py-1.5 focus:outline-hidden animate-in fade-in zoom-in-95">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onSortChange(option.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors ${
                currentSort === option.id
                  ? 'bg-emerald-50 text-emerald-800 font-bold'
                  : 'text-slate-700 hover:bg-slate-100 font-medium'
              }`}
            >
              <span>{option.label}</span>
              {currentSort === option.id && (
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
