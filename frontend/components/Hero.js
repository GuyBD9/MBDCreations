// components/Hero.js
import Countdown from './Countdown';
import Button from './Button';

export default function Hero({
  title = "MBDCreations",
  subtitle = "Limited Drops • Artistic Furniture & Objects",
  target,
  backgroundUrl = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop"
}) {
  return (
    <section
      className="relative text-white"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* overlay עדין + גרדיאנט תחתון לטקסט */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />

      <div className="relative container min-h-[45vh] sm:min-h-[56vh] flex flex-col items-center justify-center text-center py-12">
        <h1 className="text-4xl sm:text-6xl font-bold mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          {title}
        </h1>
        <p className="text-base sm:text-xl mb-7 max-w-2xl mx-auto drop-shadow">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          {target && (
            <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-lg">
              <span className="text-sm">Next drop in</span>
              <Countdown target={target} />
            </div>
          )}
          <Button as="a" href="/gallery" className="px-6 h-11 text-base font-semibold">
            Explore Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}