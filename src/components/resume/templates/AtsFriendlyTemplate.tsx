import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon } from 'lucide-react';

export function AtsFriendlyTemplate({ data }: { data: ResumeData }) {
  const { personalDetails, summary, experience, education, skills } = data;

  const Section = ({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) => (
    <section className={`mb-3 ${className}`}>
      <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-1 mb-1.5">{title}</h2>
      <div className="text-[9pt]">
        {children}
      </div>
    </section>
  );

  return (
    <div className="bg-white p-6 font-sans text-black" style={{ fontSize: 'calc(10pt * var(--text-scale, 1))' }}>
      <header className="text-center mb-3">
        <h1 className="text-2xl font-bold uppercase tracking-tight">{personalDetails.fullName}</h1>
        {personalDetails.jobTitle && <p className="text-base font-semibold mt-0.5">{personalDetails.jobTitle}</p>}
        <div className="flex justify-center items-center gap-x-3 gap-y-1 text-[9pt] mt-1.5 flex-wrap">
          {personalDetails.location && <span>{personalDetails.location}</span>}
          {personalDetails.phoneNumber && <span>&bull; {personalDetails.phoneNumber}</span>}
          {personalDetails.email && <span>&bull; {personalDetails.email}</span>}
        </div>
         <div className="flex justify-center items-center gap-x-3 gap-y-1 text-[9pt] mt-1 flex-wrap">
          {personalDetails.linkedIn && <span>{personalDetails.linkedIn}</span>}
          {personalDetails.website && <span>&bull; {personalDetails.website}</span>}
          {personalDetails.customLink && <span>&bull; {personalDetails.customLink}</span>}
        </div>
      </header>
      
      {summary && (
        <Section title="Summary">
          <p className="text-[9pt]">{summary}</p>
        </Section>
      )}

      {experience?.length > 0 && (
        <Section title="Experience">
          {experience.map((exp) => (
            <div key={exp.id} className="mb-2.5 last:mb-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-[10pt]">{exp.jobTitle}</h3>
                <p className="font-normal text-[9pt]">{exp.startDate} &ndash; {exp.endDate}</p>
              </div>
              <div className="flex justify-between items-baseline -mt-0.5">
                <p className="italic text-[9.5pt]">{exp.company}, {exp.location}</p>
              </div>
              <ul className="list-disc pl-4 space-y-0.5 mt-1 text-[9pt]">
                {exp.description.split('\n').filter(line => line.trim() !== '').map((line, i) => <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      )}
      
      {education?.length > 0 && (
        <Section title="Education">
          {education.map((edu) => (
            <div key={edu.id} className="mb-1.5 last:mb-0">
              <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[10pt]">{edu.degree}, {edu.fieldOfStudy}</h3>
                  <p className="font-normal text-[9pt]">{edu.startDate} &ndash; {edu.endDate}</p>
              </div>
              <p className="italic text-[9.5pt]">{edu.institution}</p>
              {edu.description && <p className="mt-0.5 text-[9pt]">{edu.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {skills && (
        <Section title="Skills" className="mb-0">
          <p className="text-[9pt]">{skills}</p>
        </Section>
      )}
    </div>
  );
}
