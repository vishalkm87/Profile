import React, { useEffect } from 'react';
import { 
  X, 
  Check, 
  Palette, 
  Sun, 
  Moon, 
  Leaf, 
  Sparkles, 
  Trees, 
  Waves, 
  Droplets 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeModal = ({ isOpen, onClose }) => {
  const { theme, setTheme, themes, currentTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getThemeIcon = (iconName) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-4 h-4" />;
      case 'Moon':
        return <Moon className="w-4 h-4" />;
      case 'Leaf':
        return <Leaf className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'Trees':
        return <Trees className="w-4 h-4" />;
      case 'Waves':
        return <Waves className="w-4 h-4" />;
      case 'Droplets':
        return <Droplets className="w-4 h-4" />;
      default:
        return <Palette className="w-4 h-4" />;
    }
  };

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'Pastel Green':
        return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30';
      case 'Shade of Blue':
        return 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30';
      default:
        return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      {/* Backdrop click dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-subtle)]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--badge-bg)] text-[var(--badge-text)] flex items-center justify-center border border-[var(--badge-border)] shadow-xs">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                Select Visual Theme
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Choose from 7 bespoke palettes tailored for readability, contrast, and elegance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] rounded-xl transition-colors border border-transparent hover:border-[var(--border-subtle)]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {themes.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-4 rounded-xl text-left transition-all relative border flex flex-col justify-between gap-3 group ${
                    isSelected
                      ? 'bg-[var(--bg-subtle)] border-[var(--accent-primary)] shadow-md ring-1 ring-[var(--accent-primary)]'
                      : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)]/70 border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  {/* Top Bar: Icon, Name & Category Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-xs border border-black/10"
                        style={{ backgroundColor: t.accent, color: t.type === 'dark' ? '#09110d' : '#ffffff' }}
                      >
                        {getThemeIcon(t.icon)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[var(--text-primary)] leading-tight">
                          {t.name}
                        </h4>
                        <span className={`inline-block text-[9px] px-1.5 py-0.2 rounded font-semibold mt-0.5 ${getBadgeStyle(t.badge)}`}>
                          {t.badge}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] shadow-xs">
                        <Check className="w-3 h-3" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[var(--text-muted)] font-normal leading-relaxed">
                    {t.description}
                  </p>

                  {/* Live Palette Swatch Preview Bar */}
                  <div className="w-full pt-2 border-t border-[var(--border-subtle)]/60 flex items-center gap-2">
                    <div className="flex items-center gap-1.5 flex-1">
                      <span 
                        className="w-5 h-3.5 rounded border border-black/20 shadow-xs" 
                        style={{ backgroundColor: t.swatch }}
                        title="Canvas Background"
                      />
                      <span 
                        className="w-5 h-3.5 rounded border border-black/20 shadow-xs" 
                        style={{ backgroundColor: t.accent }}
                        title="Accent Tone"
                      />
                      <span className="text-[10px] text-[var(--text-muted)] font-medium capitalize ml-1">
                        {t.type} Mode
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)]/40 flex items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-muted)]">
            Selection is saved automatically to your device.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] transition-all shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

