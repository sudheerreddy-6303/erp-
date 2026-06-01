import React, { useState } from 'react';
import { openSafely } from '../utils/safeUrl';

export default function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const isLive = project.status === 'live';

  const handleClick = () => {
    // openSafely validates the protocol (https only) and severs
    // window.opener before navigating — bad URLs are blocked.
    if (isLive && project.url) openSafely(project.url);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: '#FFFFFF',
        border: hovered && isLive
          ? `1.5px solid ${project.accent}`
          : '1.5px solid #E2E8F0',
        borderRadius: 20,
        padding: 0,
        cursor: isLive ? 'pointer' : 'default',
        opacity: isLive ? 1 : 0.6,
        transform: hovered && isLive ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered && isLive
          ? `0 16px 40px rgba(11,37,69,0.13)`
          : '0 2px 8px rgba(11,37,69,0.06)',
        transition: 'all 0.22s ease',
        animation: `fadeUp 0.4s ease both`,
        animationDelay: `${index * 75}ms`,
        overflow: 'hidden',
      }}
    >
      {/* Colored top strip */}
      <div style={{
        height: 5,
        background: isLive
          ? project.accent
          : '#CBD5E1',
        width: '100%',
        transition: 'background 0.2s',
      }} />

      <div style={{ padding: '1.35rem 1.35rem 1.2rem' }}>
        {/* Icon + tag row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: project.accentLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${project.accent}22`,
          }}>
            <i className={`ti ${project.icon}`} style={{ fontSize: 26, color: project.accent }} />
          </div>

          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 0.7,
            textTransform: 'uppercase',
            color: project.accent,
            background: project.accentLight,
            padding: '4px 10px',
            borderRadius: 20,
            border: `1px solid ${project.accent}25`,
          }}>
            {project.tag}
          </span>
        </div>

        {/* Name */}
        <div style={{
          fontSize: 16, fontWeight: 700,
          color: '#0B2545',
          marginBottom: 6,
          fontFamily: 'Outfit, sans-serif',
          letterSpacing: -0.3,
        }}>
          {project.name}
        </div>

        {/* Description */}
        <div style={{
          fontSize: 13, color: '#64748B',
          lineHeight: 1.6, marginBottom: '1.1rem',
        }}>
          {project.description}
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: isLive ? '#16A34A' : '#D97706',
              display: 'inline-block',
              boxShadow: isLive ? '0 0 0 3px rgba(22,163,74,0.18)' : '0 0 0 3px rgba(217,119,6,0.18)',
            }} />
            <span style={{
              fontSize: 12, fontWeight: 600,
              color: isLive ? '#16A34A' : '#D97706',
            }}>
              {isLive ? 'Live' : 'Coming Soon'}
            </span>
          </div>

          {isLive && (
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: hovered ? project.accent : project.accentLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s ease',
              border: `1px solid ${project.accent}30`,
            }}>
              <i className="ti ti-arrow-up-right" style={{
                fontSize: 17,
                color: hovered ? '#fff' : project.accent,
                transition: 'color 0.2s ease',
              }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
