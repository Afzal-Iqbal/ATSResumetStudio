import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon, Briefcase, GraduationCap, Star } from 'lucide-react';

export function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalDetails, summary, experience, education, skills } = data;

  const Section = ({
    icon,
    title,
    children,
  }: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
  }) => (
    <section className="mb-6">
      <div className="flex items-center mb-2">
        {icon}
        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider ml-2">{title}</h2>
      </div>
      <div className="border-t-2 border-gray-300 pt-2">{children}</div>
    </section>
  );

  return (
    <div className="bg-white p-8 font-sans text-gray-800 text-[10pt] leading-normal" style={{ fontSize: 'calc(10pt * var(--text-scale, 1))' }}>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">{personalDetails.fullName}</h1>
        <p className="text-lg text-accent font-medium">{personalDetails.jobTitle}</p>
        <div className="flex justify-center items-center gap-x-4 gap-y-1 text-xs mt-3 flex-wrap">
          {personalDetails.email && <div className="flex items-center"><Mail className="w-3 h-3 mr-1.5 text-gray-600" />{personalDetails.email}</div>}
          {personalDetails.phoneNumber && <div className="flex items-center"><Phone className="w-3 h-3 mr-1.5 text-gray-600" />{personalDetails.phoneNumber}</div>}
          {personalDetails.location && <div className="flex items-center"><MapPin className="w-3 h-3 mr-1.5 text-gray-600" />{personalDetails.location}</div>}
          {personalDetails.linkedIn && <div className="flex items-center"><Linkedin className="w-3 h-3 mr-1.5 text-gray-600" />{personalDetails.linkedIn}</div>}
          {personalDetails.website && <div className="flex items-center"><LinkIcon className="w-3 h-3 mr-1.5 text-gray-600" />{personalDetails.website}</div>}
        </div>
      </header>

      <section className="mb-6">
        <p className="text-center text-sm">{summary}</p>
      </section>

      <Section icon={<Briefcase className="w-5 h-5 text-accent" />} title="Experience">
        {experience.map((exp) => (
          <div key={exp.id} className="mb-4 last:mb-0">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-base">{exp.jobTitle}</h3>
              <div className="text-sm font-medium text-gray-600">{exp.startDate} - {exp.endDate}</div>
            </div>
            <div className="flex justify-between items-baseline mb-1">
              <p className="font-semibold text-accent">{exp.company}</p>
              <p className="text-sm text-gray-600">{exp.location}</p>
            </div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      <Section icon={<GraduationCap className="w-5 h-5 text-accent" />} title="Education">
        {education.map((edu) => (
          <div key={edu.id} className="mb-4 last:mb-0">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-base">{edu.institution}</h3>
              <div className="text-sm font-medium text-gray-600">{edu.startDate} - {edu.endDate}</div>
            </div>
            <p className="font-semibold">{edu.degree} in {edu.fieldOfStudy}</p>
            {edu.description && <p className="text-sm italic text-gray-600 mt-1">{edu.description}</p>}
          </div>
        ))}
      </Section>

      <Section icon={<Star className="w-5 h-5 text-accent" />} title="Skills">
        <p className="text-sm">{skills}</p>
      </Section>
    </div>
  );
}
