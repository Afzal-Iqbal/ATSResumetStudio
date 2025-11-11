import { ModernTemplate } from './templates/ModernTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { AtsFriendlyTemplate } from './templates/AtsFriendlyTemplate';
import type { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
}

const templates: { [key: string]: React.FC<{ data: ResumeData }> } = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  'ats-friendly': AtsFriendlyTemplate,
};

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const TemplateComponent = templates[template] || ModernTemplate;

  return (
    <div
      id="resume-preview-container"
      className="w-full max-w-[800px] aspect-[1/1.414] bg-white rounded-lg shadow-2xl overflow-hidden transform scale-[0.4] sm:scale-[0.6] md:scale-[0.8] lg:scale-[0.6] xl:scale-75 origin-top"
    >
      <div className={cn("resume-template", "h-full w-full")}>
         <TemplateComponent data={data} />
      </div>
    </div>
  );
}
