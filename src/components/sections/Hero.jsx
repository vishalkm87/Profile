import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Building2, 
  GraduationCap, 
  Mail, 
  Phone,
  Briefcase, 
  ShieldCheck,
  Share2,
  ExternalLink,
  Layers,
  Award,
  Cpu
} from 'lucide-react';
import { profileData } from '../../data/profileData';

export const Hero = ({ onOpenContactModal }) => {
  const { personal } = profileData;
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${personal.name} - Executive Profile`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative bg-[var(--bg-surface)] rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-[var(--card-shadow)]">
      {/* Banner Component with blueprint styling */}
      <div className="relative h-48 sm:h-52 md:h-64 w-full overflow-hidden bg-[var(--bg-canvas)]">
        {personal.coverImage && (
          <img
            src={personal.coverImage}
            alt="Systems Architecture Banner"
            className="w-full h-full object-cover object-left sm:object-center transform transition-transform duration-700 hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent opacity-90" />
        
        {/* Share profile button */}
        <button
          onClick={handleShare}
          className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/10 transition-all shadow-md flex items-center gap-1.5 text-xs font-semibold"
          title="Share profile"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? 'Copied!' : 'Share'}</span>
        </button>
      </div>

      {/* Main Profile Info Section */}
      <div className="px-5 sm:px-8 pb-8 pt-0 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 mb-5 gap-4">
          {/* Executive Vector Avatar */}
          <div className="relative">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-[var(--bg-canvas)] border-4 border-[var(--bg-surface)] shadow-lg overflow-hidden flex items-center justify-center font-bold text-2xl text-[var(--text-primary)]">
              {personal.avatar ? (
                <img 
                  src={personal.avatar} 
                  alt={personal.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{personal.monogram}</span>
              )}
            </div>
          </div>

          {/* Direct Communication Channels Dock */}
          <div className="inline-flex items-center p-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] shadow-xs self-start sm:self-end gap-1">
            {personal.email && (
              <a
                href={personal.email.startsWith('mailto:') ? personal.email : `mailto:${personal.email}`}
                className="px-3 py-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] rounded-lg transition-all text-xs font-semibold flex items-center gap-1.5"
                title="Send email directly"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                <span>Email</span>
              </a>
            )}
            
            {personal.phone && (
              <a
                href={personal.phone.startsWith('tel:') ? personal.phone : `tel:${personal.phone.replace(/\s+/g, '')}`}
                className="px-3 py-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] rounded-lg transition-all text-xs font-semibold flex items-center gap-1.5"
                title="Call phone directly"
              >
                <Phone className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                <span>Call</span>
              </a>
            )}

            {personal.socialLinks?.linkedin && (
              <a
                href={personal.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] rounded-lg transition-all text-xs font-semibold flex items-center gap-1.5"
                title="LinkedIn Profile"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-3">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                  {personal.name}
                </h1>
                <span className="inline-flex items-center gap-1.5 text-xs bg-[var(--badge-bg)] text-[var(--badge-text)] font-semibold px-2.5 py-0.5 rounded-md border border-[var(--badge-border)] shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--badge-text)]" />
                  {personal.specializationBadge}
                </span>
              </div>
              <p className="text-base font-semibold text-[var(--text-secondary)] mt-1">
                {personal.headline}
              </p>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5 font-normal">
                {personal.subHeadline}
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[var(--text-muted)]">
              <MapPin className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
              <span>{personal.location} ({personal.locationDetail})</span>
            </div>
          </div>

          {/* Right Column: Organization & Academic Summary */}
          <div className="space-y-3 pt-1 lg:pl-5 lg:border-l lg:border-[var(--border-subtle)] text-xs sm:text-sm">
            {personal.currentCompany && (
              <div className="flex items-center gap-3 text-[var(--text-secondary)] font-medium">
                <div className="w-8 h-8 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-primary)] flex items-center justify-center flex-shrink-0 border border-[var(--border-subtle)] shadow-xs">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold leading-tight text-[var(--text-primary)]">{personal.currentCompany}</p>
                  <p className="text-xs text-[var(--text-muted)]">{personal.currentRole}</p>
                </div>
              </div>
            )}

            {profileData.education?.[0] && (
              <div className="flex items-center gap-3 text-[var(--text-secondary)] font-medium">
                <div className="w-8 h-8 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-primary)] flex items-center justify-center flex-shrink-0 border border-[var(--border-subtle)] shadow-xs">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold leading-tight text-[var(--text-primary)]">{profileData.education[0].institution}</p>
                  <p className="text-xs text-[var(--text-muted)]">{profileData.education[0].degree}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons: Smooth Scroll to Overview Sections */}
        <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-3">
          <button
            onClick={() => scrollToSection('projects-section')}
            className="px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] text-sm font-semibold flex items-center gap-2 shadow-sm transition-all border border-[var(--border-strong)]"
          >
            <Layers className="w-4 h-4" />
            <span>Key Engagements</span>
          </button>

          <button
            onClick={() => scrollToSection('experience-section')}
            className="px-4 py-2.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] text-sm font-semibold flex items-center gap-2 transition-colors border border-[var(--border-subtle)] hover:border-[var(--border-strong)] shadow-xs"
          >
            <Briefcase className="w-4 h-4" />
            <span>Career Journey</span>
          </button>

          <button
            onClick={() => scrollToSection('certifications-section')}
            className="px-4 py-2.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] text-sm font-semibold flex items-center gap-2 transition-colors border border-[var(--border-subtle)] hover:border-[var(--border-strong)] shadow-xs"
          >
            <Award className="w-4 h-4" />
            <span>Certifications</span>
          </button>

          <button
            onClick={() => scrollToSection('skills-section')}
            className="px-4 py-2.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] text-sm font-semibold flex items-center gap-2 transition-colors border border-[var(--border-subtle)] hover:border-[var(--border-strong)] shadow-xs"
          >
            <Cpu className="w-4 h-4" />
            <span>Skills & Tools</span>
          </button>

          <button
            onClick={onOpenContactModal}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors ml-auto flex items-center gap-1.5"
          >
            <span>Advisory Inquiries &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
