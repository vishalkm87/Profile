import React from 'react';
import { Cpu } from 'lucide-react';
import { PageHeader } from '../components/common';
import { SkillsSection } from '../components/sections';

export const SkillsPage = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        icon={Cpu}
        title="Core Competencies & Domain Expertise"
        description="Languages, cross-platform mobility frameworks, agile methodologies, and enterprise cloud tooling"
      />

      {/* Categorized Skills Section */}
      <SkillsSection />
    </div>
  );
};
