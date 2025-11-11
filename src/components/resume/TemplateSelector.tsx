import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: string;
  setSelectedTemplate: Dispatch<SetStateAction<string>>;
}

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    image: PlaceHolderImages.find((img) => img.id === 'modern-template-preview'),
  },
  {
    id: 'professional',
    name: 'Professional',
    image: PlaceHolderImages.find((img) => img.id === 'professional-template-preview'),
  },
  {
    id: 'ats-friendly',
    name: 'ATS-Friendly',
    image: PlaceHolderImages.find((img) => img.id === 'ats-friendly-template-preview'),
  },
];

export function TemplateSelector({ selectedTemplate, setSelectedTemplate }: TemplateSelectorProps) {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="relative">
            <Card
              className={cn(
                'overflow-hidden cursor-pointer transition-all',
                selectedTemplate === template.id
                  ? 'ring-2 ring-primary'
                  : 'ring-1 ring-transparent hover:ring-primary/50'
              )}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardContent className="p-0">
                {template.image && (
                  <Image
                    src={template.image.imageUrl}
                    alt={template.image.description}
                    data-ai-hint={template.image.imageHint}
                    width={200}
                    height={283}
                    className="w-full h-auto"
                  />
                )}
              </CardContent>
            </Card>
            <div className="mt-2 text-center text-sm font-medium">{template.name}</div>
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                <CheckCircle className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
