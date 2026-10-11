import type { Metadata } from 'next';
import { Hind_Siliguri } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Ticker from '@/components/Ticker';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/lib/auth-context';
import { getCategories, getProducts } from '@/lib/api';
import { Toaster } from 'react-hot-toast';

const hindSiliguri = Hind_Siliguri({
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-hind',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের প্রতিদিনের বাজারদর',
  description:
    'চাল, ডাল, তেল, সবজি, মাছ ও মাংসসহ দৈনন্দিন নিত্যপ্রয়োজনীয় পণ্যের নির্ভরযোগ্য ও হালনাগাদ বাজারদর জানুন এক নজরে।',
  icons: {
    icon: '/logo-icon.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <html lang="bn" className={`${hindSiliguri.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#0f172a',
                color: '#f8fafc',
                fontSize: '14px',
                borderRadius: '12px',
                padding: '12px 20px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              },
            }}
          />
          <Navbar categories={categories} />
          <Ticker products={products} />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
