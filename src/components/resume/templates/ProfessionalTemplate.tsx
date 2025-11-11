import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon } from 'lucide-react';

export function ProfessionalTemplate({ data }: { data: ResumeData }) {
  const { personalDetails, summary, experience, education, skills } = data;

  const Section = ({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) => (
    <div className={`mb-5 ${className}`}>
      <h2 className="text-sm font-bold uppercase tracking-widest text-gray-600 border-b-2 border-gray-300 pb-1 mb-3">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="bg-white p-8 font-serif text-gray-800 text-[10pt] leading-relaxed" style={{ fontSize: 'calc(10pt * var(--text-scale, 1))' }}>
      <header className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">{personalDetails.fullName}</h1>
            <p className="text-md text-gray-600 font-medium">{personalDetails.jobTitle}</p>
        </div>
        <div className="text-right text-xs space-y-1">
            {personalDetails.email && <div className="flex items-center justify-end"><span className="truncate max-w-[150px]">{personalDetails.email}</span><Mail className="w-3 h-3 ml-2 text-gray-600" /></div>}
            {personalDetails.phoneNumber && <div className="flex items-center justify-end">{personalDetails.phoneNumber}<Phone className="w-3 h-3 ml-2 text-gray-600" /></div>}
            {personalDetails.location && <div className="flex items-center justify-end">{personalDetails.location}<MapPin className="w-3 h-3 ml-2 text-gray-600" /></div>}
            {personalDetails.linkedIn && <div className="flex items-center justify-end">{personalDetails.linkedIn}<Linkedin className="w-3 h-3 ml-2 text-gray-600" /></div>}
            {personalDetails.website && <div className="flex items-center justify-end">{personalDetails.website}<LinkIcon className="w-3 h-3 ml-2 text-gray-600" /></div>}
        </div>
      </header>

      <Section title="Summary">
        <p className="text-sm">{summary}</p>
      </Section>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
            <Section title="Experience">
                {experience.map((exp) => (
                <div key={exp.id} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-base">{exp.jobTitle}</h3>
                    <div className="text-xs font-medium text-gray-500">{exp.startDate} - {exp.endDate}</div>
                    </div>
                    <div className="flex justify-between items-baseline mb-1">
                    <p className="font-semibold text-sm">{exp.company} | {exp.location}</p>
                    </div>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                    {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                    </ul>
                </div>
                ))}
            </Section>
        </div>
        <div className="col-span-1">
            <Section title="Skills">
                <div className="flex flex-wrap gap-2">
                {skills.split(',').map((skill, i) => (
                    skill.trim() && <span key={i} className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-md">{skill.trim()}</span>
                ))}
                </div>
            </Section>
            <Section title="Education">
                {education.map((edu) => (
                <div key={edu.id} className="mb-4 last:mb-0">
                    <h3 className="font-bold text-base">{edu.degree}</h3>
                    <p className="font-semibold text-sm">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                    {edu.description && <p className="text-xs italic text-gray-600 mt-1">{edu.description}</p>}
                </div>
                ))}
            </Section>
        </div>
      </div>
    </div>
  );
}
