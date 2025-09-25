import Head from 'next/head';
import Countdown from '../components/Countdown';

const releaseNotes = [
  {
    title: 'Aureate Vessel',
    detail: 'Hand-lathed brass vessel with matte lacquer interior. Limited to 40 units.',
  },
  {
    title: 'Lines Study Bench',
    detail: 'Ash bench finished in natural oil with dovetail joinery. Edition of 25.',
  },
  {
    title: 'Stoneware Triptych',
    detail: 'Three-piece ceramic set exploring texture contrast. Edition of 15.',
  },
];

export default function Drops() {
  const dropOpensAt = new Date(Date.now() + 1000 * 60 * 60 * 36).toISOString();

  return (
    <>
      <Head>
        <title>Upcoming Drops — MBDCreations</title>
        <meta name="description" content="Countdown and release notes for the upcoming MBDCreations drop." />
      </Head>

      <section className="relative overflow-hidden bg-[var(--brand)] text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1600&q=80&ixlib=rb-4.0.3')] bg-cover bg-center opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70" aria-hidden="true" />

        <div className="relative container py-24 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Next Limited Release</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-6xl">Drop opens soon</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
            The next batch goes live once the countdown ends. Quantities are intentionally limited to keep every piece special.
          </p>
          <div className="mt-8 inline-flex items-center gap-4 rounded-full bg-white/10 px-6 py-3 text-sm backdrop-blur">
            <span className="uppercase tracking-[0.3em] text-white/70">Opens in</span>
            <Countdown target={dropOpensAt} />
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="mb-8 space-y-2">
          <h2 className="text-2xl font-semibold text-[var(--brand)]">Release Notes</h2>
          <p className="text-sm text-[var(--brand-2)]">Get familiar with the works arriving in the next window.</p>
        </div>
        <div className="space-y-6">
          {releaseNotes.map((item) => (
            <article key={item.title} className="rounded-[var(--radius)] border border-[var(--border)] bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[var(--brand)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--brand-2)]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
