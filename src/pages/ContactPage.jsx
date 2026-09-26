import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ExternalLink, Copy, Check, Sparkles, RefreshCw } from 'lucide-react';
import { PageHeader } from '../components/common';
import { profileData } from '../data/profileData';

export const ContactPage = () => {
  const { personal } = profileData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Clean recipient email address
  const recipientEmail = (personal.email || '').replace(/^mailto:/i, '').trim();

  // Dynamic dispatch URLs - clean message without robotic header wrappers
  const emailSubject = formData.subject || 'Consulting / Professional Inquiry';
  const emailBody = (formData.message || '').trim();

  const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const yahooUrl = `https://compose.mail.yahoo.com/?to=${encodeURIComponent(recipientEmail)}&subj=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(recipientEmail)}&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Attempt direct OS mail client trigger without popup blockers
    try {
      window.location.href = mailtoUrl;
    } catch {
      // Fallback handled by rendered success view
    }
  };

  const handleCopyMessage = () => {
    const fullText = `To: ${recipientEmail}\nSubject: ${emailSubject}\n\n${emailBody}`;
    navigator.clipboard.writeText(fullText);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(recipientEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        icon={Mail}
        title="Connect & Collaborate"
        description="Available for technical consulting, agile program leadership, and professional networking"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Direct Contact Channels Card */}
        <div className="space-y-6">
          <div className="bg-[var(--bg-surface)] rounded-2xl p-6 border border-[var(--border-subtle)] shadow-[var(--card-shadow)] space-y-5">
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              Direct Contact Details
            </h3>

            <div className="space-y-4 text-sm">
              {/* Email */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] shadow-xs flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[var(--text-muted)] font-medium">Email Address</p>
                    <a 
                      href={`mailto:${recipientEmail}`} 
                      className="font-semibold text-[var(--text-primary)] hover:underline truncate block"
                      title={recipientEmail}
                    >
                      {recipientEmail}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg transition-colors flex-shrink-0"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-[var(--accent-primary)]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              {personal.phone && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] shadow-xs flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] font-medium">Direct Phone</p>
                    <a href={`tel:${personal.phone}`} className="font-semibold text-[var(--text-primary)] hover:underline">
                      {personal.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] shadow-xs flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)] font-medium">Location</p>
                  <p className="font-semibold text-[var(--text-primary)]">
                    {personal.location}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">{personal.locationDetail}</p>
                </div>
              </div>
            </div>

            {/* Profile Link */}
            {personal.socialLinks?.linkedin && (
              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <a
                  href={personal.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)] text-xs font-semibold text-[var(--text-primary)] transition-colors shadow-xs"
                >
                  <span>LinkedIn Professional Profile</span>
                  <ExternalLink className="w-4 h-4 text-[var(--text-muted)]" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Contact Form & Dispatch Center */}
        <div className="lg:col-span-2 bg-[var(--bg-surface)] rounded-2xl p-6 sm:p-8 border border-[var(--border-subtle)] shadow-[var(--card-shadow)]">
          {submitted ? (
            <div className="space-y-6 animate-fade-in">
              {/* Header Badge */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] flex items-center justify-center flex-shrink-0 border border-[var(--accent-primary)]/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    Message Prepared & Ready to Send
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Your default mail app was triggered. If using browser webmail, select your service below:
                  </p>
                </div>
              </div>

              {/* Instant Webmail Launch Options */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                  Choose Your Preferred Email Provider:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Gmail */}
                  <a
                    href={gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-hover)] transition-all shadow-xs group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center font-bold text-xs border border-red-500/20">
                        M
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">Open in Gmail</p>
                        <p className="text-[11px] text-[var(--text-muted)]">Webmail compose window</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
                  </a>

                  {/* Yahoo Mail */}
                  <a
                    href={yahooUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-hover)] transition-all shadow-xs group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-xs border border-purple-500/20">
                        Y!
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">Open in Yahoo Mail</p>
                        <p className="text-[11px] text-[var(--text-muted)]">Yahoo compose window</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
                  </a>

                  {/* Outlook */}
                  <a
                    href={outlookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-hover)] transition-all shadow-xs group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xs border border-blue-500/20">
                        O
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">Open in Outlook</p>
                        <p className="text-[11px] text-[var(--text-muted)]">Outlook / Hotmail web</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
                  </a>

                  {/* Desktop Client Re-trigger */}
                  <a
                    href={mailtoUrl}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-hover)] transition-all shadow-xs group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/15 text-[var(--text-primary)] flex items-center justify-center font-bold text-xs border border-[var(--border-strong)]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">Default Mail App</p>
                        <p className="text-[11px] text-[var(--text-muted)]">Apple Mail / Outlook desktop</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
                  </a>
                </div>
              </div>

              {/* Message Preview & Copy Card */}
              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--text-secondary)]">Message Summary</span>
                  <button
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] border border-[var(--border-subtle)] shadow-xs transition-colors"
                  >
                    {copiedMessage ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-xs font-mono bg-[var(--bg-surface)] p-3 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] space-y-1">
                  <p><span className="text-[var(--text-muted)]">To:</span> {recipientEmail}</p>
                  <p><span className="text-[var(--text-muted)]">Subject:</span> {emailSubject}</p>
                  <p className="pt-1.5 border-t border-[var(--border-subtle)] whitespace-pre-wrap">{emailBody}</p>
                </div>
              </div>

              {/* Reset Action */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Send another message</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-1">
                <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                  Send an Inquiry
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--border-strong)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--border-strong)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Technical Architecture / Program Delivery Opportunity"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--border-strong)] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your initiative, engagement details, or inquiry..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--border-strong)] resize-y transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all border border-[var(--border-strong)]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
