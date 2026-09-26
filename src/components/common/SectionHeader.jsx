import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Standardized Section Header used on overview cards.
 * Displays section title, leading icon, contextual description, and an optional link.
 */
export const SectionHeader = ({
  icon: Icon,
  title,
  description,
  linkTo,
  linkLabel,
  action,
  className = 'mb-6 pb-3 border-b border-[var(--border-subtle)]'
}) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-[var(--text-primary)] flex-shrink-0" />}
          <span>{title}</span>
        </h2>
        {description && (
          <p className="text-xs text-[var(--text-muted)] mt-0.5 font-normal">
            {description}
          </p>
        )}
      </div>

      {action ? (
        action
      ) : linkTo && linkLabel ? (
        <Link
          to={linkTo}
          className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1 flex-shrink-0"
        >
          <span>{linkLabel}</span>
        </Link>
      ) : null}
    </div>
  );
};

export default SectionHeader;

