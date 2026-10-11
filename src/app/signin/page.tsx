'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { GoogleIcon, GitHubIcon } from '@/components/SocialIcons';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';
  const { signIn, signInSocial, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) {
      router.push(redirectUrl);
    }
  }, [user, router, redirectUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড প্রদান করুন');
      return;
    }

    setIsSubmitting(true);
    const success = await signIn(email, password);
    setIsSubmitting(false);

    if (success) {
      router.push(redirectUrl);
    } else {
      setErrorMsg('লগইন ব্যর্থ হয়েছে। সঠিক ইমেইল ও পাসওয়ার্ড দিন।');
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsSubmitting(true);
    // Direct OAuth redirect to Google or GitHub - no premature navigation to homepage
    await signInSocial(provider, redirectUrl);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 border border-emerald-200 shadow-xs">
            🛒
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            লগইন করুন
          </h1>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            আপনার অ্যাকাউন্টে প্রবেশ করে বাজার বিশ্লেষণ দেখুন
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl font-medium animate-in fade-in">
            {errorMsg}
          </div>
        )}

        {/* Credentials Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              ইমেইল অ্যাড্রেস
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 font-medium text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 font-medium text-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
          >
            <LogIn className="w-4 h-4" />
            <span>{isSubmitting ? 'লগইন হচ্ছে...' : 'লগইন করুন'}</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs font-bold uppercase tracking-wider text-slate-400">
            <span className="bg-white px-3">অথবা সোশ্যাল লগইন</span>
          </div>
        </div>

        {/* Social Login Buttons with Professional SVG Icons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2.5 py-3 px-4 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            <GoogleIcon className="w-5 h-5 shrink-0" />
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin('github')}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2.5 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            <GitHubIcon className="w-5 h-5 shrink-0" />
            <span>GitHub</span>
          </button>
        </div>

        {/* Link to Register */}
        <p className="text-center text-sm text-slate-600 pt-4 border-t border-slate-100">
          নতুন ব্যবহারকারী?{' '}
          <Link
            href="/signup"
            className="font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
          >
            <span>রেজিস্টার করুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
