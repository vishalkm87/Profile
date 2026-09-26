import React from 'react';
import { Award, Clock } from 'lucide-react';
import { profileData } from '../../data/profileData';

export const SkillsSection = () => {
  const { skillCategories } = profileData;

  return (
    <div className="space-y-6">
      {skillCategories.map((cat, idx) => (
        <div 
          key={idx} 
          className="bg-[var(--bg-surface)] rounded-2xl p-5 sm:p-6 border border-[var(--border-subtle)] shadow-[var(--card-shadow)]"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-subtle)]">
            <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--text-primary)]" />
              {cat.category}
            </h3>
            <span className="text-xs text-[var(--text-muted)] font-medium">
              {cat.skills.length} competencies
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {cat.skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-sm text-[var(--text-primary)]">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[var(--pill-bg)] text-[var(--pill-text)] border border-[var(--pill-border)] flex-shrink-0 shadow-xs">
                    {skill.level}
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)]/60 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[var(--text-muted)]">Experience</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] shadow-xs">
                    <Clock className="w-3 h-3 text-[var(--badge-text)]" />
                    <span>{skill.years}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
