export function Nav() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5 py-4">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <span className="font-serif text-2xl tracking-wider text-primary font-bold">
          CV<span className="text-foreground">.</span>
        </span>
        <p className="text-sm text-muted-foreground font-medium tracking-wide hidden md:block">
          Chandrakanth Vallakati &mdash; Executive Profile
        </p>
      </div>
    </header>
  );
}
