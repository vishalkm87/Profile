import React from 'react';
import { profileData } from '../../data/profileData';

/**
 * Career Metrics Banner.
 * Renders executive stats with bottom-anchored labels, single-line truncation, and hover tooltips.
 */
export const MetricsBanner = ({ stats = profileData.stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-stretch">
      {stats.map((stat, idx) => (
        <div 
          key={idx}
          className="group bg-[var(--bg-surface)] rounded-2xl p-4 sm:p-5 border border-[var(--border-subtle)] shadow-[var(--card-shadow)] text-center transition-all hover:border-[var(--border-strong)] flex flex-col justify-between h-full"
        >
          <div className="flex-1 flex items-center justify-center min-h-[52px] sm:min-h-[60px] px-1">
            <div 
              className="text-base sm:text-lg md:text-xl font-extrabold text-[var(--text-primary)] tracking-tight leading-snug line-clamp-2"
              title={stat.value}
            >
              {stat.value}
            </div>
          </div>
          <div 
            className="text-xs sm:text-sm font-semibold text-[var(--text-muted)] mt-auto pt-2.5 border-t border-[var(--border-subtle)]/50 truncate group-hover:whitespace-normal transition-all"
            title={stat.label}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsBanner;

