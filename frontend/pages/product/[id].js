// pages/product/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export default function ProductPage() {
  const { query } = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!query.id) return;
    fetch(`${API_BASE}/api/products/${query.id}`)
      .then(r => r.json())
      .then(setProduct)
      .catch(console.error);
  }, [query.id]);

  if (!product) {
    return <main className="container py-12"><p>Loading…</p></main>;
  }

  return (
    <main className="container py-12">
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2">
        <div className="aspect-[4/3] bg-gray-200 rounded-2xl" />
        <div>
          <h2 className="text-3xl font-semibold text-[var(--brand)] mb-4">{product.title}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          {typeof product.price === 'number' && (
            <p className="text-xl font-medium mb-6">₪ {(product.price / 100).toFixed(2)}</p>
          )}
          <div className="text-sm text-gray-600">Stock: {product.stock}</div>
        </div>
      </div>
    </main>
  );
}