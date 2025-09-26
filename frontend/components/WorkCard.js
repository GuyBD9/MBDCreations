// frontend/components/WorkCard.js
import Image from 'next/image';
import Badge from './Badge';

// The card is now an 'a' tag that lightGallery uses to open the image.
export default function WorkCard({ work }) {
  if (!work) return null;

  // We create a caption for the gallery with a link to the detail page.
  const caption = `
    <div style="padding: 12px 20px;">
      <h4>${work.title}</h4>
      <p>${work.subtitle}</p>
      <a href="/work/${work.id}" style="color: #a7a7a7; margin-top: 8px; display: inline-block;">View Details &rarr;</a>
    </div>
  `;
  
  return (
    // This 'a' tag points directly to the image file for lightGallery to use.
    <a 
      href={work.imageUrl} 
      className="group block"
      data-sub-html={caption} // This adds our custom caption with the link
    >
      <div className="overflow-hidden bg-secondary">
        <div className="aspect-w-4 aspect-h-3">
          <Image
            src={work.imageUrl}
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
    </a>
  );
}