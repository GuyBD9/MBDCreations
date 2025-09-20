// components/ProductCard.js
import Link from 'next/link';
import Image from 'next/image';
import Badge from './Badge';

export default function ProductCard({
  id,
  title = "Untitled",
  price = null,
  status = "available",
  imageUrl
}) {
  const badge = {
    available: null,
    drop_soon: <Badge tone="warning">DROP SOON</Badge>,
    sold_out: <Badge tone="danger">SOLD OUT</Badge>,
    low_stock: <Badge tone="warning">LOW STOCK</Badge>
  }[status];

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-white hover:shadow-xl transition-shadow">
      {/* Frame with fixed aspect ratio (4:3) */}
      <div className="relative w-full" style={{ paddingTop: '75%' }}>
        {/* Fallback צבע אם אין תמונה */}
        {!imageUrl && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
        )}
        {/* Image cover */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        )}
        <div className="absolute top-3 left-3">{badge}</div>
      </div>

      <div className="p-4 flex items-center gap-3">
        <div className="font-medium text-[var(--brand)] truncate">{title}</div>
        {typeof price === 'number' && (
          <div className="ms-auto text-gray-700 whitespace-nowrap">
            ₪ {(price / 100).toFixed(2)}
          </div>
        )}
      </div>

      {id && (
        <Link href={`/product/${id}`} className="absolute inset-0" aria-label={`View ${title}`} />
      )}
    </div>
  );
}