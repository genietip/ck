import { Section, SectionTitle } from './Section';

const experiences = [
  {
    period: "Dec 2024 – Present",
    company: "HCLTech",
    role: "Senior Sales Director (Head of Cable)",
    scope: "NA Telco – MSO & Wireless",
    highlights: [
      "Drove new logo acquisition across MSOs, regional cable operators, and broadband providers",
      "Enabled 2 Fortune 500 new logos to portfolio negotiating MSAs",
      "Developed strategic frameworks with data-driven decisions for emerging market trends",
      "Introduced innovative business concepts enhancing strategic roadmap and diversifying revenue streams"
    ]
  },
  {
    period: "Nov 2022 – Nov 2024",
    company: "Virtusa Corp.",
    role: "Client Partner",
    scope: "Charter Communications & CSG International | NA Telco – MSO & Platforms",
    highlights: [
      "P&L Owner for cluster of Telco accounts with global teams across USA, South Africa, India & Sri Lanka",
      "Consistent revenue growth of 15% QoQ through business development and customer diversification",
      "Contact Center Transformation: Built Conversational AI portfolio achieving 50% cost reduction",
      "Led Gen AI engagements for SDLC acceleration and dynamic Conversational AI flows"
    ]
  },
  {
    period: "Aug 2015 – Nov 2022",
    company: "Tata Consultancy Services",
    role: "Client Partner",
    scope: "Comcast Corporation | NA Communications – MSO Products & Enterprise Portfolio",
    highlights: [
      "P&L Owner for Key Products & Enterprise Portfolios – $50M portfolio with strong operating margin",
      "Consistent revenue growth of 40% YoY through expanding relationships and new business development",
      "Partnered with customer on building MVNO Wireless Ordering & Billing systems serving 500K+ subscribers",
      "Built NextGen Biller portfolio from scratch – $8M/annum, 99.9% accuracy on key migration"
    ]
  },
  {
    period: "Sep 2014 – Jul 2015",
    company: "TCS (at CISCO)",
    role: "Business Relationship Manager",
    scope: "Service Supply Chain | Customer Care",
    highlights: [
      "Spearheaded P&L functions – Revenue, Pipeline, Gross Margin",
      "Bid Management – proposals, case studies, and client presentations"
    ]
  },
  {
    period: "Apr 2011 – Aug 2014",
    company: "TCS (at Ericsson)",
    role: "Account Manager",
    scope: "NA Telco Equipment Vendor – R&D and Services",
    highlights: [
      "Led R&D project for Sprint's Network Vision Program driving network modernization",
      "Managed global R&D teams across US, Canada, and China"
    ]
  },
  {
    period: "Jun 2004 – Mar 2011",
    company: "TCS (at Nortel Networks)",
    role: "Project Manager / Functional Consultant",
    scope: "NA Telco Equipment Vendor – Wireless R&D",
    highlights: [
      "Introduced Gateway Controllers on new aTCA platform increasing capacity and reducing footprint",
      "Led technical reviews and process improvements across release cycles"
    ]
  }
];

export function Experience() {
  return (
    <Section id="experience">
      <SectionTitle>Experience</SectionTitle>
      
      <div className="relative border-l border-white/10 ml-3 md:ml-0">
        {experiences.map((exp, i) => (
          <div key={i} className="mb-16 last:mb-0 relative pl-8 md:pl-12">
            {/* Timeline dot */}
            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background"></div>
            
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
              <h3 className="text-xl md:text-2xl font-serif text-foreground font-semibold">
                {exp.role} <span className="text-muted-foreground font-normal mx-2">at</span> <span className="text-primary italic">{exp.company}</span>
              </h3>
              <span className="text-sm font-mono text-muted-foreground shrink-0 uppercase tracking-wider">{exp.period}</span>
            </div>
            
            <p className="text-sm text-muted-foreground/80 font-medium uppercase tracking-wider mb-5">
              {exp.scope}
            </p>
            
            <ul className="space-y-3">
              {exp.highlights.map((item, j) => (
                <li key={j} className="text-muted-foreground flex items-start">
                  <span className="text-primary mr-3 mt-1.5 text-xs opacity-60">◆</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}