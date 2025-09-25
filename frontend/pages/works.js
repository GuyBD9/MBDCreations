// frontend/pages/works.js
import Head from 'next/head';
import WorkCard from '../components/WorkCard';
import { workApiService } from '../services/api';

// This is the React component that renders the page.
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
        
        {/* Check if the works array exists and has items */}
        {works && works.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map(work => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        ) : (
          // Fallback message if there are no works to display
          <p className="text-center py-20">The collection is currently being curated.</p>
        )}
      </div>
    </>
  );
}

// This function runs on the server-side to fetch data before the page is rendered.
export async function getStaticProps() {
  // Use the new API service we created.
  const works = await workApiService.getAllWorks();
  
  return {
    props: { 
      // Send an empty array in case of an error to prevent a crash.
      works: works || [] 
    },
    // Re-generate the page at most once every 60 seconds.
    revalidate: 60, 
  };
}