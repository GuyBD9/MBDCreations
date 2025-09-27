// frontend/components/WorkCard.js
import Image from 'next/image';
import Badge from './Badge';

export default function WorkCard({ work }) {
  if (!work) return null;

  const caption = `
    <div style="padding: 12px 20px;">
      <h4>${work.title}</h4>
      <p>${work.subtitle}</p>
      <a href="/work/${work.id}" style="color: #a7a7a7; margin-top: 8px; display: inline-block;">View Details &rarr;</a>
    </div>
  `;
  
  return (
    <a 
      href={work.imageUrl} 
      className="group block"
      data-sub-html={caption}
    >
      {/* This div now controls the aspect ratio and holds the image */}
      <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden bg-secondary">
        <Image
          src={work.imageUrl}
          alt={`Image of ${work.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-serif">{work.title}</h3>
        <p className="mt-1 text-sm text-foreground/70">{work.subtitle}</p>
      </div>
    </a>
  );
}