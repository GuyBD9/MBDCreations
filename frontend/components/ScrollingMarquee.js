// frontend/components/ScrollingMarquee.js
import Image from 'next/image';
import Link from 'next/link';

// This component creates an infinite horizontal scroll effect.
export default function ScrollingMarquee({ works }) {
  if (!works || works.length === 0) {
    return null;
  }

  // To create a seamless loop, we duplicate the works array.
  const duplicatedWorks = [...works, ...works];

  return (
    <section className="py-16 sm:py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif tracking-tight">From The Collection</h2>
      </div>
      
      {/* The outer div hides the overflow and has a gradient mask on the edges 
        to make the items fade in and out smoothly.
      */}
      <div className="relative w-full overflow-hidden 
        [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        
        {/* The inner div contains the duplicated items and is animated. */}
        <div className="flex min-w-max animate-scroll group">
          {duplicatedWorks.map((work, index) => (
            <Link 
              key={`${work.id}-${index}`} 
              href={`/work/${work.id}`} 
              className="group/item w-[400px] h-[500px] mx-4 relative overflow-hidden shrink-0 
                         transition-transform duration-300 hover:!scale-[0.98] hover:z-10"
            >
              <Image
                src={work.imageUrl}
                alt={`Image of ${work.title}`}
                fill
                className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover/item:scale-105"
              />
              {/* Optional: Add a title overlay on hover */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center 
                             opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-2xl font-serif">{work.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}