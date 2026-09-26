import React from 'react';
import { Sparkles, Layers } from 'lucide-react';

export const ProjectCard = ({ project, onSelectProject }) => {
  return (
    <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] hover:border-[var(--border-strong)] transition-all duration-300 flex flex-col group">
      {/* Image Preview */}
      <div 
        className="relative h-48 w-full overflow-hidden bg-[var(--bg-subtle)] cursor-pointer"
        onClick={() => onSelectProject && onSelectProject(project)}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        {/* Hover Highlight Overlay CTA (Positioned at bottom) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-start p-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[var(--bg-surface)] text-[var(--text-primary)] text-xs font-bold shadow-xl border border-[var(--border-strong)] transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>View Engagement Highlights</span>
            <span className="text-[var(--accent-primary)] font-bold">&rarr;</span>
          </div>
        </div>

        {/* Category & Initiative Pills */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md bg-[var(--bg-surface)]/95 text-[var(--text-primary)] backdrop-blur-md shadow-sm border border-[var(--border-subtle)]">
            {project.category}
          </span>
          {project.featured && (
            <span className="text-[11px] font-semibold px-2 py-1 rounded-md bg-[var(--badge-bg)] text-[var(--badge-text)] backdrop-blur-md shadow-sm flex items-center gap-1 border border-[var(--badge-border)]">
              <Sparkles className="w-3 h-3" />
              Key Initiative
            </span>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            className="text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:opacity-80 transition-opacity cursor-pointer"
            onClick={() => onSelectProject && onSelectProject(project)}
          >
            {project.title}
          </h3>

          <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
            {project.description}
          </p>

          {/* Metric / Impact Badge */}
          {project.metrics && (
            <div className="mt-3.5 p-2.5 rounded-lg bg-[var(--metric-bg)] border border-[var(--metric-border)] text-xs font-medium text-[var(--metric-text)] flex items-center gap-2 shadow-xs">
              <Layers className="w-4 h-4 flex-shrink-0 text-[var(--text-muted)]" />
              <span>{project.metrics}</span>
            </div>
          )}

          {/* Technology Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-md bg-[var(--pill-bg)] text-[var(--pill-text)] font-medium border border-[var(--pill-border)] shadow-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
          <button
            onClick={() => onSelectProject && onSelectProject(project)}
            className="text-xs font-semibold text-[var(--accent-primary)] hover:underline flex items-center gap-1"
          >
            <span>Read Case Study &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
