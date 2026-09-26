import React, { useState } from 'react';
import { 
  Briefcase, 
  Layers, 
  Cpu, 
  Award,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Hero, MetricsBanner, ExecutiveSummary } from '../components/sections';
import { SectionHeader } from '../components/common';
import { ProjectCard, ExperienceCard } from '../components/cards';
import { ProjectModal, ContactModal } from '../components/modals';
import { profileData } from '../data/profileData';

export const HomePage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const getCertIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />;
      case 'Award':
        return <Award className="w-4 h-4 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />;
    }
  };

  const visibleProjects = profileData.projects.filter(
    (p) => p.visible !== false && p.show !== false && !p.hidden
  );
  const featuredProjects = visibleProjects.slice(0, 3);
  const recentExperiences = profileData.experiences.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Executive Hero Banner Card */}
      <Hero onOpenContactModal={() => setIsContactModalOpen(true)} />

      {/* Career Metrics Banner */}
      <MetricsBanner stats={profileData.stats} />

      {/* Executive Summary */}
      <ExecutiveSummary about={profileData.personal.about} />

      {/* 1. Key Engagements & Case Studies (Matches Navbar #2 Projects) */}
      <div id="projects-section" className="bg-[var(--bg-surface)] rounded-2xl p-5 sm:p-8 border border-[var(--border-subtle)] shadow-[var(--card-shadow)] scroll-mt-24">
        <SectionHeader
          icon={Layers}
          title="Key Engagements & Case Studies"
          description="Featured engineering initiatives, client case studies, and digital transformations"
          action={
            <Link
              to="/projects"
              className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1"
            >
              <span>All engagements ({visibleProjects.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* 2. Career History (Matches Navbar #3 Experience) */}
      <div id="experience-section" className="bg-[var(--bg-surface)] rounded-2xl p-5 sm:p-8 border border-[var(--border-subtle)] shadow-[var(--card-shadow)] scroll-mt-24">
        <SectionHeader
          icon={Briefcase}
          title="Career History"
          description={`${profileData.personal.experienceYears} of professional milestones, technical leadership, and career growth`}
          linkTo="/experience"
          linkLabel="View all positions &rarr;"
        />

        <div className="space-y-2">
          {recentExperiences.map((exp, idx) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              isLast={idx === recentExperiences.length - 1}
            />
          ))}
        </div>
      </div>

      {/* 3. Certifications & Industry Credentials (Matches Navbar #4 Certifications) */}
      <div id="certifications-section" className="bg-[var(--bg-surface)] rounded-2xl p-5 sm:p-8 border border-[var(--border-subtle)] shadow-[var(--card-shadow)] scroll-mt-24">
        <SectionHeader
          icon={Award}
          title="Certifications & Industry Credentials"
          description="Professional credentials, cloud specializations, and industry accreditations"
          linkTo="/education"
          linkLabel={`All certifications (${profileData.certifications.length}) \u2192`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-stretch">
          {profileData.certifications.slice(0, 4).map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] flex flex-col justify-between gap-3 shadow-xs hover:border-[var(--border-strong)] transition-all group h-full"
            >
              <div className="flex items-start gap-2.5">
                {getCertIcon(cert.icon)}
                <h4 
                  className="text-xs sm:text-sm font-bold text-[var(--text-primary)] leading-snug line-clamp-2 min-h-[2.5rem] flex items-center"
                  title={cert.name}
                >
                  {cert.name}
                </h4>
              </div>

              {/* 2nd text: always anchored to bottom, single line with ellipsis */}
              <div 
                className="mt-auto pt-2.5 border-t border-[var(--border-subtle)]/60 min-w-0"
                title={`${cert.issuer} · ${cert.issueDate}`}
              >
                <p className="text-[11px] text-[var(--text-muted)] font-medium truncate transition-all">
                  {cert.issuer} · {cert.issueDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Core Competencies & Toolchains (Matches Navbar #5 Skills & Tools) */}
      <div id="skills-section" className="bg-[var(--bg-surface)] rounded-2xl p-5 sm:p-8 border border-[var(--border-subtle)] shadow-[var(--card-shadow)] scroll-mt-24">
        <SectionHeader
          icon={Cpu}
          title="Core Competencies & Toolchains"
          description="Technical toolchains, frameworks, methodologies, and platforms"
          linkTo="/skills"
          linkLabel="All competencies &rarr;"
        />

        <div className="flex flex-wrap gap-2">
          {profileData.skillCategories.flatMap(c => c.skills).slice(0, 16).map((skill, idx) => (
            <div
              key={idx}
              className="px-3 py-1.5 rounded-lg border border-[var(--pill-border)] bg-[var(--pill-bg)] text-xs sm:text-sm font-medium text-[var(--pill-text)] flex items-center gap-2 shadow-xs"
            >
              <span>{skill.name}</span>
              <span className="text-[10px] text-[var(--text-muted)] font-semibold px-2 py-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                {skill.years}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default HomePage;
