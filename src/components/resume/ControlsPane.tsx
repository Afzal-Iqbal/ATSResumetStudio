'use client';
import type { Dispatch, SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, LayoutTemplate, Lightbulb } from 'lucide-react';
import { TemplateSelector } from './TemplateSelector';
import type { ActiveSection } from '@/lib/types';
import { optimizeResumeSection, OptimizeResumeSectionOutput } from '@/ai/flows/real-time-resume-optimization';

interface ControlsPaneProps {
  activeSection: ActiveSection;
  jobDescription: string;
  selectedTemplate: string;
  setSelectedTemplate: Dispatch<SetStateAction<string>>;
}

function OptimizationPane({ activeSection, jobDescription }: { activeSection: ActiveSection; jobDescription: string }) {
  const [result, setResult] = useState<OptimizeResumeSectionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedContent, setDebouncedContent] = useState(activeSection?.content ?? '');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedContent(activeSection?.content ?? '');
    }, 1000); // 1-second debounce

    return () => {
      clearTimeout(handler);
    };
  }, [activeSection?.content]);
  
  useEffect(() => {
    if (debouncedContent && activeSection?.type && ['experience', 'education', 'skills'].includes(activeSection.type)) {
      const runOptimization = async () => {
        setIsLoading(true);
        setResult(null);
        try {
          const res = await optimizeResumeSection({
            resumeSection: debouncedContent,
            jobDescription: jobDescription,
            sectionType: activeSection.type as 'experience' | 'education' | 'skills',
          });
          setResult(res);
        } catch (error) {
          console.error('Error optimizing resume section:', error);
          setResult({
            suggestions: ["Could not get suggestions at this time."],
            reasoning: "An error occurred while communicating with the AI.",
          });
        } finally {
          setIsLoading(false);
        }
      };
      runOptimization();
    }
  }, [debouncedContent, activeSection?.type, jobDescription]);

  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="h-6 w-6 text-primary" />
        <h3 className="text-lg font-semibold">AI Assistant</h3>
      </div>
      {!activeSection ? (
        <div className="text-center text-sm text-muted-foreground p-8">
          <Lightbulb className="mx-auto h-8 w-8 mb-2" />
          Click on a text area in the form to get real-time optimization tips.
        </div>
      ) : isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ) : result ? (
        <div className="space-y-4 text-sm">
          <p className="font-semibold text-primary">{result.reasoning}</p>
          <ul className="space-y-2 list-disc pl-5">
            {result.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center text-sm text-muted-foreground p-8">
          Start typing to see AI suggestions...
        </div>
      )}
    </div>
  );
}

export function ControlsPane(props: ControlsPaneProps) {
  return (
    <Tabs defaultValue="ai-assistant">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="ai-assistant">
          <Sparkles className="mr-2 h-4 w-4" /> AI Assistant
        </TabsTrigger>
        <TabsTrigger value="templates">
          <LayoutTemplate className="mr-2 h-4 w-4" /> Templates
        </TabsTrigger>
      </TabsList>
      <ScrollArea className="h-[calc(100vh-10rem)]">
        <TabsContent value="ai-assistant">
          <OptimizationPane activeSection={props.activeSection} jobDescription={props.jobDescription} />
        </TabsContent>
        <TabsContent value="templates">
          <TemplateSelector
            selectedTemplate={props.selectedTemplate}
            setSelectedTemplate={props.setSelectedTemplate}
          />
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
}
