// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      padding:'1rem',
      borderBottom:'1px solid #eee',
      display:'flex',
      gap:'1rem'
    }}>
      <Link href="/">Home</Link>
      <Link href="/gallery">Gallery</Link>
    </nav>
  );
}