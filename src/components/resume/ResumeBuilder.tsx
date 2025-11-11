'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { Card, CardContent } from '@/components/ui/card';
import { ResumeForm } from '@/components/resume/ResumeForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { ControlsPane } from '@/components/resume/ControlsPane';
import { initialResumeData } from '@/lib/initial-resume-data';
import type { ResumeData, ActiveSection } from '@/lib/types';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { setDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { doc, collection } from 'firebase/firestore';

export function ResumeBuilder() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);

  const resumesQuery = useMemoFirebase(
    () => (user ? collection(firestore, `userProfiles/${user.uid}/resumes`) : null),
    [user, firestore]
  );
  const { data: resumes, isLoading: areResumesLoading } = useCollection(resumesQuery);

  const [data, setData] = useState<ResumeData>(initialResumeData);
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [debouncedData] = useDebounce(data, 1000);

  useEffect(() => {
    if (resumes && resumes.length > 0 && !activeResumeId) {
      const latestResume = resumes[0]; // Assuming latest is first
      setActiveResumeId(latestResume.id);
      setData(latestResume as unknown as ResumeData); // Might need validation
    } else if (resumes && resumes.length === 0 && user && firestore) {
      // Create a new resume if none exist for the user
      const newResume = { ...initialResumeData, title: 'My First Resume', userProfileId: user.uid };
      const colRef = collection(firestore, `userProfiles/${user.uid}/resumes`);
      addDocumentNonBlocking(colRef, newResume).then(docRef => {
        if (docRef) {
          setActiveResumeId(docRef.id);
        }
      });
    }
  }, [resumes, activeResumeId, user, firestore]);

  useEffect(() => {
    if (user && firestore && activeResumeId && debouncedData) {
      const resumeRef = doc(firestore, `userProfiles/${user.uid}/resumes`, activeResumeId);
      const dataToSave = { ...debouncedData, userProfileId: user.uid };
      setDocumentNonBlocking(resumeRef, dataToSave, { merge: true });
    }
  }, [debouncedData, user, firestore, activeResumeId]);

  const handleSelectResume = (resumeId: string) => {
    const selectedResume = resumes?.find(r => r.id === resumeId);
    if (selectedResume) {
      setActiveResumeId(resumeId);
      setData(selectedResume as unknown as ResumeData);
    }
  }

  const handleNewResume = () => {
    if (user && firestore) {
      const newResume = { ...initialResumeData, title: `New Resume ${resumes ? resumes.length + 1 : 1}`, userProfileId: user.uid };
      const colRef = collection(firestore, `userProfiles/${user.uid}/resumes`);
      addDocumentNonBlocking(colRef, newResume).then(docRef => {
        if(docRef) {
            setActiveResumeId(docRef.id);
            setData(newResume);
        }
      });
    }
  }

  if (areResumesLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading Resumes...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] xl:grid-cols-[450px_1fr_400px] gap-4 p-4 min-h-[calc(100vh-4rem)]">
      <Card className="overflow-hidden">
        <CardContent className="p-0 h-full">
          <ResumeForm data={data} setData={setData} setActiveSection={setActiveSection} />
        </CardContent>
      </Card>

      <div className="flex items-start justify-center py-8">
        <ResumePreview data={data} template={selectedTemplate} />
      </div>

      <div className="hidden xl:block">
        <Card className="sticky top-20">
          <CardContent className="p-0">
            <ControlsPane
              activeSection={activeSection}
              jobDescription={data.jobDescription}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              resumes={resumes}
              activeResumeId={activeResumeId}
              onSelectResume={handleSelectResume}
              onNewResume={handleNewResume}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
