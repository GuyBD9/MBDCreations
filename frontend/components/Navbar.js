// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="container py-3 flex items-center gap-4">
        <Link href="/" className="text-xl font-semibold text-[var(--brand)]">MBDCreations</Link>
        <div className="ms-auto flex items-center gap-4">
          <Link href="/" className="text-gray-700 hover:text-black">Home</Link>
          <Link href="/gallery" className="text-gray-700 hover:text-black">Gallery</Link>
        </div>
      </div>
    </nav>
  );
}