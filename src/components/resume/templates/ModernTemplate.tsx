import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon } from 'lucide-react';

export function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalDetails, summary, experience, education, skills } = data;

  const Section = ({ title, children }: { title: string; children: React.ReactNode; }) => (
    <section className="mb-5">
      <h2 className="text-sm font-bold uppercase tracking-widest text-accent border-b-2 border-gray-200 pb-1 mb-3">{title}</h2>
      <div className="text-sm">
        {children}
      </div>
    </section>
  );

  return (
    <div className="bg-white p-8 font-sans text-gray-800 text-[10pt] leading-relaxed" style={{ fontSize: 'calc(10pt * var(--text-scale, 1))' }}>
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{personalDetails.fullName}</h1>
        <p className="text-lg text-accent font-medium mt-1">{personalDetails.jobTitle}</p>
        <div className="flex justify-center items-center gap-x-4 gap-y-1 text-xs mt-3 flex-wrap text-gray-600">
          {personalDetails.email && <div className="flex items-center"><Mail className="w-3 h-3 mr-1.5" />{personalDetails.email}</div>}
          {personalDetails.phoneNumber && <div className="flex items-center"><Phone className="w-3 h-3 mr-1.5" />{personalDetails.phoneNumber}</div>}
          {personalDetails.location && <div className="flex items-center"><MapPin className="w-3 h-3 mr-1.5" />{personalDetails.location}</div>}
        </div>
        <div className="flex justify-center items-center gap-x-4 gap-y-1 text-xs mt-1.5 flex-wrap text-gray-600">
          {personalDetails.linkedIn && <div className="flex items-center"><Linkedin className="w-3 h-3 mr-1.5" />{personalDetails.linkedIn}</div>}
          {personalDetails.website && <div className="flex items-center"><LinkIcon className="w-3 h-3 mr-1.5" />{personalDetails.website}</div>}
        </div>
      </header>

      <section className="text-center text-sm mb-6">
        <p>{summary}</p>
      </section>

      <Section title="Experience">
        {experience.map((exp) => (
          <div key={exp.id} className="mb-4 last:mb-0">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-base">{exp.jobTitle}</h3>
              <div className="text-sm font-medium text-gray-600">{exp.startDate} - {exp.endDate}</div>
            </div>
            <div className="flex justify-between items-baseline mb-1">
              <p className="font-semibold text-gray-700">{exp.company}</p>
              <p className="text-sm text-gray-600">{exp.location}</p>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {exp.description.split('\n').filter(line => line.trim() !== '').map((line, i) => <li key={i}>{line.replace(/^- /, '')}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      <div className="grid grid-cols-2 gap-x-8">
        <Section title="Education">
          {education.map((edu) => (
            <div key={edu.id} className="mb-3 last:mb-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-base">{edu.degree}</h3>
                <div className="text-xs font-medium text-gray-600">{edu.startDate} - {edu.endDate}</div>
              </div>
              <p className="font-semibold">{edu.institution}</p>
              <p className="italic text-sm">{edu.fieldOfStudy}</p>
              {edu.description && <p className="text-xs text-gray-600 mt-1">{edu.description}</p>}
            </div>
          ))}
        </Section>

        <Section title="Skills">
          <p>{skills}</p>
        </Section>
      </div>
    </div>
  );
}
