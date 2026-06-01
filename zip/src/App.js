import React, { useState } from 'react';
import ProjectCard from './components/ProjectCard';
import projects from './projects';

const LOGO = 'https://img1.wsimg.com/isteam/ip/e7e3142b-3f26-4173-bc29-b2315178edb8/DI%20logo%20(2).png/:/rs=w:559,h:192,cg:true,m/cr=w:559,h:192/qt=q:95';

export default function App() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const liveCount   = projects.filter(p => p.status === 'live').length;
  const soonCount   = projects.filter(p => p.status === 'coming_soon').length;

  const filtered = projects.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(q)
      || p.description.toLowerCase().includes(q)
      || p.tag.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#F4F6FA' }}>

      {/* ── WHITE NAVBAR ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: 70,
        background: '#FFFFFF',
        borderBottom: '1.5px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 2px 12px rgba(11,37,69,0.06)',
      }}>
        <img
          src={LOGO}
          alt="DI Logo"
          style={{ height: 40, objectFit: 'contain' }}
          onError={e => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback if logo fails to load */}
        <div style={{
          display: 'none', alignItems: 'center', gap: 10,
          fontFamily: 'Outfit, sans-serif', fontWeight: 900,
          fontSize: 22, color: '#0B2545',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 9,
            background: '#0B2545', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: '#E8621A', fontSize: 16, fontWeight: 900,
          }}>DI</div>
          <span>Dynamic Infra</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748B', fontWeight: 500 }}>
            <i className="ti ti-layout-grid" style={{ fontSize: 16, color: '#0B2545' }} />
            ERP Portal
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#0B2545', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <i className="ti ti-user" style={{ fontSize: 17, color: '#fff' }} />
          </div>
        </div>
      </nav>

      {/* ── HERO BANNER ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0B2545 0%, #1A3A6B 100%)',
        padding: '3rem 2.5rem 2.5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative orange arc */}
        <div style={{
          position: 'absolute', right: -60, top: -60,
          width: 280, height: 280, borderRadius: '50%',
          border: '40px solid rgba(232,98,26,0.18)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 80, bottom: -80,
          width: 180, height: 180, borderRadius: '50%',
          background: 'rgba(232,98,26,0.08)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(232,98,26,0.15)', border: '1px solid rgba(232,98,26,0.35)',
            borderRadius: 30, padding: '4px 14px', marginBottom: '1rem',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#E8621A', display: 'inline-block' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8621A', letterSpacing: 0.4 }}>
              {liveCount} live · {soonCount} coming soon
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(26px, 4vw, 42px)',
            fontWeight: 900, color: '#FFFFFF',
            letterSpacing: -0.8, lineHeight: 1.15,
            marginBottom: '0.6rem',
          }}>
            Your Business,{' '}
            <span style={{ color: '#E8621A' }}>One Dashboard</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginBottom: '2rem', maxWidth: 420 }}>
            Access all modules and tools from a single place.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { label: 'Total Modules', value: projects.length, icon: 'ti-apps', color: '#fff' },
              { label: 'Live Now',       value: liveCount,        icon: 'ti-rocket',   color: '#E8621A' },
              { label: 'Coming Soon',    value: soonCount,        icon: 'ti-clock',    color: '#94A3B8' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 14, padding: '0.75rem 1.25rem',
                display: 'flex', alignItems: 'center', gap: 10,
                backdropFilter: 'blur(8px)',
              }}>
                <i className={`ti ${s.icon}`} style={{ fontSize: 20, color: s.color }} />
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: s.color, lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SEARCH + FILTER ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '1.75rem 2rem 0' }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <i className="ti ti-search" style={{
              position: 'absolute', left: 13, top: '50%',
              transform: 'translateY(-50%)', color: '#94A3B8',
              fontSize: 16, pointerEvents: 'none',
            }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search modules, tags..."
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.65rem',
                borderRadius: 12,
                border: '1.5px solid #E2E8F0',
                background: '#fff',
                color: '#0B2545',
                fontSize: 14,
                outline: 'none',
              }}
            />
          </div>

          {[
            { key: 'all',          label: 'All Modules' },
            { key: 'live',         label: 'Live' },
            { key: 'coming_soon',  label: 'Coming Soon' },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{
              padding: '0.65rem 1.15rem',
              borderRadius: 12, fontSize: 13, fontWeight: 600,
              border: filter === f.key ? '1.5px solid #0B2545' : '1.5px solid #E2E8F0',
              background: filter === f.key ? '#0B2545' : '#fff',
              color: filter === f.key ? '#fff' : '#64748B',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '1.5rem 2rem 4rem' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#94A3B8', padding: '4rem', fontSize: 14 }}>
            <i className="ti ti-search-off" style={{ fontSize: 32, display: 'block', marginBottom: 10 }} />
            No modules match your search.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 18,
          }}>
            {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        )}

        {/* <p style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: 12, color: '#CBD5E1' }}>
          To add a project, edit{' '}
          <code style={{ background: '#E2E8F0', padding: '2px 6px', borderRadius: 4, color: '#64748B', fontSize: 11 }}>
            src/projects.js
          </code>
        </p> */}
      </div>
    </div>
  );
}
