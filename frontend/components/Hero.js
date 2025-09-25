import Countdown from './Countdown';
import Button from './Button';

export default function Hero({
  title = 'MBDCreations',
  subtitle = 'Minimal works, considered details, limited releases.',
  target,
  backgroundUrl = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=80&ixlib=rb-4.0.3',
}) {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 via-black/10 to-transparent" aria-hidden="true" />

      <div className="relative container flex min-h-[60vh] flex-col items-center justify-center gap-6 py-16 text-center">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/70">MBDCreations Studio</p>
          <h1 className="text-4xl font-semibold sm:text-6xl">{title}</h1>
          <p className="mx-auto max-w-2xl text-base text-white/80 sm:text-xl">{subtitle}</p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          {target ? (
            <div className="flex items-center gap-3 rounded-full bg-white/15 px-5 py-2 text-sm">
              <span className="uppercase tracking-[0.3em] text-white/70">Next Drop</span>
              <Countdown target={target} />
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button as="a" href="/gallery" className="px-6">
              View Works
            </Button>
            <Button as="a" href="/drops" variant="subtle" className="px-6">
              Next Drop
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
