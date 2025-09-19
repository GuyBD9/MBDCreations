// components/Button.js
export default function Button({ as: As = 'button', children, className = '', ...props }) {
    return (
      <As
        className={
          `inline-flex items-center justify-center rounded-lg px-4 h-10 text-sm font-medium ` +
          `bg-[var(--accent)] text-[var(--accent-contrast)] hover:opacity-90 ` +
          `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ` +
          className
        }
        {...props}
      >
        {children}
      </As>
    );
  }