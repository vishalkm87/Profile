import React, { useState } from 'react';
import { Briefcase, Search } from 'lucide-react';
import { PageHeader } from '../components/common';
import { ExperienceCard } from '../components/cards';
import { profileData } from '../data/profileData';

export const ExperiencePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExperiences = profileData.experiences.filter((exp) => {
    const term = searchTerm.toLowerCase();
    const matchesRole = exp.role.toLowerCase().includes(term);
    const matchesCompany = exp.company.toLowerCase().includes(term);
    const matchesSkill = exp.skills?.some(s => s.toLowerCase().includes(term));
    return matchesRole || matchesCompany || matchesSkill;
  });

  return (
    <div className="space-y-6">
      {/* Header card */}
      <PageHeader
        icon={Briefcase}
        title="Career & Leadership History"
        description={`Over ${profileData.personal.experienceYears} of engineering milestones, team mentorship, and enterprise consulting.`}
        action={
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by role, company, or technology..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--border-strong)] transition-all"
            />
          </div>
        }
      />

      {/* Experience Timeline */}
      <div className="bg-[var(--bg-surface)] rounded-2xl p-6 sm:p-8 border border-[var(--border-subtle)] shadow-[var(--card-shadow)]">
        {filteredExperiences.length > 0 ? (
          <div className="space-y-2">
            {filteredExperiences.map((exp, idx) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                isLast={idx === filteredExperiences.length - 1}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-[var(--text-muted)]">
            <p className="font-semibold text-base text-[var(--text-primary)]">No experiences matched "{searchTerm}"</p>
            <p className="text-xs mt-1">Try searching for a different skill or company</p>
          </div>
        )}
      </div>
    </div>
  );
};
