import { Section } from './Section';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <Section id="contact" className="text-center pt-32 pb-24">
      <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-8">Let's Connect</h2>
      
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16 font-light">
        Open to discussing strategic partnerships, business transformation opportunities, and leadership roles in the communications industry.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        <a href="mailto:chandu4u@gmail.com" className="flex flex-col items-center gap-4 group">
          <div className="w-16 h-16 rounded-full bg-secondary border border-white/5 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
            <Mail className="text-primary group-hover:text-primary-foreground transition-colors" size={24} />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Email</p>
            <p className="text-foreground font-medium">chandu4u@gmail.com</p>
          </div>
        </a>

        <a href="tel:4692009654" className="flex flex-col items-center gap-4 group">
          <div className="w-16 h-16 rounded-full bg-secondary border border-white/5 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
            <Phone className="text-primary group-hover:text-primary-foreground transition-colors" size={24} />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Phone</p>
            <p className="text-foreground font-medium">(469) 200-9654</p>
          </div>
        </a>

        <div className="flex flex-col items-center gap-4 group cursor-default">
          <div className="w-16 h-16 rounded-full bg-secondary border border-white/5 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
            <MapPin className="text-primary group-hover:text-primary-foreground transition-colors" size={24} />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Location</p>
            <p className="text-foreground font-medium">Marlton, New Jersey</p>
          </div>
        </div>
      </div>
    </Section>
  );
}