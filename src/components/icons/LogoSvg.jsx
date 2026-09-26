import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { profileData } from '../../data/profileData';

/**
 * Universal Dynamic Architectural SVG Logo
 * 
 * Features:
 * - Dynamic Radiant Multi-stop Jewel Gradient (Adapts vibrantly to theme)
 * - Precision Dynamic Monogram: Auto-derives from profileData.json (or props)
 * - Smooth Live Orbital Blueprint Ring with Active Satellite Node
 * - Pulsing Real-time Status Radar Beacon
 * - Micro-specular glass reflection for 3D depth and luxury tech aesthetic
 */
export const LogoSvg = ({ className = "w-10 h-10", monogram }) => {
  const { currentTheme } = useTheme();

  // Dynamically resolve active monogram: prop > personal.monogram > initials from name > fallback 'P'
  const activeMonogram = (
    monogram ||
    profileData?.personal?.monogram ||
    (profileData?.personal?.name
      ? profileData.personal.name
          .split(' ')
          .filter(Boolean)
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
      : 'P')
  ).toUpperCase();

  // Vibrant theme-aware color mapping for all bespoke themes
  const getThemePalette = () => {
    const id = currentTheme?.id;

    switch (id) {
      case 'pastel-ocean':
        return {
          from: '#0f172a',
          via: '#0284c7',
          to: '#38bdf8',
          beaconCore: '#38bdf8',
          beaconRing: '#0284c7',
          dropGlow: 'rgba(56, 189, 248, 0.4)'
        };
      case 'pastel-sky':
        return {
          from: '#0284c7',
          via: '#2563eb',
          to: '#38bdf8',
          beaconCore: '#0284c7',
          beaconRing: '#38bdf8',
          dropGlow: 'rgba(2, 132, 199, 0.4)'
        };
      case 'pastel-forest':
        return {
          from: '#064e3b',
          via: '#059669',
          to: '#4ade80',
          beaconCore: '#4ade80',
          beaconRing: '#059669',
          dropGlow: 'rgba(74, 222, 128, 0.4)'
        };
      case 'pastel-mint':
        return {
          from: '#134e4a',
          via: '#0d9488',
          to: '#2dd4bf',
          beaconCore: '#2dd4bf',
          beaconRing: '#0d9488',
          dropGlow: 'rgba(45, 212, 191, 0.4)'
        };
      case 'pastel-sage':
        return {
          from: '#14532d',
          via: '#16a34a',
          to: '#86efac',
          beaconCore: '#86efac',
          beaconRing: '#16a34a',
          dropGlow: 'rgba(34, 197, 94, 0.4)'
        };
      case 'dark':
        return {
          from: '#0f172a',
          via: '#1e40af',
          to: '#38bdf8',
          beaconCore: '#38bdf8',
          beaconRing: '#2563eb',
          dropGlow: 'rgba(56, 189, 248, 0.45)'
        };
      case 'light':
      default:
        return {
          from: '#1e3a8a',
          via: '#2563eb',
          to: '#60a5fa',
          beaconCore: '#60a5fa',
          beaconRing: '#2563eb',
          dropGlow: 'rgba(37, 99, 235, 0.4)'
        };
    }
  };

  const palette = getThemePalette();

  // Dynamic font sizing based on monogram length
  const fontSize = activeMonogram.length > 2 ? '13' : activeMonogram.length === 2 ? '16' : '19';
  const letterSpacing = activeMonogram.length > 1 ? '-0.5' : '0';

  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className} group select-none`}
      style={{ filter: `drop-shadow(0 3px 8px ${palette.dropGlow})` }}
    >
      <svg 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-all duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Radiant Jewel Base Gradient */}
          <linearGradient id="logoVibrantGrad" x1="2" y1="2" x2="46" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={palette.from} />
            <stop offset="55%" stopColor={palette.via} />
            <stop offset="100%" stopColor={palette.to} />
          </linearGradient>

          {/* Diagonal Glass Reflection Highlight */}
          <linearGradient id="logoGlassHighlight" x1="0" y1="0" x2="48" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* High-contrast Monogram Depth Shadow */}
          <filter id="logoTextShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.45" />
          </filter>

          {/* Satellite Beacon Radial Glow */}
          <filter id="logoBeaconGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Dynamic Embedded Animations */}
          <style>{`
            @keyframes logoSpinOrbit {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes logoPulseRadar {
              0% { transform: scale(0.85); opacity: 0.9; }
              50% { transform: scale(1.6); opacity: 0.15; }
              100% { transform: scale(0.85); opacity: 0.9; }
            }
            .logo-orbit-ring {
              transform-origin: 24px 24px;
              animation: logoSpinOrbit 14s linear infinite;
            }
            .group:hover .logo-orbit-ring {
              animation-duration: 5s;
            }
            .logo-beacon-radar {
              transform-origin: 38px 10px;
              animation: logoPulseRadar 2.2s ease-in-out infinite;
            }
          `}</style>
        </defs>

        {/* 1. Vibrant Squircle Foundation */}
        <rect 
          x="2.5" 
          y="2.5" 
          width="43" 
          height="43" 
          rx="12.5" 
          fill="url(#logoVibrantGrad)" 
          stroke="rgba(255, 255, 255, 0.35)" 
          strokeWidth="1.2"
        />

        {/* 2. Glassmorphic Specular Top Sheen */}
        <path 
          d="M 2.5 15 C 2.5 8.096 8.096 2.5 15 2.5 L 33 2.5 C 39.904 2.5 45.5 8.096 45.5 15 L 45.5 22 C 34 26 14 22 2.5 17 Z" 
          fill="url(#logoGlassHighlight)" 
        />

        {/* 3. Concentric Blueprint Lattice & Live Orbit Ring */}
        <g className="logo-orbit-ring">
          <circle 
            cx="24" 
            cy="24" 
            r="17" 
            stroke="rgba(255, 255, 255, 0.3)" 
            strokeWidth="1.2" 
            strokeDasharray="6 4 14 4"
            fill="none"
          />
          {/* Active Cloud Satellite Node */}
          <circle 
            cx="41" 
            cy="24" 
            r="2.2" 
            fill="#ffffff" 
            filter="url(#logoBeaconGlow)" 
          />
        </g>

        {/* 4. Precision Dynamic Architectural Monogram (Centered & Theme-Adapted) */}
        <text
          x="24"
          y="25.5"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#ffffff"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="800"
          fontSize={fontSize}
          letterSpacing={letterSpacing}
          filter="url(#logoTextShadow)"
          className="select-none pointer-events-none"
        >
          {activeMonogram}
        </text>

        {/* 5. Live Architecture Leadership Beacon (Top-Right Status Node) */}
        <circle 
          cx="38" 
          cy="10" 
          r="4" 
          fill={palette.beaconRing} 
          className="logo-beacon-radar" 
        />
        <circle 
          cx="38" 
          cy="10" 
          r="2.2" 
          fill={palette.beaconCore} 
          stroke="#ffffff" 
          strokeWidth="0.9" 
        />
      </svg>
    </div>
  );
};

export default LogoSvg;
