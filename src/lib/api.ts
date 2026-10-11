import { Category, Product } from '@/types';

const API_ENDPOINTS = [
  'https://openapi.programming-hero.com/api/bazardor',
  'https://api.api-store.workers.dev/api/bazardor',
  'https://api.abcz.workers.dev/api/bazardor',
];

async function fetchFromApi<T>(path: string): Promise<T> {
  let lastError: unknown = null;

  for (const base of API_ENDPOINTS) {
    try {
      const res = await fetch(`${base}${path}`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        return (await res.json()) as T;
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(`Failed to fetch ${path} from all available API sources: ${lastError}`);
}

export async function getProducts(category?: string): Promise<Product[]> {
  const path = category ? `/products?category=${encodeURIComponent(category)}` : '/products';
  try {
    return await fetchFromApi<Product[]>(path);
  } catch {
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    return await fetchFromApi<Category[]>('/categories');
  } catch {
    return [
      { id: 'chal', slug: 'chal', nameBn: 'চাল', icon: '🍚' },
      { id: 'dal', slug: 'dal', nameBn: 'ডাল', icon: '🫘' },
      { id: 'tel', slug: 'tel', nameBn: 'তেল', icon: '🛢️' },
      { id: 'sobji', slug: 'sobji', nameBn: 'সবজি', icon: '🥬' },
      { id: 'mach', slug: 'mach', nameBn: 'মাছ', icon: '🐟' },
      { id: 'mangsho', slug: 'mangsho', nameBn: 'মাংস', icon: '🍗' },
      { id: 'dim-dui', slug: 'dim-dui', nameBn: 'ডিম-দুধ', icon: '🥛' },
      { id: 'mosla', slug: 'mosla', nameBn: 'মসলা', icon: '🌶️' },
    ];
  }
}

export async function getProduct(idOrSlug: string | number): Promise<Product | null> {
  // If it's a numeric ID, try fetching single product directly
  const numericId = Number(idOrSlug);
  if (!isNaN(numericId) && numericId > 0) {
    try {
      const product = await fetchFromApi<Product>(`/products/${numericId}`);
      if (product && product.id) return product;
    } catch {
      // Fallback to searching all products
    }
  }

  // Fetch all products and find matching slug or id
  try {
    const all = await getProducts();
    const strParam = String(idOrSlug);
    const found = all.find(
      (p) => String(p.slug) === strParam || String(p.id) === strParam
    );
    return found || null;
  } catch {
    return null;
  }
}
