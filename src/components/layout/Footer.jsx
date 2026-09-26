import React from 'react';
import { ArrowUp } from 'lucide-react';
import { profileData } from '../../data/profileData';
import { LogoSvg } from '../icons/LogoSvg';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 backdrop-blur-md py-8 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <LogoSvg className="w-7 h-7 flex-shrink-0" />
            <p className="text-xs text-[var(--text-muted)] font-medium">
              © {new Date().getFullYear()} {profileData.personal.name} · {profileData.personal.currentRole || 'Professional Portfolio'}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1.5 rounded-lg hover:bg-[var(--bg-subtle)] border border-transparent hover:border-[var(--border-subtle)]"
              title="Scroll to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Subtle Disclaimer & Trademark Notice */}
        <div className="pt-4 border-t border-[var(--border-subtle)]/70 text-[11px] text-[var(--text-muted)]">
          <p>
            <strong>Disclaimer:</strong> Content and case studies represent personal professional reflections; all trademarks and company names belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};
