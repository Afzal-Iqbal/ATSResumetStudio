import type { Dispatch, SetStateAction } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ResumeData, ActiveSection } from '@/lib/types';

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

  return (
    <div className="space-y-2">
      <Label htmlFor="summary">Professional Summary</Label>
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
