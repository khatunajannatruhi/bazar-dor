'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { User, ArrowLeft, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UpdateProfilePage() {
  const router = useRouter();
  const { user, isLoading, updateProfileName } = useAuth();
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error('প্রোফাইল আপডেট করতে প্রথমে লগইন করুন');
      router.replace('/signin');
    } else if (user) {
      setName(user.name);
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('নামের ঘরটি খালি রাখা যাবে না');
      return;
    }

    setIsSubmitting(true);
    // Follows https://better-auth.com/docs/concepts/users-accounts#update-user
    const success = await updateProfileName(name.trim());
    setIsSubmitting(false);

    if (success) {
      router.push('/profile');
    }
  };

  if (isLoading || !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center animate-pulse">
        <div className="w-16 h-16 bg-slate-200 rounded-2xl mx-auto mb-4" />
        <div className="h-6 w-44 bg-slate-200 rounded-md mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back to Profile */}
      <div className="mb-6">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 border border-emerald-200">
            ✍️
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন
          </p>
        </div>

        {/* Update Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              আপনার নাম
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="নতুন নাম লিখুন"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 font-medium text-sm transition-all"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              বর্তমান ইমেইল: {user.email} (অপরিবর্তনীয়)
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'আপডেট হচ্ছে...' : 'তথ্য সংরক্ষণ করুন'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
