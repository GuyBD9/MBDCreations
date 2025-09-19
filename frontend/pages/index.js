// pages/index.js
import Head from 'next/head';
import Hero from '../components/Hero';
import GalleryGrid from '../components/GalleryGrid';
import ProductCard from '../components/ProductCard';

export default function Home() {
  // Demo items with placeholder images so the grid looks designed even before real content
  const demo = [
    { id: 1, title: 'Sample Cup', price: 12000, status: 'available', imageUrl: 'https://picsum.photos/seed/cup/800/600' },
    { id: null, title: 'Art Table', price: 95000, status: 'drop_soon', imageUrl: 'https://picsum.photos/seed/table/800/600' },
    { id: null, title: 'Sculpted Mug', price: 18000, status: 'sold_out', imageUrl: 'https://picsum.photos/seed/mug/800/600' }
  ];

  return (
    <>
      <Head>
        <title>MBDCreations — Artistic Objects & Limited Drops</title>
        <meta name="description" content="MBDCreations showcases artistic furniture & objects with limited drops. Explore the gallery and join the next release." />
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
            <ProductCard
              key={i}
              id={p.id}
              title={p.title}
              price={p.price}
              status={p.status}
              imageUrl={p.imageUrl}
            />
          ))}
        </GalleryGrid>
      </section>
    </>
  );
}