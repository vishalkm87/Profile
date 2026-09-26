import React from 'react';
import { User, Briefcase, Layers, Cpu, Award, Mail } from 'lucide-react';
import { HomePage } from '../pages/HomePage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { ExperiencePage } from '../pages/ExperiencePage';
import { EducationPage } from '../pages/EducationPage';
import { SkillsPage } from '../pages/SkillsPage';
import { ContactPage } from '../pages/ContactPage';

/**
 * Declarative Route Definitions
 * Single source of truth for application routing and navigation menus.
 */
export const routesConfig = [
  {
    path: '/',
    name: 'Overview',
    icon: User,
    element: <HomePage />,
    nav: true,
  },
  {
    path: '/projects',
    name: 'Projects',
    icon: Layers,
    element: <ProjectsPage />,
    nav: true,
  },
  {
    path: '/experience',
    name: 'Experience',
    icon: Briefcase,
    element: <ExperiencePage />,
    nav: true,
  },
  {
    path: '/education',
    name: 'Certifications',
    icon: Award,
    element: <EducationPage />,
    nav: true,
  },
  {
    path: '/skills',
    name: 'Skills & Tools',
    icon: Cpu,
    element: <SkillsPage />,
    nav: true,
  },
  {
    path: '/contact',
    name: 'Contact Us',
    icon: Mail,
    element: <ContactPage />,
    nav: true,
  },
];

export const navRoutes = routesConfig.filter(route => route.nav);

