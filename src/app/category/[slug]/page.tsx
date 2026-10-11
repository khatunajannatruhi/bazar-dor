import React from 'react';
import { getCategories, getProducts } from '@/lib/api';
import CategoryClient from './CategoryClient';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: 'ক্যাটাগরি পাওয়া যায়নি — বাজার দর',
    };
  }

  return {
    title: `${category.nameBn} বাজারদর — বাজার দর`,
    description: `${category.nameBn} ক্যাটাগরির সকল পণ্যের বর্তমান বাজারমূল্য ও বিস্তারিত বিশ্লেষণ।`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(slug),
  ]);

  const category = categories.find((c) => c.slug === slug) || null;

  return (
    <CategoryClient
      category={category}
      products={products}
      categorySlug={slug}
    />
  );
}
