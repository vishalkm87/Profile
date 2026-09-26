import React, { useState } from 'react';
import { Layers, Search } from 'lucide-react';
import { PageHeader } from '../components/common';
import { ProjectCard } from '../components/cards';
import { ProjectModal } from '../components/modals';
import { profileData } from '../data/profileData';

export const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const visibleProjects = profileData.projects.filter(
    (p) => p.visible !== false && p.show !== false && !p.hidden
  );

  const categories = ['All', ...new Set(visibleProjects.map(p => p.category))];

  const filteredProjects = visibleProjects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.tags.some(tag => tag.toLowerCase().includes(term));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        icon={Layers}
        title="Key Engagements & Case Studies"
        description="Client case studies, cross-platform applications, and digital transformation initiatives"
      >
        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex-shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[var(--accent-primary)] text-[var(--accent-text)] shadow-sm border border-[var(--accent-primary)]'
                    : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by keyword or stack..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--border-strong)] transition-all"
            />
          </div>
        </div>
      </PageHeader>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={(p) => setActiveModalProject(p)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[var(--bg-surface)] rounded-2xl p-12 text-center border border-[var(--border-subtle)] shadow-[var(--card-shadow)]">
          <p className="text-[var(--text-primary)] font-semibold text-base">
            No engagements matched your query
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchTerm(''); }}
            className="mt-4 px-4 py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] text-xs font-semibold shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Engagement Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
};
