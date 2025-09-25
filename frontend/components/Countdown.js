import { useEffect, useMemo, useState } from 'react';

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export default function Countdown({ target }) {
  const targetTime = useMemo(() => new Date(target).getTime(), [target]);
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState('--:--:--');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || Number.isNaN(targetTime)) return;

    const update = () => {
      const remaining = targetTime - Date.now();
      setTimeLeft(formatDuration(remaining));
    };

    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [isMounted, targetTime]);

  return (
    <span className="font-mono text-lg sm:text-xl" suppressHydrationWarning>
      {isMounted ? timeLeft : '--:--:--'}
    </span>
  );
}
