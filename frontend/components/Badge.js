const tones = {
  neutral: 'bg-black/70 text-white',
  warning: 'bg-amber-500 text-black',
  danger: 'bg-rose-600 text-white',
  success: 'bg-emerald-500 text-black',
};

export default function Badge({ children, tone = 'neutral' }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${tones[tone] || tones.neutral}`}>
      {children}
    </span>
  );
}
