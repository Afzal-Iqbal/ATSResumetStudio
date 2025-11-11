import type { Dispatch, SetStateAction } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ResumeData } from '@/lib/types';

interface FormProps {
  data: ResumeData;
  setData: Dispatch<SetStateAction<ResumeData>>;
}

export function JobDescriptionForm({ data, setData }: FormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setData((prev) => ({ ...prev, jobDescription: value }));
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="jobDescription">Target Job Description</Label>
      <Textarea
        id="jobDescription"
        name="jobDescription"
        value={data.jobDescription}
        onChange={handleChange}
        rows={8}
        placeholder="Paste the job description here to get tailored AI suggestions."
      />
      <p className="text-xs text-muted-foreground">
        Providing a job description helps our AI give you the best optimization tips.
      </p>
    </div>
  );
}
