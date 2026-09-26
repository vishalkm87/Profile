import React from 'react';
import { GraduationCap, Award, ShieldCheck, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { profileData } from '../../data/profileData';

export const EducationCard = () => {
  const { education, certifications } = profileData;

  const getCertIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[var(--badge-text)]" />;
      case 'Award':
        return <Award className="w-5 h-5 text-[var(--badge-text)]" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-[var(--badge-text)]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[var(--badge-text)]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Certifications & Industry Credentials */}
      {certifications && certifications.length > 0 && (
        <div className="bg-[var(--bg-surface)] rounded-2xl p-5 sm:p-6 border border-[var(--border-subtle)] shadow-[var(--card-shadow)]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-subtle)] flex-wrap gap-2">
            <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--text-primary)]" />
              Certifications & Industry Credentials
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] shadow-xs">
              {certifications.length} Credentials
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="group p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] flex flex-col justify-between gap-3 shadow-xs hover:border-[var(--border-strong)] transition-all h-full"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--badge-bg)] text-[var(--badge-text)] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs border border-[var(--badge-border)]">
                    {getCertIcon(cert.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[var(--text-primary)] leading-snug line-clamp-2 min-h-[2.5rem] flex items-center" title={cert.name}>
                      {cert.name}
                    </h4>
                    <p 
                      className="text-xs text-[var(--text-secondary)] mt-0.5 font-medium truncate"
                      title={cert.issuer}
                    >
                      {cert.issuer}
                    </p>
                    <div 
                      className="flex items-center gap-2 mt-1 text-[11px] text-[var(--text-muted)] font-semibold truncate"
                      title={`${cert.issueDate}${cert.credentialId ? ` · ID: ${cert.credentialId}` : ''}`}
                    >
                      <span>{cert.issueDate}</span>
                      {cert.credentialId && (
                        <>
                          <span>·</span>
                          <span className="font-mono text-[10px]">ID: {cert.credentialId}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom row: Skill badges and Verification link */}
                {(cert.skills?.length > 0 || cert.credentialUrl) && (
                  <div className="w-full pt-3 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mt-auto">
                    {cert.skills && cert.skills.length > 0 ? (
                      <div className="flex gap-1.5 flex-wrap items-center">
                        {cert.skills.map((s, idx) => (
                          <span 
                            key={idx} 
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[var(--pill-bg)] text-[var(--pill-text)] border border-[var(--pill-border)] shadow-xs"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : <div />}

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)] hover:underline self-end sm:self-auto flex-shrink-0"
                      >
                        <span>Show Credential</span>
                        <ExternalLink className="w-3 h-3 text-[var(--accent-primary)]" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formal Education */}
      <div className="bg-[var(--bg-surface)] rounded-2xl p-5 sm:p-6 border border-[var(--border-subtle)] shadow-[var(--card-shadow)]">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-subtle)] flex-wrap gap-2">
          <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[var(--text-primary)]" />
            Education & Technical Training
          </h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] shadow-xs">
            {education.length} Programs
          </span>
        </div>

        <div className="space-y-4">
          {education.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] shadow-xs hover:border-[var(--border-strong)] transition-all flex flex-col sm:flex-row gap-4 items-start"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-xs mt-0.5">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
                  <h4 className="text-base font-bold text-[var(--text-primary)] leading-snug">
                    {item.degree}
                  </h4>
                  {item.period && (
                    <span className="text-xs font-semibold text-[var(--text-muted)] flex-shrink-0">
                      {item.period}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-sm font-semibold text-[var(--text-secondary)]">
                    {item.institution}
                  </span>
                  {item.location && (
                    <>
                      <span className="text-[var(--text-muted)] text-xs">·</span>
                      <span className="text-xs text-[var(--text-muted)]">{item.location}</span>
                    </>
                  )}
                  {item.grade && (
                    <>
                      <span className="text-[var(--text-muted)] text-xs">·</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] shadow-xs">
                        {item.grade}
                      </span>
                    </>
                  )}
                </div>

                {item.field && (
                  <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">
                    Field of Study: {item.field}
                  </p>
                )}

                {item.activities && (
                  <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                    {item.activities}
                  </p>
                )}

                {item.skills && item.skills.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap mt-3 pt-2.5 border-t border-[var(--border-subtle)]">
                    {item.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[var(--pill-bg)] text-[var(--pill-text)] border border-[var(--pill-border)] shadow-xs"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
