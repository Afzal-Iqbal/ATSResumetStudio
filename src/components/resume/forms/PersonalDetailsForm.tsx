import type { Dispatch, SetStateAction } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { ResumeData } from '@/lib/types';

interface FormProps {
  data: ResumeData;
  setData: Dispatch<SetStateAction<ResumeData>>;
}

export function PersonalDetailsForm({ data, setData }: FormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [name]: value },
    }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" name="fullName" value={data.personalDetails.fullName} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input id="jobTitle" name="jobTitle" value={data.personalDetails.jobTitle} onChange={handleChange} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={data.personalDetails.email} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input id="phoneNumber" name="phoneNumber" value={data.personalDetails.phoneNumber} onChange={handleChange} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" value={data.personalDetails.location} onChange={handleChange} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedIn">LinkedIn</Label>
          <Input id="linkedIn" name="linkedIn" value={data.personalDetails.linkedIn} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website/Portfolio</Label>
          <Input id="website" name="website" value={data.personalDetails.website} onChange={handleChange} />
        </div>
      </div>
       <div className="space-y-2">
        <Label htmlFor="customLink">Custom Link</Label>
        <Input id="customLink" name="customLink" value={data.personalDetails.customLink} onChange={handleChange} placeholder="e.g., github.com/username" />
      </div>
    </div>
  );
}
