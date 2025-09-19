// components/Countdown.js
import { useEffect, useState } from 'react';

function format(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const hrs = String(Math.floor(s / 3600)).padStart(2, '0');
  const mins = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const secs = String(s % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

export default function Countdown({ target }) {
  // Render a stable placeholder during SSR to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const update = () => setLeft(Math.max(0, new Date(target) - Date.now()));
    update(); // compute immediately after mount
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target, mounted]);

  const display = mounted ? format(left) : '--:--:--';

  return (
    <div className="font-mono text-2xl sm:text-3xl" suppressHydrationWarning>
      {display}
    </div>
  );
}