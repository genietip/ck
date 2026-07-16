import { Section, SectionTitle } from './Section';

const skills = [
  "Leadership",
  "Client Relationship Mgmt",
  "P&L Management",
  "Strategic Business Planning",
  "Business Development",
  "Enterprise Sales & Consultative Selling",
  "Revenue Growth & Deal Closure",
  "Communications & Media Domain",
  "5G / Edge Computing / Conversational AI",
  "Gen AI / Digital Transformation",
  "Agile / DevOps",
  "PMP Certified"
];

export function Skills() {
  return (
    <Section id="skills">
      <SectionTitle>Core Competencies</SectionTitle>
      <div className="flex flex-wrap gap-3 md:gap-4">
        {skills.map((skill, index) => (
          <div 
            key={index}
            className="px-5 py-3 rounded-full bg-secondary/50 border border-white/5 text-sm md:text-base font-medium text-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300"
          >
            {skill}
          </div>
        ))}
      </div>
    </Section>
  );
}