import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

/**
 * Main application layout.
 * Provides the global sticky Navbar, responsive content container, and Footer.
 */
export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-200">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

