import React from 'react';
import Hero from '@/components/Hero';
import HomePageClient from '@/components/HomePageClient';
import { getProducts } from '@/lib/api';

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="flex-1 pb-16">
      <Hero />
      <HomePageClient products={products} />
    </div>
  );
}
