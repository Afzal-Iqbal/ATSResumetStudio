import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon, Star } from 'lucide-react';

export function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalDetails, summary, experience, education, skills } = data;

  const Section = ({ title, children, icon, className }: { title: string; children: React.ReactNode; icon: React.ReactNode, className?: string }) => (
    <section className={`mb-4 ${className}`}>
      <div className="flex items-center mb-2">
        {icon}
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary ml-2">{title}</h2>
      </div>
      <div className="text-[9pt] pl-7">
        {children}
      </div>
    </section>
  );

  return (
    <div className="bg-white p-6 font-sans text-gray-800" style={{ fontSize: 'calc(10pt * var(--text-scale, 1))' }}>
      <header className="text-center mb-4 border-b pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{personalDetails.fullName}</h1>
        <p className="text-lg text-primary font-medium">{personalDetails.jobTitle}</p>
        <div className="flex justify-center items-center gap-x-3 gap-y-1 text-xs mt-2 flex-wrap text-gray-600">
          {personalDetails.email && <div className="flex items-center"><Mail className="w-3 h-3 mr-1.5" />{personalDetails.email}</div>}
          {personalDetails.phoneNumber && <div className="flex items-center"><Phone className="w-3 h-3 mr-1.5" />{personalDetails.phoneNumber}</div>}
          {personalDetails.location && <div className="flex items-center"><MapPin className="w-3 h-3 mr-1.5" />{personalDetails.location}</div>}
        </div>
        <div className="flex justify-center items-center gap-x-3 gap-y-1 text-xs mt-1.5 flex-wrap text-gray-600">
          {personalDetails.linkedIn && <div className="flex items-center"><Linkedin className="w-3 h-3 mr-1.5" />{personalDetails.linkedIn}</div>}
          {personalDetails.website && <div className="flex items-center"><LinkIcon className="w-3 h-3 mr-1.5" />{personalDetails.website}</div>}
          {personalDetails.customLink && <div className="flex items-center"><LinkIcon className="w-3 h-3 mr-1.5" />{personalDetails.customLink}</div>}
        </div>
      </header>

      {summary && (
        <section className="text-center text-[9pt] mb-4">
          <p>{summary}</p>
        </section>
      )}

      {experience?.length > 0 && (
        <Section title="Experience" icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>}>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3 last:mb-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-[10.5pt]">{exp.jobTitle}</h3>
                <div className="text-[9pt] font-medium text-gray-600">{exp.startDate} - {exp.endDate}</div>
              </div>
              <div className="flex justify-between items-baseline mb-0.5">
                <p className="font-semibold text-gray-700 text-[9.5pt]">{exp.company}</p>
                <p className="text-[9pt] text-gray-600">{exp.location}</p>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[9pt]">
                {exp.description.split('\n').filter(line => line.trim() !== '').map((line, i) => <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      )}

      <div className="grid grid-cols-2 gap-x-6">
        {education?.length > 0 && (
           <Section title="Education" icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>}>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[10.5pt]">{edu.degree}</h3>
                  <div className="text-[8.5pt] font-medium text-gray-600">{edu.startDate} - {edu.endDate}</div>
                </div>
                <p className="font-semibold text-[9.5pt]">{edu.institution}</p>
                <p className="italic text-[9pt]">{edu.fieldOfStudy}</p>
                {edu.description && <p className="text-[8.5pt] text-gray-600 mt-1">{edu.description}</p>}
              </div>
            ))}
          </Section>
        )}

        {skills && (
          <Section title="Skills" icon={<Star size={16} className="text-primary"/>} className={education?.length > 0 ? '' : 'col-span-2'}>
            <p className="text-[9pt]">{skills}</p>
          </Section>
        )}
      </div>
    </div>
  );
}
