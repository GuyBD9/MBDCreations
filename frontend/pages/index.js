import Head from 'next/head';
import Hero from '../components/Hero';
import GalleryGrid from '../components/GalleryGrid';
import ProductCard from '../components/ProductCard';

const HIGHLIGHTED_WORKS = [
  {
    id: null,
    title: 'Aureate Vessel',
    price: 32000,
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1520975682031-0f3c583eac91?auto=format&fit=crop&w=1600&q=80&ixlib=rb-4.0.3',
  },
  {
    id: null,
    title: 'Silence Table',
    price: 125000,
    status: 'drop_soon',
    imageUrl: 'https://images.unsplash.com/photo-1484318571209-661cf29a69c3?auto=format&fit=crop&w=1600&q=80&ixlib=rb-4.0.3',
  },
  {
    id: null,
    title: 'Stoneware Study',
    price: 58000,
    status: 'sold_out',
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80&ixlib=rb-4.0.3',
  },
];

export default function Home() {
  const nextDropTarget = new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString();

  return (
    <>
      <Head>
        <title>MBDCreations — Minimal works & limited drops</title>
        <meta
          name="description"
          content="MBDCreations showcases minimalist works, limited drops, and considered objects."
        />
      </Head>

      <Hero
        title="Considered works for contemporary spaces"
        subtitle="Furniture and objects arriving in limited, time-boxed drops."
        target={nextDropTarget}
      />

      <section className="container py-16">
        <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--brand)]">Highlighted Works</h2>
            <p className="text-sm text-[var(--brand-2)]">A glimpse into the next release.</p>
          </div>
        </header>
        <GalleryGrid>
          {HIGHLIGHTED_WORKS.map((work) => (
            <ProductCard key={work.title} {...work} />
          ))}
        </GalleryGrid>
      </section>
    </>
  );
}
