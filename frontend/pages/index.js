// frontend/pages/index.js
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Countdown from '../components/Countdown';
import FeaturedWorksGrid from '../components/FeaturedWorksGrid'; // Step 1: Import the new component
import { workApiService } from '../services/api';

// Step 2: The component now receives `allWorks` as a prop
export default function Home({ featuredWork, allWorks }) {

  // Fallback data for the hero section
  const work = featuredWork || {
    title: 'Vessel of Light',
    subtitle: 'Sculptural Table Lamp',
    imageUrl: 'https://images.unsplash.com/photo-1543198113-f7c21087d2da?q=80&w=2187&auto=format&fit=crop',
    drop_start_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
  };

  return (
    <>
      <Head>
        <title>MBDCreations - Contemporary Design Objects</title>
        <meta name="description" content="Israeli contemporary design brand combining local materials into unique, functional art objects." />
      </Head>

      {/* Hero Section */}
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
          {work.is_drop && work.drop_start_at && <Countdown targetDate={work.drop_start_at} />}
          <h1 className="text-4xl md:text-6xl font-serif mb-4 mt-2">{work.title}</h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto mb-8">{work.subtitle}</p>
          <div className="flex justify-center gap-4">
            <Link href="/works" className="inline-block bg-white text-black px-8 py-3 font-medium hover:bg-secondary transition-colors duration-300">
              Explore The Collection
            </Link>
            <Link href="/about" className="inline-block bg-transparent border border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-black transition-colors duration-300">
              About The Studio
            </Link>
          </div>
        </div>
      </section>

      {/* Step 3: Add the new component right after the hero section */}
      <FeaturedWorksGrid works={allWorks} />
    </>
  );
}

// This function is already correct and fetches all the necessary data.
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