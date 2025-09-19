// components/Hero.js
import Countdown from './Countdown';
import Button from './Button';

export default function Hero({
  title = "MBDCreations",
  subtitle = "Limited Drops • Artistic Furniture & Objects",
  target,
  backgroundUrl = "https://picsum.photos/seed/hero/1600/600"
}) {
  return (
    <section
      className="relative bg-gray-900 text-white"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative container py-20 sm:py-32 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto drop-shadow">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {target && (
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <span className="text-sm">Next drop in</span>
              <Countdown target={target} />
            </div>
          )}
          <Button as="a" href="/gallery" className="px-6 h-12 text-base font-semibold">
            Explore Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}