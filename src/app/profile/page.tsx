'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { User, Mail, Shield, Edit3, LogOut, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error('প্রোফাইল দেখতে প্রথমে লগইন করুন');
      router.replace('/signin');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center animate-pulse">
        <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4" />
        <div className="h-6 w-40 bg-slate-200 rounded-md mx-auto mb-2" />
        <div className="h-4 w-60 bg-slate-200 rounded-md mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরুন</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Profile Header Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 px-6 sm:px-10 pt-10 pb-16 text-white relative">
          <h1 className="text-2xl sm:text-3xl font-black">আমার প্রোফাইল</h1>
          <p className="text-emerald-100 text-sm mt-1">
            আপনার অ্যাকাউন্টের ব্যক্তিগত তথ্য ও সেটিংস
          </p>
        </div>

        {/* Profile Body */}
        <div className="px-6 sm:px-10 pb-10 relative -mt-10">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-slate-100">
              <div className="w-20 h-20 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-3xl shadow-lg ring-4 ring-emerald-50 shrink-0">
                {user.name ? user.name.slice(0, 1).toUpperCase() : 'U'}
              </div>
              <div className="text-center sm:text-left space-y-1">
                <h2 className="text-2xl font-black text-slate-900">{user.name}</h2>
                <p className="text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-1.5 font-medium">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{user.email}</span>
                </p>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  লগইন মাধ্যম
                </span>
                <span className="text-sm font-bold text-slate-800 capitalize flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>{user.provider || 'BetterAuth Credentials'}</span>
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  অ্যাকাউন্ট স্ট্যাটাস
                </span>
                <span className="text-sm font-bold text-emerald-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>সক্রিয় ব্যবহারকারী</span>
                </span>
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <Link
                href="/profile/update"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-sm cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>তথ্য আপডেট করুন</span>
              </Link>

              <button
                onClick={() => {
                  signOut();
                  router.push('/');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold rounded-xl transition-colors text-sm cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>লগআউট করুন</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
