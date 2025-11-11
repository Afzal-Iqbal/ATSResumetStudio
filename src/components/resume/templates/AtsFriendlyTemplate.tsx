import type { ResumeData } from '@/lib/types';

export function AtsFriendlyTemplate({ data }: { data: ResumeData }) {
  const { personalDetails, summary, experience, education, skills } = data;

  const Section = ({ title, children }: { title: string; children: React.ReactNode; }) => (
    <section className="mb-4">
      <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1 mb-2">{title}</h2>
      {children}
    </section>
  );

  return (
    <div className="bg-white p-6 font-sans text-black text-[10pt] leading-normal" style={{ fontSize: 'calc(10pt * var(--text-scale, 1))' }}>
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wider">{personalDetails.fullName}</h1>
        <div className="flex justify-center items-center gap-x-3 gap-y-1 text-xs mt-1 flex-wrap">
          {personalDetails.location && <span>{personalDetails.location}</span>}
          {personalDetails.phoneNumber && <span>&bull; {personalDetails.phoneNumber}</span>}
          {personalDetails.email && <span>&bull; {personalDetails.email}</span>}
          {personalDetails.linkedIn && <span>&bull; {personalDetails.linkedIn}</span>}
          {personalDetails.website && <span>&bull; {personalDetails.website}</span>}
        </div>
      </header>
      
      <Section title="Summary">
        <p className="text-sm">{summary}</p>
      </Section>

      <Section title="Skills">
        <p className="text-sm">
          <span className="font-bold">Technical Skills:</span> {skills}
        </p>
      </Section>
      
      <Section title="Experience">
        {experience.map((exp) => (
          <div key={exp.id} className="mb-3 last:mb-0">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-sm uppercase">{exp.company}</h3>
              <p className="text-sm font-normal">{exp.location}</p>
            </div>
            <div className="flex justify-between items-baseline">
              <p className="font-bold text-sm italic">{exp.jobTitle}</p>
              <p className="text-sm font-normal">{exp.startDate} &ndash; {exp.endDate}</p>
            </div>
            <ul className="list-disc pl-5 text-sm space-y-0.5 mt-1">
              {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
            </ul>
          </div>
        ))}
      </Section>
      
      <Section title="Education">
        {education.map((edu) => (
          <div key={edu.id} className="mb-2 last:mb-0">
             <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sm">{edu.degree}, {edu.fieldOfStudy}</h3>
                <p className="text-sm font-normal">{edu.startDate} &ndash; {edu.endDate}</p>
            </div>
            <p className="text-sm">{edu.institution}</p>
          </div>
        ))}
      </Section>

    </div>
  );
}
