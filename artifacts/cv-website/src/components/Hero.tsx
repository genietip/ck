import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, User } from 'lucide-react';

export function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 max-w-6xl mx-auto min-h-[90vh] flex flex-col justify-center">
      <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-12 md:gap-8">
        
        {/* Left Content */}
        <motion.div 
          className="flex-1 max-w-3xl"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-primary"></div>
            <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
              Business Leader · Customer Success · Innovation
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 font-serif">
            <span className="block text-foreground">Chandrakanth</span>
            <span className="block text-primary italic pr-4">Vallakati</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-12 font-light">
            21+ years transforming enterprises in Communications, Media & Entertainment through innovation, consultative selling, and delivery excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-6 text-sm text-muted-foreground font-medium">
            <a href="mailto:chandu4u@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors group">
              <span className="p-2 bg-white/5 rounded-full group-hover:bg-primary/20 transition-colors"><Mail size={16} className="text-primary" /></span>
              chandu4u@gmail.com
            </a>
            <a href="tel:4692009654" className="flex items-center gap-3 hover:text-primary transition-colors group">
              <span className="p-2 bg-white/5 rounded-full group-hover:bg-primary/20 transition-colors"><Phone size={16} className="text-primary" /></span>
              (469) 200-9654
            </a>
            <div className="flex items-center gap-3 group">
              <span className="p-2 bg-white/5 rounded-full"><MapPin size={16} className="text-primary" /></span>
              Marlton, New Jersey
            </div>
          </div>
        </motion.div>

        {/* Right Content - Photo Placeholder */}
        <motion.div 
          className="w-48 h-64 md:w-64 md:h-80 lg:w-72 lg:h-96 shrink-0 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <div className="absolute inset-0 border border-primary/40 rounded-2xl translate-x-4 translate-y-4"></div>
          <div className="absolute inset-0 bg-secondary rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
            <User size={64} className="text-white/10" strokeWidth={1} />
          </div>
        </motion.div>

      </div>

      {/* Stats Row */}
      <motion.div 
        className="mt-24 pt-12 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        {[
          { stat: "21+", label: "Years Experience" },
          { stat: "$210M+", label: "TCV Converted" },
          { stat: "Fortune 500", label: "Clients Served" },
          { stat: "35%", label: "CSAT Improvement" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-2">
            <span className="text-4xl md:text-5xl font-serif text-primary">{item.stat}</span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}