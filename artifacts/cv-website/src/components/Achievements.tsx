import { Section, SectionTitle } from './Section';
import { TrendingUp, Lightbulb, Handshake, Award } from 'lucide-react';

const achievements = [
  {
    title: "P&L & Market Expansion",
    icon: TrendingUp,
    description: "P&L Owner of large accounts for Fortune 500 clients. Converted over $210M in Total Contract Value across 3 financial years with large multiyear deal closures."
  },
  {
    title: "Innovation & Thought Leadership",
    icon: Lightbulb,
    description: "Drove CxO discussions for customer success with ~$100M+ savings through business transformation. Led digital imperatives including 5G Monetization, Edge Computing, and Conversational AI."
  },
  {
    title: "Strategic Relationships",
    icon: Handshake,
    description: "Built and nurtured CxO-level relationships to understand critical success factors. 35% improvement in Customer Satisfaction Index through collaborative, customer-centric leadership."
  },
  {
    title: "Delivery Excellence",
    icon: Award,
    description: "Reduced release cycles by 35% with hyper-automation. Surpassed sales targets by 25% within a year through strategic talent recruitment and high-performing team development."
  }
];

export function Achievements() {
  return (
    <Section id="achievements" className="bg-secondary/30 rounded-3xl mt-12 mb-12">
      <SectionTitle>Key Achievements</SectionTitle>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {achievements.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="bg-card border border-white/5 p-8 rounded-2xl hover:border-primary/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-serif text-foreground mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}