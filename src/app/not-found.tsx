import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-xl">
        <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-6 border border-emerald-100 shadow-inner">
          🛒
        </div>

        <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-wider">
          ৪০৪ ত্রুটি — পৃষ্ঠা পাওয়া যায়নি
        </span>

        <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-4 mb-2">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          আপনি যে পেজ বা পণ্য খুঁজছেন তা হয়তো সরানো হয়েছে অথবা লিংকটি সঠিক নয়।
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-sm cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}
