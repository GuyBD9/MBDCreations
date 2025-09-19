// pages/gallery.js
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import GalleryGrid from '../components/GalleryGrid';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export default function Gallery() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then(r => r.json())
      .then(data => {
        const mapped = data.map(p => ({
          ...p,
          status: p.stock === 0 ? 'sold_out' : (p.stock <= 2 ? 'low_stock' : 'available')
        }));
        setItems(mapped);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="container py-12">
      <h2 className="text-2xl font-semibold text-[var(--brand)] mb-6">Gallery</h2>
      <GalleryGrid>
        {items.map(p => (
          <ProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            price={p.price}
            status={p.status}
          />
        ))}
      </GalleryGrid>
    </main>
  );
}