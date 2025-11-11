import type { ResumeData } from '@/lib/types';

export const initialResumeData: ResumeData = {
  personalDetails: {
    fullName: 'Alex Doe',
    jobTitle: 'Software Engineer',
    email: 'alex.doe@email.com',
    phoneNumber: '(123) 456-7890',
    location: 'San Francisco, CA',
    linkedIn: 'linkedin.com/in/alexdoe',
    website: 'alexdoe.dev',
  },
  summary:
    'Innovative Software Engineer with 5+ years of experience in developing, testing, and maintaining web applications. Proficient in JavaScript, React, and Node.js. Passionate about building scalable and user-friendly solutions.',
  experience: [
    {
      id: 'exp1',
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description:
        '- Led the development of a new client-facing dashboard using React and TypeScript, improving user engagement by 25%.\n- Mentored junior engineers, fostering a culture of growth and knowledge sharing.\n- Optimized application performance, reducing load times by 40%.',
    },
    {
      id: 'exp2',
      jobTitle: 'Software Engineer',
      company: 'Innovate LLC',
      location: 'Palo Alto, CA',
      startDate: 'Jun 2018',
      endDate: 'Dec 2020',
      description:
        '- Developed and maintained features for a large-scale e-commerce platform using Node.js and Express.\n- Collaborated with cross-functional teams to define and ship new features.\n- Wrote comprehensive unit and integration tests to ensure code quality.',
    },
  ],
  education: [
    {
      id: 'edu1',
      institution: 'University of California, Berkeley',
      degree: 'Master of Science',
      fieldOfStudy: 'Computer Science',
      startDate: 'Aug 2016',
      endDate: 'May 2018',
      description:
        'Focused on distributed systems and machine learning. Thesis on scalable AI algorithms.',
    },
  ],
  skills:
    'JavaScript, TypeScript, React, Node.js, Express, Python, Django, SQL, PostgreSQL, MongoDB, Docker, AWS',
  jobDescription: '',
};
