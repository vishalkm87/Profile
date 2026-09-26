import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Copy, Check, ExternalLink } from 'lucide-react';
import { profileData } from '../../data/profileData';

export const ContactModal = ({ isOpen, onClose }) => {
  const { personal } = profileData;
  const [copiedField, setCopiedField] = useState(null);

  if (!isOpen) return null;

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[var(--border-subtle)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            {personal.name}
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Executive Contact Details & Channels
          </p>
        </div>

        {/* Contact List */}
        <div className="space-y-3.5 text-sm">
          {/* Email */}
          <div className="flex items-start justify-between p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)]">Email Address</p>
                <a 
                  href={`mailto:${personal.email}`}
                  className="font-medium text-[var(--text-primary)] hover:underline"
                >
                  {personal.email}
                </a>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(personal.email, 'email')}
              className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded transition-colors"
              title="Copy email"
            >
              {copiedField === 'email' ? <Check className="w-4 h-4 text-[var(--text-primary)]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone */}
          {personal.phone && (
            <div className="flex items-start justify-between p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Direct Phone</p>
                  <a 
                    href={`tel:${personal.phone}`} 
                    className="font-medium text-[var(--text-primary)] hover:underline"
                  >
                    {personal.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(personal.phone, 'phone')}
                className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded transition-colors"
                title="Copy phone"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-[var(--text-primary)]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          )}

          {/* Location */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] shadow-xs">
            <div className="p-2 rounded-lg bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)]">Location</p>
              <p className="font-medium text-[var(--text-primary)]">{personal.location} ({personal.locationDetail})</p>
            </div>
          </div>

          {/* LinkedIn Profile */}
          {personal.socialLinks.linkedin && (
            <div className="pt-1">
              <a
                href={personal.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)] text-xs font-semibold text-[var(--text-primary)] transition-colors shadow-xs"
              >
                <span>View LinkedIn Professional Profile</span>
                <ExternalLink className="w-4 h-4 text-[var(--text-muted)]" />
              </a>
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
          <a
            href={`mailto:${personal.email}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] text-sm font-semibold transition-all border border-[var(--border-strong)] shadow-sm"
          >
            <Mail className="w-4 h-4" />
            <span>Send Direct Email</span>
          </a>
        </div>
      </div>
    </div>
  );
};
