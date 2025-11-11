import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon } from 'lucide-react';

export function ProfessionalTemplate({ data }: { data: ResumeData }) {
  const { personalDetails, summary, experience, education, skills } = data;

  const Section = ({ title, children, className }: { title: string; children: React.ReactNode, className?: string }) => (
    <section className={`mb-4 ${className}`}>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-700 border-b-2 border-gray-300 pb-1 mb-2.5">{title}</h2>
      <div className="text-[9.5pt]">
          {children}
      </div>
    </section>
  );

  return (
    <div className="bg-white p-8 font-serif text-gray-800" style={{ fontSize: 'calc(10pt * var(--text-scale, 1))' }}>
      <header className="mb-4 text-center">
          <h1 className="text-3xl font-bold tracking-normal text-gray-800">{personalDetails.fullName}</h1>
          {personalDetails.jobTitle && <p className="text-lg text-gray-600 font-medium mt-1">{personalDetails.jobTitle}</p>}
        <div className="text-center text-xs space-x-3 mt-2 text-gray-500">
            {personalDetails.email && <span>{personalDetails.email}</span>}
            {personalDetails.phoneNumber && <span>&bull; {personalDetails.phoneNumber}</span>}
            {personalDetails.location && <span>&bull; {personalDetails.location}</span>}
        </div>
         <div className="text-center text-xs space-x-3 mt-1 text-gray-500">
            {personalDetails.linkedIn && <span>{personalDetails.linkedIn}</span>}
            {personalDetails.website && <span>&bull; {personalDetails.website}</span>}
            {personalDetails.customLink && <span>&bull; {personalDetails.customLink}</span>}
        </div>
      </header>
       <Separator />

      {summary && (
        <section className="mt-4 mb-4">
          <p className="text-center text-[9.5pt] italic">{summary}</p>
        </section>
      )}

      <div className="grid grid-cols-12 gap-x-8">
        <div className={skills || education?.length > 0 ? "col-span-8" : "col-span-12"}>
          {experience?.length > 0 && (
            <Section title="Experience">
                {experience.map((exp) => (
                <div key={exp.id} className="mb-3.5 last:mb-0">
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-[11pt]">{exp.jobTitle}</h3>
                        <div className="text-[9pt] font-light text-gray-500">{exp.startDate} - {exp.endDate}</div>
                    </div>
                    <div className="flex justify-between items-baseline mb-1">
                        <p className="font-semibold text-gray-600">{exp.company} | {exp.location}</p>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-[9.5pt]">
                        {exp.description.split('\n').filter(line => line.trim() !== '').map((line, i) => <li key={i}>{line.replace(/^- /, '')}</li>)}
                    </ul>
                </div>
                ))}
            </Section>
          )}
        </div>
        {(skills || education?.length > 0) && (
            <div className="col-span-4 border-l-2 border-gray-100 pl-6">
                {skills && (
                <Section title="Skills">
                    <p>{skills.split(',').map(s => s.trim()).join(' &bull; ')}</p>
                </Section>
                )}
                {education?.length > 0 && (
                <Section title="Education">
                    {education.map((edu) => (
                    <div key={edu.id} className="mb-3 last:mb-0">
                        <h3 className="font-bold text-[11pt]">{edu.degree}</h3>
                        <p className="font-semibold text-gray-600">{edu.institution}</p>
                        <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                        <p className="italic text-sm">{edu.fieldOfStudy}</p>
                        {edu.description && <p className="text-xs text-gray-600 mt-1">{edu.description}</p>}
                    </div>
                    ))}
                </Section>
                )}
            </div>
        )}
      </div>
    </div>
  );
}

function Separator() {
    return <div className="w-full h-px bg-gray-200 my-3" />;
}
