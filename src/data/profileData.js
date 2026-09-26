/**
 * Profile Data Export Layer
 * Single Source of Truth: src/data/profileData.json
 * Automatically calculates total career experience dynamically from experiences array.
 * Filters projects based on "visible": true/false (or "show" / "hidden")
 */
// Load default public template data, or local private override if present (git-ignored)
import defaultProfileData from './profileData.json';

// By default, always load public demo data ("Jane/John Doe").
// Only switch to private data when explicitly requested via --mode private or VITE_USE_LOCAL=true
const isLocalMode = import.meta.env.VITE_USE_LOCAL === 'true' || import.meta.env.MODE === 'private';
const localDataModules = isLocalMode ? import.meta.glob('./profileData.local.json', { eager: true }) : {};
const profileDataJson = localDataModules['./profileData.local.json']?.default || defaultProfileData;

import avatarSvg from '../assets/avatar.svg';
import bannerSvg from '../assets/banner.svg';

const monthMap = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
};

const parseDateString = (str) => {
  if (!str || typeof str !== 'string' || str.trim().toLowerCase() === 'present') {
    return new Date();
  }
  const parts = str.trim().split(/\s+/);
  if (parts.length >= 2) {
    const mStr = parts[0].slice(0, 3).toLowerCase();
    const m = monthMap[mStr] ?? 0;
    const y = parseInt(parts[1], 10);
    return new Date(y, m, 1);
  }
  const y = parseInt(str, 10);
  if (!isNaN(y)) {
    return new Date(y, 0, 1);
  }
  return new Date();
};

/**
 * Calculates total career experience dynamically based on all roles in experiences.
 */
export const calculateCareerStats = (experiences = []) => {
  if (!experiences || experiences.length === 0) {
    return {
      years: 0,
      months: 0,
      totalMonths: 0,
      experienceYears: '0+ Years',
      experienceYearsLower: '0+ years',
      specializationBadge: 'Enterprise Delivery',
    };
  }

  // Find the earliest start date among all career experiences
  let earliest = new Date();
  let hasCurrent = false;
  let latestEnd = new Date(1970, 0, 1);

  experiences.forEach((exp) => {
    if (exp.startDate) {
      const start = parseDateString(exp.startDate);
      if (start < earliest) {
        earliest = start;
      }
    }
    if (exp.current || !exp.endDate || exp.endDate.trim().toLowerCase() === 'present') {
      hasCurrent = true;
    } else if (exp.endDate) {
      const end = parseDateString(exp.endDate);
      if (end > latestEnd) {
        latestEnd = end;
      }
    }
  });

  const endDate = hasCurrent ? new Date() : (latestEnd > earliest ? latestEnd : new Date());

  let totalMonths = (endDate.getFullYear() - earliest.getFullYear()) * 12 + (endDate.getMonth() - earliest.getMonth());
  if (totalMonths < 0) totalMonths = 0;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const experienceYears = `${years}+ Years`;
  const experienceYearsLower = `${years}+ years`;
  const specializationBadge = `${years}+ Years Enterprise Experience`;

  return {
    years,
    months,
    totalMonths,
    experienceYears,
    experienceYearsLower,
    specializationBadge,
    earliestStartDate: earliest,
  };
};

/**
 * Calculates human-readable duration between two date strings (e.g. 'Jul 2026' and 'Present' -> '3 mos')
 */
export const calculateDuration = (startDate, endDate) => {
  if (!startDate) return '';
  const start = parseDateString(startDate);
  const end = parseDateString(endDate);

  const startParts = String(startDate).trim().split(/\s+/);
  const endParts = String(endDate || '').trim().split(/\s+/);
  const isYearOnly =
    startParts.length === 1 &&
    !isNaN(parseInt(startParts[0], 10)) &&
    (endDate?.toLowerCase() === 'present' || (endParts.length === 1 && !isNaN(parseInt(endParts[0], 10))));

  if (isYearOnly && endDate?.toLowerCase() !== 'present') {
    const diffYears = parseInt(endParts[0], 10) - parseInt(startParts[0], 10);
    if (diffYears <= 0) return '1 yr';
    return diffYears === 1 ? '1 yr' : `${diffYears} yrs`;
  }

  let totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;
  if (totalMonths < 1) totalMonths = 1;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'mo' : 'mos'}`);
  return parts.join(' ') || '1 mo';
};

const isProjectVisible = (p) => p.visible !== false && p.show !== false && !p.hidden;

const careerStats = calculateCareerStats(profileDataJson.experiences || []);

const dynamicPersonal = {
  ...profileDataJson.personal,
  avatar: (profileDataJson.personal?.avatar && profileDataJson.personal.avatar !== './avatar.svg')
    ? profileDataJson.personal.avatar
    : avatarSvg,
  coverImage: (profileDataJson.personal?.coverImage && profileDataJson.personal.coverImage !== './banner.svg')
    ? profileDataJson.personal.coverImage
    : bannerSvg,
  email: (profileDataJson.personal?.email || '').replace(/^mailto:/i, '').trim(),
  experienceYears: profileDataJson.personal?.experienceYears || careerStats.experienceYears,
  specializationBadge: profileDataJson.personal?.specializationBadge || careerStats.specializationBadge,
  about: profileDataJson.personal?.about
    ? profileDataJson.personal.about.replace(
        /\b\d+\+?\s+years(\s+of\s+experience)?\b/gi,
        (match) => match.toLowerCase().includes('of experience')
          ? `${careerStats.experienceYearsLower} of experience`
          : careerStats.experienceYearsLower
      )
    : '',
};

const dynamicStats = (profileDataJson.stats || []).map((stat) => {
  if (stat.label === 'Industry Experience') {
    return {
      ...stat,
      value: careerStats.experienceYears,
    };
  }
  return stat;
});

const dynamicExperiences = (profileDataJson.experiences || []).map((exp) => ({
  ...exp,
  duration: exp.duration || calculateDuration(exp.startDate, exp.endDate),
}));

const dynamicProjects = (profileDataJson.projects || []).map((proj) => ({
  ...proj,
  duration: proj.duration || (proj.startDate ? calculateDuration(proj.startDate, proj.endDate) : undefined),
}));

export const profileData = {
  ...profileDataJson,
  security: {
    enableCopyPaste: false,
    ...profileDataJson.security,
  },
  careerStats,
  personal: dynamicPersonal,
  stats: dynamicStats,
  experiences: dynamicExperiences,
  projects: dynamicProjects.filter(isProjectVisible),
  allProjects: dynamicProjects,
};

export default profileData;
