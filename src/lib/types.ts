export type PersonalDetails = {
  fullName: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  location: string;
  linkedIn: string;
  website: string;
  customLink: string;
};

export type Experience = {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type ResumeData = {
  title: string;
  userProfileId: string;
  personalDetails: PersonalDetails;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string;
  jobDescription: string;
};

export type SectionType = 'summary' | 'experience' | 'education' | 'skills' | 'personalDetails';

export type ActiveSection = {
  type: SectionType;
  content: string;
  path: string;
} | null;
