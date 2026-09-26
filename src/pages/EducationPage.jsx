import React from 'react';
import { Award } from 'lucide-react';
import { PageHeader } from '../components/common';
import { EducationCard } from '../components/cards';

export const EducationPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Award}
        title="Certifications & Education"
        description="Professional credentials in Agile/Scrum, Cloud Foundations, and postgraduate engineering training"
      />

      <EducationCard />
    </div>
  );
};
