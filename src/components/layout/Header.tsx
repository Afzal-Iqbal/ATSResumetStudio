'use client';

import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

export function Header() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">ResuMaster</h1>
        </div>
        <Button onClick={handlePrint}>
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>
    </header>
  );
}
