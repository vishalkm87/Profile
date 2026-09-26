import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin } from 'lucide-react';

export const ExperienceCard = ({ experience, isLast }) => {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Detect when the card is in the active viewport reading area (especially for mobile scroll)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        root: null,
        // Active when card enters the viewport reading area:
        rootMargin: '-15% 0px -35% 0px',
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef} 
      className={`relative flex gap-4 sm:gap-6 group transition-all duration-300 ${isActive ? 'is-active' : ''}`}
    >
      {/* Timeline Indicator / Company Initial Badge */}
      <div className="flex flex-col items-center">
        <div 
          className={`w-12 h-12 rounded-xl text-sm font-bold flex items-center justify-center shadow-sm flex-shrink-0 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] transition-all duration-300 group-hover:border-[var(--border-strong)] group-hover:text-[var(--text-primary)] group-hover:shadow-[0_0_12px_var(--border-strong)] ${
            isActive ? 'timeline-node-active' : ''
          }`}
        >
          {experience.companyInitial || experience.company.slice(0, 2).toUpperCase()}
        </div>

        {/* Timeline connector bar */}
        {!isLast && (
          <div 
            className={`w-0.5 flex-1 my-2 transition-all duration-300 ${
              isActive 
                ? 'timeline-connector-active' 
                : 'bg-[var(--border-subtle)] group-hover:bg-[var(--border-strong)] group-hover:shadow-[0_0_6px_var(--border-strong)]'
            }`} 
          />
        )}
      </div>

      {/* Experience Details */}
      <div className="flex-1 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
            {experience.role}
          </h3>
          {experience.current && (
            <span className="self-start sm:self-auto text-xs px-2.5 py-0.5 rounded-full font-semibold bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] shadow-xs">
              Current Role
            </span>
          )}
        </div>

        <div className="text-sm font-semibold text-[var(--text-secondary)] mt-0.5">
          <span>{experience.company}</span>
          {experience.employmentType && (
            <>
              <span className="mx-1.5 text-[var(--text-muted)]">·</span>
              <span className="text-[var(--text-muted)] font-normal">{experience.employmentType}</span>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--text-muted)] mt-1">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {experience.startDate} – {experience.endDate}{experience.duration ? ` (${experience.duration})` : ''}
          </span>
          {experience.location && (
            <>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {experience.location}
              </span>
            </>
          )}
        </div>

        {/* Role Summary */}
        {experience.summary && (
          <p className="text-sm text-[var(--text-secondary)] mt-2.5 leading-relaxed">
            {experience.summary}
          </p>
        )}

        {/* Accomplishments */}
        {experience.highlights && experience.highlights.length > 0 && (
          <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
            {experience.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Skills Pills */}
        {experience.skills && experience.skills.length > 0 && (
          <div className="mt-4 flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-[var(--text-muted)] mr-1">Focus Areas:</span>
            {experience.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-md bg-[var(--pill-bg)] text-[var(--pill-text)] border border-[var(--pill-border)] font-medium shadow-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
