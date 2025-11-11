import type { Dispatch, SetStateAction } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ResumeData, ActiveSection } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface FormProps {
  data: ResumeData;
  setData: Dispatch<SetStateAction<ResumeData>>;
  setActiveSection: Dispatch<SetStateAction<ActiveSection>>;
}

export function SummaryForm({ data, setData, setActiveSection }: FormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setData((prev) => ({ ...prev, summary: value }));
    setActiveSection({ type: 'summary', content: value, path: 'summary' });
  };

  const clearSummary = () => {
    setData((prev) => ({ ...prev, summary: '' }));
    setActiveSection({ type: 'summary', content: '', path: 'summary' });
  };


  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="summary">Professional Summary</Label>
         <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={clearSummary}>
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Clear summary section</span>
        </Button>
      </div>
      <Textarea
        id="summary"
        name="summary"
        value={data.summary}
        onChange={handleChange}
        onFocus={() => setActiveSection({ type: 'summary', content: data.summary, path: 'summary' })}
        onBlur={() => setActiveSection(null)}
        rows={6}
        placeholder="Write a brief summary of your career, skills, and goals."
      />
    </div>
  );
}
