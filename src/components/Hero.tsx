'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const scrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('সব-পণ্য');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white overflow-hidden py-12 md:py-16">
      {/* Decorative background glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-semibold tracking-wide">
              <TrendingUp className="w-4 h-4 text-emerald-300" />
              <span>প্রতিদিনের বাজারের হালনাগাদ তথ্য</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              নিত্যপ্রয়োজনীয় পণ্যের সঠিক দাম জানুন এক ক্লিকেই
            </h1>

            {/* Subtitle */}
            <p className="text-emerald-100/90 text-base sm:text-lg max-w-2xl leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ ও মাংসসহ প্রতিদিনের প্রয়োজনীয় সব পণ্যের বাজারের সর্বশেষ দরদাম এবং পরিবর্তনের তুলনামূলক চিত্র।
            </p>

            {/* CTA + Badges */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#সব-পণ্য"
                onClick={scrollToProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer text-base"
              >
                <span>আজকের বাজারদর দেখুন</span>
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </a>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>যাচাইকৃত তথ্য ও বাজার বিশ্লেষণ</span>
              </div>
            </div>
          </div>

          {/* Right Banner Image Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-emerald-950/40 p-2">
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর হিরো ব্যানার"
                fill
                priority
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
