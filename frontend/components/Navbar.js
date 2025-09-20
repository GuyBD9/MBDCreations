// components/Navbar.js
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="container py-3 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"   // ודא שהלוגו נמצא תחת frontend/public/logo.png
            alt="MBD Creations logo"
            width={28}
            height={28}
            priority
          />
          <span className="text-lg sm:text-xl font-semibold text-[var(--brand)]">
            MBDCreations
          </span>
        </Link>

        <div className="ms-auto flex items-center gap-3 text-gray-700">
          <Link href="/" className="hover:text-black">Home</Link>
          <span aria-hidden="true" className="text-gray-300">|</span>
          <Link href="/gallery" className="hover:text-black">Gallery</Link>
        </div>
      </div>
    </nav>
  );
}