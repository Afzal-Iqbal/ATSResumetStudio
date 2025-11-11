import type { Dispatch, SetStateAction } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ResumeData, ActiveSection } from '@/lib/types';

interface FormProps {
  data: ResumeData;
  setData: Dispatch<SetStateAction<ResumeData>>;
  setActiveSection: Dispatch<SetStateAction<ActiveSection>>;
}

export function SkillsForm({ data, setData, setActiveSection }: FormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setData((prev) => ({ ...prev, skills: value }));
    setActiveSection({ type: 'skills', content: value, path: 'skills' });
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="skills">Skills</Label>
      <Textarea
        id="skills"
        name="skills"
        value={data.skills}
        onChange={handleChange}
        onFocus={() => setActiveSection({ type: 'skills', content: data.skills, path: 'skills' })}
        onBlur={() => setActiveSection(null)}
        rows={6}
        placeholder="e.g., JavaScript, React, Node.js, Project Management"
      />
      <p className="text-xs text-muted-foreground">
        Enter skills separated by commas.
      </p>
    </div>
  );
}
