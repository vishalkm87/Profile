import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { MainLayout } from './components/layout';
import { ScrollToTop } from './components/common';
import { AppRoutes } from './routes';
import { profileData } from './data/profileData';

/**
 * Root Application Component
 * Initializes context providers, router shell, scroll manager, and layout.
 * Dynamically toggles copy/paste protection based on security.enableCopyPaste in profileData.json.
 */
export const App = () => {
  useEffect(() => {
    // Dynamically synchronize page title and SEO meta description from profileData.json
    const personal = profileData?.personal;
    if (personal?.name) {
      document.title = `${personal.name}${personal.currentRole ? ` | ${personal.currentRole}` : ' | Portfolio'}`;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && personal?.headline) {
      metaDesc.setAttribute('content', personal.headline);
    }

    // Check copy-paste configuration switch from profileData.json (default: false = protection on)
    const isCopyPasteEnabled = Boolean(profileData.security?.enableCopyPaste);

    if (isCopyPasteEnabled) {
      // Switch is ON -> allow normal copy/paste and text selection
      document.body.classList.remove('copy-disabled');
      return;
    }

    // Switch is OFF -> copy protection active
    document.body.classList.add('copy-disabled');

    const isInputTarget = (target) => {
      if (!target) return false;
      const tag = target.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
    };

    const handleCopy = (e) => {
      if (!isInputTarget(e.target)) {
        e.preventDefault();
      }
    };

    const handleCut = (e) => {
      if (!isInputTarget(e.target)) {
        e.preventDefault();
      }
    };

    const handlePaste = (e) => {
      if (!isInputTarget(e.target)) {
        e.preventDefault();
      }
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('paste', handlePaste);

    return () => {
      document.body.classList.remove('copy-disabled');
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
