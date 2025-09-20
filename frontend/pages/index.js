// pages/index.js
import Head from 'next/head';
import Hero from '../components/Hero';
import GalleryGrid from '../components/GalleryGrid';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const demo = [
    { id: 1, title: 'Sample Cup',   price: 12000, status: 'available', imageUrl: 'https://images.unsplash.com/photo-1520975682031-0f3c583eac91?q=80&w=1200&auto=format&fit=crop' },
    { id: null, title: 'Art Table',  price: 95000, status: 'drop_soon', imageUrl: 'https://images.unsplash.com/photo-1484318571209-661cf29a69c3?q=80&w=1200&auto=format&fit=crop' },
    { id: null, title: 'Sculpted Mug', price: 18000, status: 'sold_out', imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop' }
  ];

  return (
    <>
      <Head>
        <title>MBDCreations — Artistic Objects & Limited Drops</title>
        <meta name="description" content="MBDCreations showcases artistic furniture & objects with limited drops." />
      </Head>

      <Hero
        title="MBDCreations"
        subtitle="Limited Drops • Artistic Furniture & Objects"
        target={new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString()}
      />

      <section className="container py-12">
        <h2 className="text-2xl font-semibold text-[var(--brand)] mb-6">Featured Works</h2>
        <GalleryGrid>
          {demo.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </GalleryGrid>
      </section>
    </>
  );
}