// frontend/pages/about.js
import Head from 'next/head';
import Image from 'next/image';

// This is a static page component for the 'About' section.
export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About - MBDCreations</title>
        <meta name="description" content="The philosophy and story behind MBDCreations." />
      </Head>

      <div className="container mx-auto px-4 py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto">
          
          {/* Page Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-serif tracking-tight">About the Studio</h1>
            <p className="mt-4 text-xl lg:text-2xl font-serif text-foreground/60">
              “Beauty exists in everything – you just need to see it.”
            </p>
          </header>

          {/* Two-column layout: Text on the left, Image on the right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="prose prose-lg text-foreground/90 max-w-none">
              <p>
                MBDCreations is a contemporary design studio based in Israel, founded on the principle that everyday objects can be imbued with emotion and artistry. We explore the intersection of form, function, and material, with a deep respect for our local landscape.
              </p>
              <p>
                Our work is a dialogue between raw, natural materials—like the sun-drenched marble of Hebron or the ancient olive wood of the Galilee—and minimalist, contemporary forms. Each piece is meticulously crafted, not just as a product, but as a unique object of desire that brings a quiet, powerful presence into a space.
              </p>
              <p>
                We believe in uniqueness, luxury, and the quiet power of beautiful things. Our goal is to create functional art that transcends trends and resonates on a deeper level.
              </p>
            </div>
            
            {/* Image */}
            <div className="aspect-w-3 aspect-h-4">
              <Image
                src="https://picsum.photos/seed/studio/900/1200"
                alt="A quiet, artistic studio space with natural light."
                width={900}
                height={1200}
                className="object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}