import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import profilePhoto from '@assets/Photoroom_20260414_001256_1784162174403.jpg';

export function Hero() {
  return (
    <section className="relative px-6 md:px-12 max-w-6xl mx-auto h-[calc(100vh-53px)] flex flex-col justify-center">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">

        {/* Left */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-10 bg-primary" />
            <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
              Business Leader · Customer Success · Innovation
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl leading-[1.05] mb-5 font-serif">
            <span className="block text-foreground">Chandrakanth</span>
            <span className="block text-primary italic">Vallakati</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-7 font-light">
            A passionate Business Leader with 21+ years transforming enterprises in Communications, Media &amp; Entertainment through innovation, consultative selling, and delivery excellence — leading and transforming client organizations through creative IT solutions.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 text-sm text-muted-foreground font-medium mb-8">
            <a href="mailto:chandu4u@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors group">
              <span className="p-1.5 bg-white/5 rounded-full group-hover:bg-primary/20 transition-colors"><Mail size={14} className="text-primary" /></span>
              chandu4u@gmail.com
            </a>
            <a href="tel:4692009654" className="flex items-center gap-2 hover:text-primary transition-colors group">
              <span className="p-1.5 bg-white/5 rounded-full group-hover:bg-primary/20 transition-colors"><Phone size={14} className="text-primary" /></span>
              (469) 200-9654
            </a>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-white/5 rounded-full"><MapPin size={14} className="text-primary" /></span>
              Marlton, New Jersey
            </div>
          </div>

          {/* Stats inline */}
          <div className="grid grid-cols-4 gap-4 pt-6 border-t border-border">
            {[
              { stat: '21+', label: 'Years Exp.' },
              { stat: '$210M+', label: 'TCV' },
              { stat: 'F500', label: 'Clients' },
              { stat: '35%', label: 'CSAT ↑' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-2xl md:text-3xl font-serif text-primary">{item.stat}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right – photo */}
        <motion.div
          className="w-44 h-56 md:w-56 md:h-72 lg:w-64 lg:h-80 shrink-0 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 border border-primary/40 rounded-2xl translate-x-3 translate-y-3" />
          <div className="absolute inset-0 bg-secondary rounded-2xl overflow-hidden border border-primary/30">
            <img
              src={profilePhoto}
              alt="Chandrakanth Vallakati"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
