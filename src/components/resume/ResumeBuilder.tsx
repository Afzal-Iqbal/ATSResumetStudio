'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ResumeForm } from '@/components/resume/ResumeForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { ControlsPane } from '@/components/resume/ControlsPane';
import { initialResumeData } from '@/lib/initial-resume-data';
import type { ResumeData, ActiveSection } from '@/lib/types';

export function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(initialResumeData);
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] xl:grid-cols-[450px_1fr_400px] gap-4 p-4 min-h-[calc(100vh-4rem)]">
      <Card className="overflow-hidden">
        <CardContent className="p-0 h-full">
          <ResumeForm data={data} setData={setData} setActiveSection={setActiveSection} />
        </CardContent>
      </Card>

      <div className="flex items-start justify-center py-8">
        <ResumePreview data={data} template={selectedTemplate} />
      </div>

      <div className="hidden xl:block">
        <Card className="sticky top-20">
          <CardContent className="p-0">
            <ControlsPane
              activeSection={activeSection}
              jobDescription={data.jobDescription}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
