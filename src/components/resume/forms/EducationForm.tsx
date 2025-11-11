import type { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2 } from 'lucide-react';
import type { ResumeData, ActiveSection } from '@/lib/types';

interface FormProps {
  data: ResumeData;
  setData: Dispatch<SetStateAction<ResumeData>>;
  setActiveSection: Dispatch<SetStateAction<ActiveSection>>;
}

export function EducationForm({ data, setData, setActiveSection }: FormProps) {
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newEducation = [...data.education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    setData((prev) => ({ ...prev, education: newEducation }));

    if (name === 'description') {
        setActiveSection({ type: 'education', content: value, path: `education.${index}.description` });
    }
  };

  const addEducation = () => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: crypto.randomUUID(),
          institution: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }));
  };

  const removeEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  return (
    <div className="space-y-6">
      {data.education.map((edu, index) => (
        <div key={edu.id} className="space-y-4 p-4 border rounded-lg relative">
          <div className="space-y-2">
            <Label>Institution</Label>
            <Input name="institution" value={edu.institution} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="space-y-2">
            <Label>Degree</Label>
            <Input name="degree" value={edu.degree} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="space-y-2">
            <Label>Field of Study</Label>
            <Input name="fieldOfStudy" value={edu.fieldOfStudy} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input name="startDate" value={edu.startDate} onChange={(e) => handleChange(index, e)} />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input name="endDate" value={edu.endDate} onChange={(e) => handleChange(index, e)} />
            </div>
          </div>
           <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              value={edu.description}
              onChange={(e) => handleChange(index, e)}
              onFocus={() => setActiveSection({ type: 'education', content: edu.description, path: `education.${index}.description` })}
              onBlur={() => setActiveSection(null)}
              rows={3}
              placeholder="Optional: add details about coursework, projects, or honors."
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
            onClick={() => removeEducation(edu.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" onClick={addEducation} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Education
      </Button>
    </div>
  );
}
