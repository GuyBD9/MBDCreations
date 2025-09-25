// frontend/components/FeaturedWorksGrid.js
import Image from 'next/image';
import Link from 'next/link';

// This component receives the list of works and displays them in a grid.
export default function FeaturedWorksGrid({ works }) {
  // If there are no works, don't render anything.
  if (!works || works.length === 0) {
    return null;
  }

  return (
    <section className="bg-secondary py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif tracking-tight">From The Collection</h2>
          <p className="mt-2 text-lg text-foreground/70">A glimpse into our world of functional art.</p>
        </div>

        {/* This is the responsive grid.
          - On small screens, it has 2 columns.
          - On large screens (lg), it has 4 columns.
          - 'gap-4' adds space between the grid items.
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {works.slice(0, 4).map((work) => ( // We'll show the first 4 works as a teaser
            <Link key={work.id} href={`/work/${work.id}`} className="group block aspect-w-3 aspect-h-4 overflow-hidden">
              <Image
                src={work.imageUrl}
                alt={`Image of ${work.title}`}
                fill
                className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}