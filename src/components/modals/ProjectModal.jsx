import React, { useEffect } from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';

export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[var(--border-subtle)] relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-52 w-full bg-[var(--bg-subtle)]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent opacity-90" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[var(--badge-bg)] text-[var(--badge-text)] mb-2 inline-block border border-[var(--badge-border)] shadow-xs">
              {project.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-snug">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Engagement Context & Overview
            </h4>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {project.metrics && (
            <div className="p-3.5 bg-[var(--metric-bg)] rounded-xl border border-[var(--metric-border)] text-sm text-[var(--metric-text)] font-semibold flex items-center gap-2 shadow-xs">
              <Sparkles className="w-5 h-5 flex-shrink-0 text-[var(--text-muted)]" />
              <span>{project.metrics}</span>
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Key Architectural & Delivery Highlights
              </h4>
              <ul className="mt-3 space-y-2.5">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Technologies & Methodologies
            </h4>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-[var(--pill-bg)] text-[var(--pill-text)] border border-[var(--pill-border)] shadow-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Close Action */}
          <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] text-sm font-semibold transition-colors border border-[var(--border-strong)] shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
