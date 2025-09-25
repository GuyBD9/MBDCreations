// frontend/components/WorkCard.js
import Image from 'next/image';
import Link from 'next/link';
import Badge from './Badge';

// Card component to display a single 'work' in a grid.
export default function WorkCard({ work }) {
  if (!work) return null;
  
  // The Link component now points to the dynamic route /work/[id]
  return (
    <Link href={`/work/${work.id}`} className="group block">
      <div className="overflow-hidden bg-secondary">
        <div className="aspect-w-4 aspect-h-3">
          <Image
            src={work.imageUrl || 'https://picsum.photos/800/600'}
            alt={`Image of ${work.title}`}
            width={800}
            height={600}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <h3 className="text-lg font-serif">{work.title}</h3>
          {work.is_drop && <Badge text="Limited Drop" />}
        </div>
        <p className="mt-1 text-sm text-foreground/70">{work.subtitle}</p>
      </div>
    </Link>
  );
}