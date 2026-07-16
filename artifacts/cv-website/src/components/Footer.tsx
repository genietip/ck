export function Footer() {
  const currentYear = new Date().getFullYear();
  // Using 2026 as requested in requirements or dynamic
  return (
    <footer className="border-t border-white/5 bg-background py-8">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2026 Chandrakanth Vallakati. All rights reserved.
        </p>
        <a href="#hero" className="text-primary font-serif font-bold text-xl hover:text-white transition-colors">
          CV.
        </a>
      </div>
    </footer>
  );
}