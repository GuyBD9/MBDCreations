import Link from 'next/link';
import Image from 'next/image';
import Badge from './Badge';

const BADGES = {
  drop_soon: { tone: 'warning', label: 'DROP SOON' },
  sold_out: { tone: 'danger', label: 'SOLD OUT' },
  low_stock: { tone: 'warning', label: 'LOW STOCK' },
};

export default function ProductCard({
  id,
  title = 'Untitled Work',
  price,
  status = 'available',
  imageUrl,
}) {
  const badgeConfig = BADGES[status];
  const formattedPrice =
    typeof price === 'number'
      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price / 100)
      : null;

  return (
    <article className="group relative overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-white shadow-sm transition hover:shadow-lg">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        ) : null}
        {badgeConfig ? (
          <div className="absolute left-4 top-4">
            <Badge tone={badgeConfig.tone}>{badgeConfig.label}</Badge>
          </div>
        ) : null}
      </div>
      <div className="flex items-center gap-3 px-5 py-4">
        <h3 className="truncate text-base font-semibold text-[var(--brand)]">{title}</h3>
        {formattedPrice ? (
          <span className="ml-auto text-sm text-[var(--brand-2)]">{formattedPrice}</span>
        ) : null}
      </div>
      {id ? (
        <Link href={`/product/${id}`} className="absolute inset-0" aria-label={`View ${title}`}>
          <span className="sr-only">View {title}</span>
        </Link>
      ) : null}
    </article>
  );
}
