// frontend/pages/work/[id].js
import Head from 'next/head';
import Image from 'next/image';
import { workApiService } from '../../services/api';

// This is the component that displays the single work details.
export default function WorkDetailPage({ work }) {
  
  // A fallback for when the page is being generated on-demand.
  if (!work) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{work.title} - MBDCreations</title>
        <meta name="description" content={work.subtitle} />
      </Head>

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Image Column */}
          <div className="aspect-w-3 aspect-h-4 bg-secondary">
            <Image
              src={work.imageUrl}
              alt={`Image of ${work.title}`}
              width={1200}
              height={1600}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Details Column */}
          <div>
            <h1 className="text-4xl font-serif mb-2">{work.title}</h1>
            <p className="text-xl text-foreground/70 mb-6">{work.subtitle}</p>
            <div className="prose prose-lg max-w-none">
              <p>{work.description}</p>
              
              <div className="mt-8 pt-8 border-t border-secondary">
                <h3 className="font-sans text-sm uppercase tracking-widest text-foreground/60 mb-2">Materials</h3>
                <p>{work.materials}</p>
                <h3 className="font-sans text-sm uppercase tracking-widest text-foreground/60 mt-4 mb-2">Dimensions</h3>
                <p>{work.dimensions}</p>
              </div>
            </div>
            
            <div className="mt-8">
               <button className="bg-primary text-white px-10 py-3 font-medium hover:opacity-90 transition-opacity">
                 Enquire
               </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// This function tells Next.js which paths (which IDs) to pre-render at build time.
export async function getStaticPaths() {
  const works = await workApiService.getAllWorks();
  
  // Create an array of paths from the work IDs.
  const paths = works ? works.map((work) => ({
    params: { id: work.id.toString() },
  })) : [];

  // fallback: 'blocking' means if a page doesn't exist, Next.js will generate it on the first request.
  return { paths, fallback: 'blocking' };
}

// This function fetches the specific data for a single work page.
export async function getStaticProps({ params }) {
  const work = await workApiService.getWorkById(params.id);

  // If no work is found, return a 404 page.
  if (!work) {
    return { notFound: true };
  }
  
  return {
    props: { work },
    revalidate: 60, // Revalidate the data every 60 seconds
  };
}