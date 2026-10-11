'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { getBengaliDate } from '@/lib/utils';
import { Category } from '@/types';
import { Menu, X, User as UserIcon, LogOut, Calendar, ChevronRight } from 'lucide-react';

interface NavbarProps {
  categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const bengaliDate = getBengaliDate();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo + Date */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink min-w-0">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center p-1.5 sm:p-2 shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর লোগো"
                width={36}
                height={36}
                className="object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-xl sm:text-2xl hidden" id="fallback-logo-emoji">
                🛒
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors truncate">
                  বাজার দর
                </span>
                <span className="text-[10px] sm:text-xs bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full shrink-0">
                  লাইভ
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate hidden xs:block">
                {bengaliDate}
              </p>
            </div>
          </Link>

          {/* Right-Side Auth & Mobile Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Desktop Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/profile"
                  className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                    pathname === '/profile'
                      ? 'bg-emerald-100 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                  title={user.name}
                >
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                    {user.name ? user.name.slice(0, 1).toUpperCase() : 'U'}
                  </span>
                  <span className="hidden md:inline font-medium max-w-[120px] truncate">{user.name}</span>
                </Link>

                <button
                  onClick={signOut}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200 cursor-pointer"
                  title="লগআউট"
                >
                  <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>লগআউট</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  href="/signin"
                  className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs hover:shadow transition-all whitespace-nowrap"
                >
                  সাইন আপ
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Category Navigation Bar (All Devices with smooth swipe on mobile) */}
      <nav className="bg-slate-50 border-t border-slate-200 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 py-2 min-w-max">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
                pathname === '/'
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              <span>🏠</span>
              <span>সব পণ্য</span>
            </Link>
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation Links (Overlay Dropdown) */}
      {mobileMenuOpen && (
        <div className="bg-white border-t border-slate-200 px-4 py-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2">
          {/* Bengali Date in Drawer */}
          <div className="flex items-center gap-2 p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-xs sm:text-sm text-emerald-800 font-semibold">
            <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>আজকের তারিখ: {bengaliDate}</span>
          </div>

          {/* User Auth Section inside Drawer */}
          {user ? (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                  {user.name ? user.name.slice(0, 1).toUpperCase() : 'U'}
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 text-sm truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>প্রোফাইল</span>
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>লগআউট</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 p-1">
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs sm:text-sm text-center transition-colors"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm text-center shadow-xs transition-colors"
              >
                সাইন আপ
              </Link>
            </div>
          )}

          {/* Category Links List */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
              সকল ক্যাটাগরি
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  pathname === '/'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>🏠</span>
                  <span>সব পণ্য</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </Link>
              {categories.map((cat) => {
                const isActive = pathname === `/category/${cat.slug}`;
                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.nameBn}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

