import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  User, 
  Briefcase, 
  Layers, 
  Cpu, 
  Award, 
  Mail, 
  Menu, 
  X,
  Palette
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { profileData } from '../../data/profileData';
import { LogoSvg } from '../icons/LogoSvg';
import { ThemeModal } from '../modals/ThemeModal';
import { navRoutes } from '../../routes';

const navItems = navRoutes;

export const Navbar = () => {
  const { currentTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const location = useLocation();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[var(--bg-surface)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors duration-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Innovative Live SVG Logo & Profile Brand */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
              onClick={closeMobileMenu}
              title={`${profileData.personal.name || 'Portfolio'} · ${profileData.personal.currentRole || 'Showcase'}`}
            >
              <LogoSvg className="w-10 h-10 flex-shrink-0" />
              <div className="flex flex-col justify-center min-w-0">
                <span className="font-bold text-[var(--text-primary)] leading-tight tracking-tight text-base sm:text-lg group-hover:text-[var(--text-primary)]">
                  {profileData.personal.name}
                </span>
                <span className="text-[11px] sm:text-xs text-[var(--text-muted)] hidden sm:inline-block leading-normal">
                  {profileData.personal.currentRole}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation (Single-line with responsive icon-only fallback) */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    title={item.name}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs font-semibold transition-all relative border-b-2 ${
                      isActive
                        ? 'text-[var(--text-primary)] bg-[var(--bg-subtle)] border-[var(--accent-primary)] shadow-xs'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-[var(--text-primary)]' : ''}`} />
                    <span className="hidden lg:inline whitespace-nowrap">
                      {item.name}
                    </span>
                    {isActive && (
                      <span 
                        className="absolute -bottom-[2px] left-0 right-0 h-[2.5px] rounded-full shadow-xs" 
                        style={{ backgroundColor: currentTheme?.accent || 'var(--accent-primary)' }}
                      />
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Actions: Theme Icon Trigger & Connect CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Icon Button (Opens Theme Selection Modal) */}
              <button
                onClick={() => setIsThemeModalOpen(true)}
                aria-label="Select theme"
                className="relative p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] rounded-xl transition-all border border-[var(--border-subtle)] hover:border-[var(--border-strong)] shadow-xs group"
                title={`Theme: ${currentTheme?.name} (Click to open theme modal)`}
              >
                <Palette className="w-4 h-4 text-[var(--text-primary)] transition-transform group-hover:scale-110" />
                <span 
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-[var(--bg-surface)] shadow-xs" 
                  style={{ backgroundColor: currentTheme?.accent }}
                />
              </button>


              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] rounded-lg transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 pt-2 pb-6 space-y-3 shadow-xl animate-fade-in">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[var(--bg-subtle)] text-[var(--text-primary)] font-bold border-l-4 border-[var(--accent-primary)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Mobile Theme Selector Trigger */}
            <div className="pt-3 pb-2 border-t border-[var(--border-subtle)]">
              <button
                onClick={() => {
                  closeMobileMenu();
                  setIsThemeModalOpen(true);
                }}
                className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-[var(--bg-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <span>Choose Theme Palette</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: currentTheme?.accent }} />
                  <span className="text-[11px] text-[var(--text-muted)] font-normal">{currentTheme?.name}</span>
                </div>
              </button>
            </div>

            <div className="pt-2 border-t border-[var(--border-subtle)]">
              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] rounded-lg shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Theme Selector Modal */}
      <ThemeModal 
        isOpen={isThemeModalOpen} 
        onClose={() => setIsThemeModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
