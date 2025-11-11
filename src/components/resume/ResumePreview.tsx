import { ModernTemplate } from './templates/ModernTemplate';
import type { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  return (
    <div
      id="resume-preview-container"
      className="w-full max-w-[800px] aspect-[1/1.414] bg-white rounded-lg shadow-2xl overflow-hidden transform scale-[0.8] origin-top"
    >
      <div className={cn("resume-template", "h-full w-full")}>
         <ModernTemplate data={data} />
      </div>
    </div>
  );
}
