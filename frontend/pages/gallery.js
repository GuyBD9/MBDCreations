import { useEffect, useState } from 'react';
import GalleryGrid from '../components/GalleryGrid';
import ProductCard from '../components/ProductCard';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

function normalizeImages(images, fallbackSeed) {
  if (Array.isArray(images) && images.length > 0) {
    return images;
  }
  if (typeof images === 'string') {
    try {
      const parsed = JSON.parse(images);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (_) {
      // noop: fall back to placeholder below
    }
  }
  return [`https://picsum.photos/seed/mbd-${fallbackSeed}/1200/900`];
}

function computeStatus(product) {
  const now = Date.now();
  const dropStart = product.dropStartAt ? new Date(product.dropStartAt).getTime() : null;
  if (typeof dropStart === 'number' && dropStart > now) {
    return 'drop_soon';
  }
  if (product.stock === 0) {
    return 'sold_out';
  }
  if (typeof product.stock === 'number' && product.stock <= 2) {
    return 'low_stock';
  }
  return 'available';
}

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_BASE}/api/products`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Failed to load works');
        }
        return response.json();
      })
      .then((data) => {
        const mapped = data.map((product, index) => {
          const images = normalizeImages(product.images, product.id ?? index);
          return {
            id: product.id,
            title: product.title,
            price: product.price,
            status: computeStatus(product),
            imageUrl: images[0],
          };
        });
        setItems(mapped);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <main className="container py-16">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold text-[var(--brand)]">Works</h1>
        <p className="max-w-2xl text-sm text-[var(--brand-2)]">
          Contemporary objects crafted in small batches. Availability updates in real time as the
          drop opens.
        </p>
      </header>

      {isLoading ? <p>Loading works…</p> : null}
      {error ? <p className="text-rose-600">{error}</p> : null}

      {!isLoading && !error ? (
        <GalleryGrid>
          {items.map((item) => (
            <ProductCard key={item.id ?? item.title} {...item} />
          ))}
        </GalleryGrid>
      ) : null}
    </main>
  );
}
