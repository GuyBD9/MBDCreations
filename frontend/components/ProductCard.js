// components/ProductCard.js
import Link from 'next/link';
import Badge from './Badge';

export default function ProductCard({ id, title = "Untitled", price = null, status = "available", imageUrl }) {
  const badge = {
    available: null,
    drop_soon: <Badge tone="warning">DROP SOON</Badge>,
    sold_out: <Badge tone="danger">SOLD OUT</Badge>,
    low_stock: <Badge tone="warning">LOW STOCK</Badge>
  }[status];

  return (
    <div className="relative overflow-hidden rounded-2xl border hover:shadow-xl transition-shadow bg-white">
      <div className="relative aspect-[4/3] bg-gray-200">
        {/* If you later use next/image, replace with <Image ... fill /> */}
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        ) : null}
        <div className="absolute top-3 left-3">{badge}</div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>

      <div className="p-4 flex items-center gap-3">
        <div className="font-medium text-[var(--brand)]">{title}</div>
        {price !== null && (
          <div className="ms-auto text-gray-700">₪ {(price / 100).toFixed(2)}</div>
        )}
      </div>

      {id && (
        <Link href={`/product/${id}`} className="absolute inset-0" aria-label={`View ${title}`} />
      )}
    </div>
  );
}