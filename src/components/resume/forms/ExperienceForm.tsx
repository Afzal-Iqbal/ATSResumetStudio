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

export function ExperienceForm({ data, setData, setActiveSection }: FormProps) {
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newExperience = [...data.experience];
    newExperience[index] = { ...newExperience[index], [name]: value };
    setData((prev) => ({ ...prev, experience: newExperience }));

    if (name === 'description') {
      setActiveSection({ type: 'experience', content: value, path: `experience.${index}.description` });
    }
  };

  const addExperience = () => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: crypto.randomUUID(),
          jobTitle: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }));
  };

  const removeExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  return (
    <div className="space-y-6">
      {data.experience.map((exp, index) => (
        <div key={exp.id} className="space-y-4 p-4 border rounded-lg relative">
          <div className="space-y-2">
            <Label>Job Title</Label>
            <Input name="jobTitle" value={exp.jobTitle} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="space-y-2">
            <Label>Company</Label>
            <Input name="company" value={exp.company} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input name="location" value={exp.location} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input name="startDate" value={exp.startDate} onChange={(e) => handleChange(index, e)} />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input name="endDate" value={exp.endDate} onChange={(e) => handleChange(index, e)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              value={exp.description}
              onChange={(e) => handleChange(index, e)}
              onFocus={() => setActiveSection({ type: 'experience', content: exp.description, path: `experience.${index}.description` })}
              onBlur={() => setActiveSection(null)}
              rows={5}
              placeholder="Describe your responsibilities and achievements."
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
            onClick={() => removeExperience(exp.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
       <Button variant="outline" onClick={addExperience} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Experience
      </Button>
    </div>
  );
}
