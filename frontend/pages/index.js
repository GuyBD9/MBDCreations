// frontend/pages/index.js
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Countdown from '../components/Countdown';
import ScrollingMarquee from '../components/ScrollingMarquee'; // Import the new component
import { workApiService } from '../services/api';

export default function Home({ featuredWork, allWorks }) {
  const work = featuredWork || { /* ... your fallback data ... */ };

  return (
    <>
      <Head>
        <title>MBDCreations - Contemporary Design Objects</title>
        <meta name="description" content="Israeli contemporary design brand." />
      </Head>

      {/* Hero Section (remains the same) */}
      <section className="relative h-[90vh] min-h-[600px] w-full flex items-center justify-center text-white">
        <Image
          src={work.imageUrl}
          alt={`Hero image featuring ${work.title}`}
          fill
          className="object-cover z-0"
          quality={85}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
        <div className="relative z-20 text-center p-8">
            <h1 className="text-4xl md:text-6xl font-serif mb-4 mt-2">{work.title}</h1>
            <p className="text-lg md:text-xl max-w-xl mx-auto mb-8">{work.subtitle}</p>
            <div className="flex justify-center gap-4">
                <Link href="/works" className="inline-block bg-white text-black px-8 py-3 font-medium hover:bg-secondary transition-colors duration-300">Explore The Collection</Link>
                <Link href="/about" className="inline-block bg-transparent border border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-black transition-colors duration-300">About The Studio</Link>
            </div>
        </div>
      </section>

      {/* Replace the old static grid with the new scrolling marquee */}
      <ScrollingMarquee works={allWorks} />
    </>
  );
}

// Data fetching remains the same
export async function getStaticProps() {
  const [featuredWork, allWorks] = await Promise.all([
    workApiService.getFeaturedWork(),
    workApiService.getAllWorks()
  ]);
  
  return {
    props: { 
      featuredWork,
      allWorks: allWorks || [],
    },
    revalidate: 60,
  };
}