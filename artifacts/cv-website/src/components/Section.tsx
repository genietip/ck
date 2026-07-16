import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, className = '', children }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`py-24 px-6 md:px-12 max-w-6xl mx-auto scroll-mt-20 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.section>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-16 flex items-center gap-6">
      <h2 className="text-3xl md:text-4xl font-serif text-foreground whitespace-nowrap">
        {children}
      </h2>
      <div className="h-[1px] w-full bg-border" />
    </div>
  );
}