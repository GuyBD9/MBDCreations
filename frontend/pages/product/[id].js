import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

function normalizeImages(images, id) {
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
      // ignore parsing errors, fall back below
    }
  }
  return [`https://picsum.photos/seed/mbd-${id}/1200/900`];
}

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    fetch(`${API_BASE}/api/products/${id}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Product not found');
        }
        return response.json();
      })
      .then((data) => {
        setProduct({
          ...data,
          images: normalizeImages(data.images, data.id ?? id),
        });
        setError(null);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      });

    return () => controller.abort();
  }, [id]);

  if (error) {
    return (
      <main className="container py-16">
        <p className="text-rose-600">{error}</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="container py-16">
        <p>Loading…</p>
      </main>
    );
  }

  const formattedPrice =
    typeof product.price === 'number'
      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price / 100)
      : null;

  return (
    <>
      <Head>
        <title>{product.title} — MBDCreations</title>
      </Head>
      <main className="container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] bg-gradient-to-br from-slate-200 to-slate-300">
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : null}
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-[var(--brand)]">{product.title}</h1>
              {formattedPrice ? (
                <p className="mt-2 text-lg text-[var(--brand-2)]">{formattedPrice}</p>
              ) : null}
            </div>
            <p className="text-sm text-[var(--brand-2)]">{product.description}</p>
            <dl className="grid gap-2 text-sm text-[var(--brand-2)]">
              <div className="flex gap-2">
                <dt className="font-semibold text-[var(--brand)]">Stock</dt>
                <dd>{product.stock}</dd>
              </div>
              {product.dropStartAt ? (
                <div className="flex gap-2">
                  <dt className="font-semibold text-[var(--brand)]">Drop opens</dt>
                  <dd>{new Date(product.dropStartAt).toLocaleString()}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </main>
    </>
  );
}
