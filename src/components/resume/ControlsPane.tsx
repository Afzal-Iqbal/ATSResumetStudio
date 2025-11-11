'use client';
import type { Dispatch, SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Sparkles, LayoutTemplate, Lightbulb, Save, Plus, ChevronsUpDown, ThumbsUp, Pencil } from 'lucide-react';
import { TemplateSelector } from './TemplateSelector';
import type { ActiveSection, ResumeData } from '@/lib/types';
import { optimizeResumeSection, OptimizeResumeSectionOutput } from '@/ai/flows/real-time-resume-optimization';

interface ControlsPaneProps {
  activeSection: ActiveSection;
  jobDescription: string;
  selectedTemplate: string;
  setSelectedTemplate: Dispatch<SetStateAction<string>>;
  resumes: (ResumeData & { id: string; })[] | null;
  activeResumeId: string | null;
  onSelectResume: (id: string) => void;
  onNewResume: () => void;
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
    if (debouncedContent && activeSection?.type && ['experience', 'education', 'skills', 'summary'].includes(activeSection.type)) {
      const runOptimization = async () => {
        setIsLoading(true);
        setResult(null);
        try {
          const res = await optimizeResumeSection({
            resumeSection: debouncedContent,
            jobDescription: jobDescription,
            sectionType: activeSection.type as 'experience' | 'education' | 'skills' | 'summary',
          });
          setResult(res);
        } catch (error) {
          console.error('Error optimizing resume section:', error);
          setResult({
            strengths: [],
            improvements: ["Could not get suggestions at this time."],
            overallFeedback: "An error occurred while communicating with the AI.",
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
      {!activeSection || !['experience', 'education', 'skills', 'summary'].includes(activeSection.type) ? (
        <div className="text-center text-sm text-muted-foreground p-8">
          <Lightbulb className="mx-auto h-8 w-8 mb-2" />
          Click on a Summary, Experience, Education, or Skills text area to get real-time optimization tips.
        </div>
      ) : isLoading ? (
        <div className="space-y-4 p-4">
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-1/4 mt-6 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>
      ) : result ? (
        <div className="space-y-6 text-sm">
          <p className="font-semibold text-primary">{result.overallFeedback}</p>
          
          {result.strengths && result.strengths.length > 0 && (
            <div className="space-y-2">
                <h4 className="flex items-center gap-2 font-semibold text-green-600 dark:text-green-500">
                    <ThumbsUp className="h-4 w-4" /> Strengths
                </h4>
                <ul className="space-y-2 list-disc pl-5">
                    {result.strengths.map((s, i) => (
                    <li key={`strength-${i}`}>{s}</li>
                    ))}
                </ul>
            </div>
          )}

          {result.improvements && result.improvements.length > 0 && (
            <div className="space-y-2">
                <h4 className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-500">
                    <Pencil className="h-4 w-4" /> Areas for Improvement
                </h4>
                 <ul className="space-y-2 list-disc pl-5">
                    {result.improvements.map((s, i) => (
                    <li key={`improvement-${i}`}>{s}</li>
                    ))}
                </ul>
            </div>
          )}
        </div>
      ) : (
         <div className="text-center text-sm text-muted-foreground p-8">
          Start typing to see AI suggestions...
        </div>
      )}
    </div>
  );
}

function SavedResumesPane({ resumes, activeResumeId, onSelectResume, onNewResume }: Pick<ControlsPaneProps, 'resumes' | 'activeResumeId' | 'onSelectResume' | 'onNewResume'>) {
  const activeResume = resumes?.find(r => r.id === activeResumeId);

  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <Save className="h-6 w-6 text-primary" />
        <h3 className="text-lg font-semibold">My Resumes</h3>
      </div>
      <div className="space-y-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {activeResume?.title ?? 'Select a resume'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[350px]">
            {resumes?.map(resume => (
              <DropdownMenuItem key={resume.id} onSelect={() => onSelectResume(resume.id)}>
                {resume.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={onNewResume} className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Create New Resume
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-4 text-center">Your progress is saved automatically.</p>
    </div>
  )
}

export function ControlsPane(props: ControlsPaneProps) {
  return (
    <Tabs defaultValue="ai-assistant">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="ai-assistant">
          <Sparkles className="mr-2 h-4 w-4" /> AI
        </TabsTrigger>
        <TabsTrigger value="templates">
          <LayoutTemplate className="mr-2 h-4 w-4" /> Templates
        </TabsTrigger>
        <TabsTrigger value="resumes">
            <Save className="mr-2 h-4 w-4" /> Resumes
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
         <TabsContent value="resumes">
          <SavedResumesPane
            resumes={props.resumes}
            activeResumeId={props.activeResumeId}
            onSelectResume={props.onSelectResume}
            onNewResume={props.onNewResume}
          />
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
}
