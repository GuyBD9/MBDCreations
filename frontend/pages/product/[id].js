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
      .then(data => setProduct(data))
      .catch(console.error);
  }, [query.id]);

  if (!product) {
    return <main style={{padding:'2rem'}}><p>Loading…</p></main>;
  }

  return (
    <main style={{padding:'2rem'}}>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      {typeof product.price === 'number' && (
        <p><strong>₪ {(product.price / 100).toFixed(2)}</strong></p>
      )}
      <p>Stock: {product.stock}</p>
    </main>
  );
}