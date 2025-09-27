// frontend/pages/works.js
import Head from 'next/head';
import WorkCard from '../components/WorkCard';
import dynamic from 'next/dynamic';
import { workApiService } from '../services/api';

// Dynamically import the GalleryWrapper to ensure it only runs on the client-side.
const GalleryWrapper = dynamic(() => import('../components/GalleryWrapper'), {
  ssr: false, 
});

export default function WorksPage({ works }) {
  return (
    <>
      <Head>
        <title>Works - MBDCreations</title>
        <meta name="description" content="Explore the full collection of contemporary design objects." />
      </Head>
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-serif tracking-tight">The Collection</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Beauty exists in everything – you just need to see it.
          </p>
        </header>

        <GalleryWrapper>
          {works && works.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {works.map(work => <WorkCard key={work.id} work={work} />)}
            </div>
          ) : (
            <p className="text-center py-20">The collection is currently being curated.</p>
          )}
        </GalleryWrapper>

      </div>
    </>
  );
}

// Data fetching is correct and remains the same.
export async function getStaticProps() {
  const works = await workApiService.getAllWorks();
  
  return {
    props: { 
      works: works || []
    },
    revalidate: 60,
  };
}