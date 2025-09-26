import Link from 'next/link';
import Image from 'next/image';

const links = [
  { href: '/', label: 'Home' },
  { href: '/works', label: 'Works' },
  { href: '/drops', label: 'Drops' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/80 backdrop-blur">
      <div className="container flex items-center gap-6 py-3">
        <Link href="/" className="flex items-center gap-3 text-[var(--brand)]">
          <Image src="/logo.png" alt="MBDCreations logo" width={32} height={32} priority />
          <span className="text-lg sm:text-xl font-semibold tracking-tight">MBDCreations</span>
        </Link>
        <div className="ml-auto flex items-center gap-2 sm:gap-4 text-sm">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1 text-[var(--brand-2)] transition hover:text-[var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
