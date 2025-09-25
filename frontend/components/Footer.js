export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <div className="container flex flex-col items-center gap-2 py-8 text-center text-sm text-[var(--brand-2)]">
        <span>© {new Date().getFullYear()} MBDCreations. All rights reserved.</span>
        <a
          href="mailto:studio@mbdcreations.com"
          className="text-[var(--brand)] transition hover:text-[var(--accent)]"
        >
          studio@mbdcreations.com
        </a>
      </div>
    </footer>
  );
}
