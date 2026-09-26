import React from 'react';

/**
 * Standardized Header Card used across all sub-pages.
 * Provides consistent typography, icon containers, and optional action slots.
 */
export const PageHeader = ({
  icon: Icon,
  title,
  description,
  action,
  children,
  className = ''
}) => {
  return (
    <div className={`bg-[var(--bg-surface)] rounded-2xl p-6 sm:p-8 border border-[var(--border-subtle)] shadow-[var(--card-shadow)] ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-2 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] shadow-xs flex-shrink-0">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Optional Action Slot (e.g. search input on same line) */}
        {action && (
          <div className="w-full sm:w-auto">
            {action}
          </div>
        )}
      </div>

      {/* Optional Full-width Bottom Slot (e.g. filters + search bar) */}
      {children && (
        <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
