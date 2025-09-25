import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About — MBDCreations</title>
        <meta
          name="description"
          content="MBDCreations curates minimalist furniture and objects released in limited drops."
        />
      </Head>
      <main className="container py-16">
        <div className="mx-auto max-w-2xl space-y-6 text-[var(--brand-2)]">
          <h1 className="text-3xl font-semibold text-[var(--brand)]">About the Studio</h1>
          <p>
            MBDCreations is a studio dedicated to mindful, minimalist objects. Each release explores
            materiality, proportion, and the tension between precision and the hand-made.
          </p>
          <p>
            Every drop is produced in limited quantities so we can keep a close dialogue with our
            collectors. Pieces are designed, prototyped, and finished in our Tel Aviv workshop.
          </p>
          <p>
            For press or collaboration inquiries reach out at
            {' '}
            <a className="text-[var(--accent)] hover:text-[var(--brand)]" href="mailto:studio@mbdcreations.com">
              studio@mbdcreations.com
            </a>
            .
          </p>
        </div>
      </main>
    </>
  );
}
