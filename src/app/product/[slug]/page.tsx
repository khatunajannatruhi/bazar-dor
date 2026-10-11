import React from 'react';
import { getProduct, getProducts } from '@/lib/api';
import ProductDetailClient from './ProductDetailClient';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'পণ্য পাওয়া যায়নি — বাজার দর',
    };
  }

  return {
    title: `${product.nameBn} আজকের বাজারদর — বাজার দর`,
    description: `${product.nameBn} এর আজকের গড় মূল্য ${product.today} টাকা। দেশের প্রধান প্রধান বাজারের সর্বশেষ দরদাম।`,
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return <ProductDetailClient product={product} slug={slug} />;
}
