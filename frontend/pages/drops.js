// frontend/pages/drops.js
import Head from 'next/head';
import Countdown from '../components/Countdown';
import { workApiService } from '../services/api';

// This is the component for the drops page.
export default function DropsPage({ nextDrop }) {
  const hasDrop = Boolean(nextDrop);

  return (
    <>
      <Head>
        <title>Drops - MBDCreations</title>
        <meta name="description" content="Upcoming limited edition releases from MBDCreations." />
      </Head>

      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-serif mb-4">Limited Drops</h1>
        <p className="text-lg max-w-2xl mx-auto text-foreground/70 mb-12">
          Exclusive releases of unique objects, available for a limited time.
        </p>

        {/* Conditionally render based on whether a drop was found */}
        {hasDrop ? (
          <div className="max-w-3xl mx-auto border border-secondary p-8 md:p-12">
            <h2 className="text-2xl font-serif mb-2">Next Release: {nextDrop.title}</h2>
            <p className="text-foreground/80 mb-6">{nextDrop.subtitle}</p>
            <Countdown targetDate={nextDrop.drop_start_at} />
            <p className="mt-8 text-sm text-foreground/60">
              Be ready. Once the countdown ends, this piece will be available for purchase.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto border border-secondary p-8 md:p-12">
            <h2 className="text-2xl font-serif mb-2">No Upcoming Drops</h2>
            <p className="text-foreground/80">
              Check back soon for future releases.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

// Fetch data on the server before rendering the page.
export async function getStaticProps() {
  const nextDrop = await workApiService.getNextDrop();

  return {
    props: { nextDrop },
    revalidate: 60, // Re-check for new drops every 60 seconds
  };
}