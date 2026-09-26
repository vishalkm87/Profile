import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { profileData } from '../../data/profileData';

/**
 * Executive Summary Card with expandable long-form bio toggle.
 */
export const ExecutiveSummary = ({ about = profileData.personal.about }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[var(--bg-surface)] rounded-2xl p-5 sm:p-8 border border-[var(--border-subtle)] shadow-[var(--card-shadow)]">
      <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-3">
        Executive Summary
      </h2>
      <div className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
        {expanded ? about : `${about.slice(0, 320)}...`}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1"
      >
        <span>{expanded ? 'Show less' : 'Read full profile'}</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default ExecutiveSummary;

