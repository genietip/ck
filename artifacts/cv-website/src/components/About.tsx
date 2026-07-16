import { Section, SectionTitle } from './Section';

export function About() {
  return (
    <Section id="about">
      <SectionTitle>About</SectionTitle>
      <div className="max-w-4xl">
        <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground font-light italic border-l-2 border-primary pl-6 md:pl-10">
          "A passionate Business Leader with extensive experience in leading and transforming client organizations through innovation and creative IT solutions across the Communications, Media & Entertainment industry."
        </p>
      </div>
    </Section>
  );
}