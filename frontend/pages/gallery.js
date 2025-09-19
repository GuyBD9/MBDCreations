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
      .then(setItems)
      .catch(console.error);
  }, []);

  return (
    <main style={{padding: '2rem'}}>
      <h2>Gallery</h2>
      <GalleryGrid>
        {items.map(p => (
          <ProductCard key={p.id} id={p.id} title={p.title} price={p.price} />
        ))}
      </GalleryGrid>
    </main>
  );
}