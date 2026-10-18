export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const BASE = 'https://dummyjson.com/products';

async function get(url: string): Promise<ProductsResponse> {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export const searchProducts = (q: string) => get(`${BASE}/search?q=${encodeURIComponent(q)}`);
export const fetchProductsPage = (limit: number, skip: number) => get(`${BASE}?limit=${limit}&skip=${skip}`);
