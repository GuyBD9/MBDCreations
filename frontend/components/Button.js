export default function Button({
  as: Component = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center rounded-full px-4 h-11 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2';
  const variants = {
    primary: 'bg-[var(--accent)] text-[var(--accent-contrast)] hover:opacity-90',
    subtle: 'border border-white/30 bg-white/20 text-white hover:bg-white/30',
  };
  const styles = [baseClasses, variants[variant] || variants.primary, className].filter(Boolean).join(' ');

  return (
    <Component className={styles} {...props}>
      {children}
    </Component>
  );
}
