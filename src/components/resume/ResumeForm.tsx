import type { Dispatch, SetStateAction } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PersonalDetailsForm } from './forms/PersonalDetailsForm';
import { SummaryForm } from './forms/SummaryForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { JobDescriptionForm } from './forms/JobDescriptionForm';

import type { ResumeData, ActiveSection } from '@/lib/types';
import { User, NotepadText, Briefcase, GraduationCap, Star, FileText } from 'lucide-react';

interface ResumeFormProps {
  data: ResumeData;
  setData: Dispatch<SetStateAction<ResumeData>>;
  setActiveSection: Dispatch<SetStateAction<ActiveSection>>;
}

export function ResumeForm({ data, setData, setActiveSection }: ResumeFormProps) {
  return (
    <ScrollArea className="h-[calc(100vh-5rem)]">
      <Accordion type="multiple" defaultValue={['item-1', 'item-7']} className="w-full">
        <AccordionItem value="item-7">
          <AccordionTrigger className="px-6 text-base font-semibold">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-accent" />
              Job Description
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <JobDescriptionForm data={data} setData={setData} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1">
          <AccordionTrigger className="px-6 text-base font-semibold">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-accent" />
              Personal Details
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <PersonalDetailsForm data={data} setData={setData} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="px-6 text-base font-semibold">
            <div className="flex items-center gap-3">
              <NotepadText className="h-5 w-5 text-accent" />
              Summary
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <SummaryForm data={data} setData={setData} setActiveSection={setActiveSection} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="px-6 text-base font-semibold">
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-accent" />
              Work Experience
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <ExperienceForm data={data} setData={setData} setActiveSection={setActiveSection} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="px-6 text-base font-semibold">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-accent" />
              Education
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <EducationForm data={data} setData={setData} setActiveSection={setActiveSection} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="px-6 text-base font-semibold">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-accent" />
              Skills
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <SkillsForm data={data} setData={setData} setActiveSection={setActiveSection} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ScrollArea>
  );
}
