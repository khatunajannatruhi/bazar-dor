import React from 'react';

export default function Footer() {
  return (
    <footer suppressHydrationWarning className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Left Text */}
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <p className="font-semibold text-slate-100 text-sm sm:text-base">
              বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          {/* Right Disclaimer */}
          <p className="text-xs sm:text-sm text-slate-400 italic">
            “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p suppressHydrationWarning>© {new Date().getFullYear()} বাজার দর (BazarDor)। সর্বস্বত্ব সংরক্ষিত।</p>
          <p suppressHydrationWarning>দৈনন্দিন নিত্যপ্রয়োজনীয় পণ্যের সঠিক ও সময়োপযোগী বাজারদর প্ল্যাটফর্ম।</p>
        </div>
      </div>
    </footer>
  );
}
