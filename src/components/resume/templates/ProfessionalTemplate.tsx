import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon } from 'lucide-react';

export function ProfessionalTemplate({ data }: { data: ResumeData }) {
  const { personalDetails, summary, experience, education, skills } = data;

  const Section = ({ title, children }: { title: string; children: React.ReactNode; }) => (
    <section className="mb-5">
      <h2 className="text-sm font-bold uppercase tracking-widest text-gray-600 border-b-2 border-gray-200 pb-1 mb-3">{title}</h2>
      <div className="text-sm">
          {children}
      </div>
    </section>
  );

  return (
    <div className="bg-white p-8 font-serif text-gray-800 text-[10pt] leading-relaxed" style={{ fontSize: 'calc(10pt * var(--text-scale, 1))' }}>
      <header className="mb-6 border-b-2 border-black pb-3">
          <h1 className="text-3xl font-bold text-gray-800 text-center">{personalDetails.fullName}</h1>
          {personalDetails.jobTitle && <p className="text-md text-gray-600 font-medium text-center mt-1">{personalDetails.jobTitle}</p>}
        <div className="text-center text-xs space-x-4 mt-2">
            {personalDetails.email && <span>{personalDetails.email}</span>}
            {personalDetails.phoneNumber && <span>{personalDetails.phoneNumber}</span>}
            {personalDetails.location && <span>{personalDetails.location}</span>}
            {personalDetails.linkedIn && <span>{personalDetails.linkedIn}</span>}
            {personalDetails.website && <span>{personalDetails.website}</span>}
        </div>
      </header>

      <Section title="Summary">
        <p>{summary}</p>
      </Section>

      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-8">
            <Section title="Experience">
                {experience.map((exp) => (
                <div key={exp.id} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-base">{exp.jobTitle}</h3>
                        <div className="text-xs font-medium text-gray-500">{exp.startDate} - {exp.endDate}</div>
                    </div>
                    <div className="flex justify-between items-baseline mb-1">
                        <p className="font-semibold">{exp.company} | {exp.location}</p>
                    </div>
                    <ul className="list-disc pl-5 space-y-1">
                        {exp.description.split('\n').filter(line => line.trim() !== '').map((line, i) => <li key={i}>{line.replace(/^- /, '')}</li>)}
                    </ul>
                </div>
                ))}
            </Section>
        </div>
        <div className="col-span-4">
            <Section title="Skills">
                <p>{skills}</p>
            </Section>
            <Section title="Education">
                {education.map((edu) => (
                <div key={edu.id} className="mb-4 last:mb-0">
                    <h3 className="font-bold text-base">{edu.degree}</h3>
                    <p className="font-semibold">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                    <p className="italic text-sm">{edu.fieldOfStudy}</p>
                    {edu.description && <p className="text-xs text-gray-600 mt-1">{edu.description}</p>}
                </div>
                ))}
            </Section>
        </div>
      </div>
    </div>
  );
}
