// frontend/pages/work/[id].js
import Head from 'next/head';
import Image from 'next/image';
import { workApiService } from '../../services/api';

export default function WorkDetailPage({ work }) {
  if (!work) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        {/* Fixed: Added a fallback to prevent hydration errors */}
        <title>{work ? work.title : 'Loading Work...'} - MBDCreations</title>
        
        {/* Improved: Using the full description for better SEO, with a fallback */}
        <meta name="description" content={work ? work.description : 'A unique design object from MBDCreations.'} />
      </Head>

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="aspect-w-3 aspect-h-4 bg-secondary">
            <Image
              src={work.imageUrl}
              alt={`Image of ${work.title}`}
              width={1200}
              height={1600}
              className="object-cover w-full h-full"
            />
          </div>

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

// This function remains unchanged and is correct.
export async function getStaticPaths() {
  const works = await workApiService.getAllWorks();
  const paths = works ? works.map((work) => ({
    params: { id: work.id.toString() },
  })) : [];
  return { paths, fallback: 'blocking' };
}

// This function remains unchanged and is correct.
export async function getStaticProps({ params }) {
  const work = await workApiService.getWorkById(params.id);
  if (!work) {
    return { notFound: true };
  }
  return {
    props: { work },
    revalidate: 60,
  };
}