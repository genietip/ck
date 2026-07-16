import { Section, SectionTitle } from './Section';

export function Education() {
  return (
    <Section id="education">
      <SectionTitle>Education & Certifications</SectionTitle>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Formal */}
        <div className="md:col-span-4">
          <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-8">Formal Details</h3>
          <ul className="space-y-6">
            <li className="border-l-2 border-white/10 pl-4 py-1">
              <h4 className="text-lg font-serif text-foreground">B.Tech</h4>
              <p className="text-muted-foreground text-sm mt-1">Electronics & Communication Engineering</p>
            </li>
            <li className="border-l-2 border-primary/50 pl-4 py-1">
              <h4 className="text-lg font-serif text-foreground">PMP Certified</h4>
              <p className="text-muted-foreground text-sm mt-1">Project Management Professional</p>
            </li>
          </ul>
        </div>

        {/* Leadership Programs */}
        <div className="md:col-span-8">
          <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-8">Leadership Training Programs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "AI Applications for Growth",
                school: "Northwestern – Kellogg School of Management"
              },
              {
                title: "Elevate Wings 3 – Growth & Transformation",
                school: "INSEAD Business School"
              },
              {
                title: "Emerging Leadership Seminar",
                school: "Fisher School of Business, Ohio University"
              },
              {
                title: "Ambassador Corps",
                school: "Sales Leadership Program"
              },
              {
                title: "Pragati",
                school: "Large Program Management Leadership"
              }
            ].map((program, i) => (
              <div key={i} className="p-5 bg-card border border-white/5 rounded-xl hover:bg-secondary transition-colors">
                <h4 className="text-base text-foreground font-medium mb-2">{program.title}</h4>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{program.school}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}