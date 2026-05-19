import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { sections } from '../../config/sections';
import gsap from 'gsap';
import { content } from '../../content';

/* ─── COPY TOAST ─── */
function CopyToast({ message, visible }) {
  return <div className={`copy-toast ${visible ? 'show' : ''}`}>{message}</div>;
}

/* ─── SECTION PROGRESS DOTS ─── */
function SectionProgress() {
  const sectionIndex = useAppStore((s) => s.sectionIndex);
  const setSectionIndex = useAppStore((s) => s.setSectionIndex);
  const isTransitioning = useAppStore((s) => s.isTransitioning);

  return (
    <div className="section-progress">
      {sections.map((sec, idx) => (
        <div
          key={sec.id}
          className={`progress-dot ${sectionIndex === idx ? 'active' : ''}`}
          title={sec.id}
          onClick={() => { if (!isTransitioning && sectionIndex !== idx) setSectionIndex(idx); }}
        />
      ))}
    </div>
  );
}

/* ─── LETTERBOX ─── */
function Letterbox({ active }) {
  return (
    <>
      <div className={`letterbox-top ${active ? 'active' : ''}`} />
      <div className={`letterbox-bottom ${active ? 'active' : ''}`} />
    </>
  );
}

/* ─── SECTION LABEL ─── */
function SectionLabel() {
  const sectionIndex = useAppStore((s) => s.sectionIndex);
  const id = sections[sectionIndex]?.id || '';
  return <div className="section-label">{id}</div>;
}

/* ─── HOME HERO ─── */
const HomeUI = () => {
  const subtitleRef = useRef(null);
  const fullText = 'AI/ML Engineer & Full-Stack Developer';

  useEffect(() => {
    if (!subtitleRef.current) return;
    const el = subtitleRef.current;
    el.innerHTML = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        el.innerHTML = fullText.slice(0, i + 1) + '<span class="typing-cursor"></span>';
        i++;
      } else {
        el.innerHTML = fullText + '<span class="typing-cursor"></span>';
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', pointerEvents: 'auto', textAlign: 'center', position: 'relative', height: '100%', justifyContent: 'center' }}>
      <div className="lm">
        <div className="li" style={{ position: 'relative', display: 'inline-block' }}>
          <div className="avatar-ring" />
          <div className="avatar-ring" />
          <div className="profile-avatar">
            <img src="/avatar_lofi.png" alt="Mohana Krishnan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
      <h1 className="hero-title" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', animation: 'fadeInUp 1s ease-out forwards' }}>
        {content.profile.name}
      </h1>
      <h3 className="lm hero-subtitle">
        <span className="li" ref={subtitleRef}></span>
      </h3>
      {content.profile.currentRole && (
        <div className="lm" style={{ marginBottom: '1.5rem' }}>
          <span className="li hero-current-role">⚡ {content.profile.currentRole}</span>
        </div>
      )}
      <div className="lm" style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <span className="li">
          <a href={content.profile.linkedin} target="_blank" rel="noreferrer" className="skill-chip" style={{ textDecoration: 'none', padding: '0.8rem 1.5rem' }}>LinkedIn</a>
        </span>
        <span className="li">
          <a href={content.profile.github} target="_blank" rel="noreferrer" className="skill-chip" style={{ textDecoration: 'none', padding: '0.8rem 1.5rem' }}>GitHub</a>
        </span>
        <span className="li">
          <a href={`mailto:${content.profile.email}`} className="skill-chip" style={{ textDecoration: 'none', padding: '0.8rem 1.5rem' }}>Email</a>
        </span>
        <span className="li">
          <a href="/Mohana_Krishnan_MV_Resume.pdf" download className="skill-chip" style={{ textDecoration: 'none', padding: '0.8rem 1.5rem' }}>Resume ↓</a>
        </span>
      </div>
      <div className="scroll-indicator" style={{ position: 'absolute', bottom: '50px' }}>
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </div>
  );
};

/* ─── NAVBAR ─── */
const NavBar = () => {
  const sectionIndex = useAppStore((s) => s.sectionIndex);
  const setSectionIndex = useAppStore((s) => s.setSectionIndex);
  const isTransitioning = useAppStore((s) => s.isTransitioning);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 900);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const getLabel = (id) => {
    if (!isMobile) return id === 'contact' ? 'Reach Out' : id;
    switch (id) {
      case 'experience': return 'Exp';
      case 'projects': return 'Work';
      case 'contact': return 'Reach';
      default: return id;
    }
  };

  return (
    <div className="navbar-container" style={{ pointerEvents: 'auto' }}>
      {sections.map((sec, idx) => (
        <a
          key={sec.id}
          className={`nav-link ${sectionIndex === idx ? 'active' : ''}`}
          onClick={() => { if (!isTransitioning && sectionIndex !== idx) setSectionIndex(idx); }}
        >
          {getLabel(sec.id)}
        </a>
      ))}
    </div>
  );
};

/* ─── ABOUT ─── */
const AboutUI = () => (
  <div className="glass-card ambient-breathe" style={{ maxWidth: '750px', pointerEvents: 'auto' }}>
    <h2 className="lm" style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>
      <span className="li">Who I Am</span>
    </h2>
    {/* Stats Row */}
    <div className="lm">
      <div className="li stats-row">
        {content.profile.stats.map((s) => (
          <div key={s.label} className="stat-card">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="lm">
      <p className="li" style={{ lineHeight: '1.8', opacity: 0.85, marginBottom: '2rem', fontSize: '1.02rem' }}>
        {content.objective}
      </p>
    </div>
    <div className="about-grid">
      <div className="lm">
        <div className="li about-info-block">
          <h4 style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>Education</h4>
          <p style={{ fontWeight: '700', margin: 0 }}>{content.education.institution}</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>{content.education.degree}</p>
          <p style={{ fontSize: '0.85rem', opacity: 0.5, marginTop: '0.3rem' }}>CGPA: {content.education.cgpa} | {content.education.graduation}</p>
        </div>
      </div>
      <div className="lm">
        <div className="li about-info-block">
          <h4 style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>Location</h4>
          <p style={{ fontWeight: '700', margin: 0 }}>{content.profile.location}</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Remote / On-site</p>
        </div>
      </div>
    </div>
    {/* Coursework */}
    <div className="lm" style={{ marginTop: '1.5rem' }}>
      <div className="li">
        <h4 style={{ textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '0.6rem', color: 'var(--sec-color)' }}>Relevant Coursework</h4>
        <div>{content.education.coursework.map((c) => <span key={c} className="skill-chip" style={{ fontSize: '0.72rem', padding: '0.3rem 0.8rem' }}>{c}</span>)}</div>
      </div>
    </div>
  </div>
);

/* ─── SKILLS ─── */
const SkillsUI = () => (
  <div className="glass-card ambient-breathe" style={{ maxWidth: '800px', pointerEvents: 'auto' }}>
    <h2 className="lm" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
      <span className="li">Stack</span>
    </h2>
    <div className="skills-grid">
      {[
        { label: 'Languages', items: content.skills.languages },
        { label: 'Frameworks', items: content.skills.librariesFrameworks },
        { label: 'Backend & Data', items: content.skills.backendData },
        { label: 'Tools', items: content.skills.developerTools },
      ].map((cat) => (
        <div key={cat.label}>
          <h4 className="lm" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.8rem' }}>
            <span className="li">{cat.label}</span>
          </h4>
          <div className="lm">
            <div className="li">
              {cat.items.map((s) => <span key={s} className="skill-chip">{s}</span>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── EXPERIENCE ─── */
const ExperienceUI = () => (
  <div className="glass-card ambient-breathe" style={{ maxWidth: '800px', pointerEvents: 'auto', maxHeight: '72vh', overflowY: 'auto' }}>
    <h2 className="lm" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}><span className="li">Work History</span></h2>
    <div className="timeline">
      {content.experience.map((exp, idx) => (
        <div key={idx} className="timeline-item lm">
          <div className="li">
            <div className="timeline-dot" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{exp.company}</h3>
                <p style={{ color: 'var(--sec-color)', margin: '0.2rem 0 0', fontWeight: '600', fontSize: '0.9rem' }}>{exp.role}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="exp-badge">{exp.duration}</span>
                <p style={{ fontSize: '0.75rem', opacity: 0.5, margin: '0.3rem 0 0' }}>{exp.location}</p>
              </div>
            </div>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.92rem', opacity: 0.85, lineHeight: '1.7', marginTop: '0.8rem' }}>
              {exp.achievements.map((a, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{a}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── PROJECTS ─── */
const ProjectsUI = ({ onSelect }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const localRef = useRef(null);

  useEffect(() => {
    if (!localRef.current) return;
    gsap.fromTo(
      localRef.current.querySelectorAll('.li'),
      { translateY: '110%', opacity: 0 },
      { translateY: '0%', opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
    );
  }, [activeCategory]);

  if (!activeCategory) {
    return (
      <div className="category-grid" ref={localRef}>
        {content.projectCategories.map((cat, idx) => (
          <div key={idx} className="category-card lm" onClick={() => setActiveCategory(cat)}>
            <div className="li" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{cat.icon}</div>
              <h3 style={{ margin: 0, fontSize: '1.4rem', lineHeight: 1.3 }}>{cat.title}</h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.8rem', lineHeight: '1.5' }}>
                {cat.description}
              </p>
              <div style={{ marginTop: '1.2rem', color: 'var(--sec-color)', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                View Projects →
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={localRef} style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', pointerEvents: 'auto' }}>
      <button 
        onClick={() => setActiveCategory(null)}
        style={{ alignSelf: 'flex-start', background: 'transparent', border: 'none', color: 'var(--sec-color)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', cursor: 'pointer', marginBottom: '1.5rem', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'opacity 0.2s' }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        ← Back to Categories
      </button>
      <div className="project-grid">
        {activeCategory.projects.map((project, idx) => (
          <div key={idx} className="project-card lm" onClick={() => onSelect(project)}>
            <div className="li">
              <span className="project-index">{String(idx + 1).padStart(2, '0')}</span>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{project.icon}</div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', lineHeight: 1.3 }}>{project.title}</h3>
              <p style={{ color: 'var(--sec-color)', fontSize: '0.7rem', margin: '0.5rem 0', fontWeight: '700', letterSpacing: '1px' }}>
                {project.tech.slice(0, 3).join(' · ')}
              </p>
              <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.4rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                {project.points[0]}
              </p>
              <div style={{ marginTop: '1rem', color: 'var(--sec-color)', fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Explore →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── EXPANDED PROJECT ─── */
const ExpandedProjectOverlay = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <div className={`expanded-overlay ${project ? 'active' : ''}`} onClick={onClose}>
      <div className="expanded-card glass-card" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem', maxWidth: '900px' }}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        {/* Project Hero Image / Mockup Area */}
        <div className="project-hero" style={{ height: '220px', borderRadius: '16px', marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(var(--sec-rgb), 0.2), rgba(0,0,0,0.5))', border: '1px solid rgba(var(--sec-rgb), 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          <div style={{ fontSize: '5rem', opacity: 0.8, transform: 'scale(1.2)', filter: 'drop-shadow(0 0 20px rgba(var(--sec-rgb), 0.5))' }}>{project.icon}</div>
        </div>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.8rem', paddingRight: '2rem' }}>{project.title}</h2>
        <div style={{ marginBottom: '1.5rem' }}>
          {project.tech.map((t) => <span key={t} className="skill-chip" style={{ fontSize: '0.72rem', padding: '0.35rem 0.9rem' }}>{t}</span>)}
        </div>
        <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2.5rem' }}>
          <div>
            <h4 style={{ color: 'var(--sec-color)', textTransform: 'uppercase', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>Key Highlights</h4>
            {project.points.slice(0, 4).map((p, i) => (
              <div key={i} className="feature-block">{p}</div>
            ))}
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="arch-toggle" style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem' }}>
                  📂 Source Code
                </a>
              )}
            </div>
          </div>
          <div>
            <h4 style={{ color: 'var(--sec-color)', textTransform: 'uppercase', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>Impact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {(project.impact || []).map((item, i) => (
                <div key={i} className="impact-chip" style={{ margin: 0 }}>✦ {item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── CONTACT ─── */
const ContactUI = () => {
  const [toast, setToast] = useState({ visible: false, message: '' });

  const copyToClipboard = useCallback((text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setToast({ visible: true, message: `${label} copied!` });
      setTimeout(() => setToast({ visible: false, message: '' }), 2000);
    });
  }, []);

  return (
    <>
      <div className="glass-card ambient-breathe" style={{ maxWidth: '500px', pointerEvents: 'auto', textAlign: 'center' }}>
        <h2 className="lm" style={{ fontSize: '2rem', marginBottom: '0.8rem' }}><span className="li">Let's Talk</span></h2>
        <div className="lm" style={{ marginBottom: '1.5rem' }}>
          <div className="li availability-badge">
            <span className="avail-dot" />
            Open to Internships & Collaborations
          </div>
        </div>
        <div className="lm">
          <div className="li" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <div className="contact-info-row" style={{ display: 'flex', gap: '1rem', width: '100%', marginBottom: '1rem' }}>
              <div
                className="contact-tile"
                onClick={() => copyToClipboard(content.profile.email, 'Email')}
                title="Click to copy"
              >
                <p style={{ margin: '0 0 0.3rem', color: 'var(--sec-color)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Email</p>
                <p style={{ fontSize: '0.9rem', margin: 0, fontWeight: '700', wordBreak: 'break-all' }}>{content.profile.email}</p>
              </div>
              <div
                className="contact-tile"
                onClick={() => copyToClipboard(content.profile.mobile, 'Phone')}
                title="Click to copy"
              >
                <p style={{ margin: '0 0 0.3rem', color: 'var(--sec-color)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Phone</p>
                <p style={{ fontSize: '0.9rem', margin: 0, fontWeight: '700' }}>{content.profile.mobile}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { href: content.profile.linkedin, icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /> },
                { href: content.profile.github, icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /> },
                { href: `mailto:${content.profile.email}`, icon: <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /> },
                { href: `/Mohana_Krishnan_MV_Resume.pdf`, icon: <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />, download: true },
              ].map((item, i) => (
                <a key={i} href={item.href} target={item.download ? undefined : '_blank'} rel={item.download ? undefined : 'noreferrer'} download={item.download || undefined} className="skill-chip social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">{item.icon}</svg>
                </a>
              ))}
            </div>
            <p style={{ opacity: 0.4, fontSize: '0.75rem', marginTop: '1rem' }}>
              {content.profile.location}<br />Available for Opportunities Worldwide
            </p>
          </div>
        </div>
      </div>
      <CopyToast message={toast.message} visible={toast.visible} />
    </>
  );
};

/* ─── FOOTER ─── */
function Footer() {
  return (
    <div className="site-footer" style={{ pointerEvents: 'auto' }}>
      <span>© 2026 Mohana Krishnan M V</span>
      <span className="footer-dot">·</span>
      <span>Built with React + Three.js</span>
    </div>
  );
}

/* ─── MAIN OVERLAY ─── */
export default function Overlay() {
  const sectionIndex = useAppStore((s) => s.sectionIndex);
  const isTransitioning = useAppStore((s) => s.isTransitioning);
  const containerRef = useRef();
  const [renderedIndex, setRenderedIndex] = useState(sectionIndex);
  const [selectedProject, setSelectedProject] = useState(null);

  // Apply section theme to root element
  useEffect(() => {
    const id = sections[sectionIndex]?.id || 'home';
    document.documentElement.setAttribute('data-section', id);
  }, [sectionIndex]);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.4,
      filter: 'blur(8px)',
      duration: 0.45,
      ease: 'power2.in',
      onComplete: () => {
        setRenderedIndex(sectionIndex);
        setSelectedProject(null);
        gsap.set(containerRef.current, { scale: 0.85, filter: 'blur(6px)' });
      },
    });
  }, [sectionIndex]);

  useEffect(() => {
    if (!containerRef.current || isTransitioning) return;
    gsap.to(containerRef.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.7,
      ease: 'power3.out',
    });
    gsap.fromTo(
      containerRef.current.querySelectorAll('.li'),
      { translateY: '110%', opacity: 0 },
      { translateY: '0%', opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
    );
  }, [isTransitioning]);

  const renderContent = () => {
    const id = sections[renderedIndex]?.id;
    switch (id) {
      case 'home': return <HomeUI />;
      case 'about': return <AboutUI />;
      case 'skills': return <SkillsUI />;
      case 'experience': return <ExperienceUI />;
      case 'projects': return <ProjectsUI onSelect={setSelectedProject} />;
      case 'contact': return <ContactUI />;
      default: return null;
    }
  };

  return (
    <>
      <NavBar />
      <SectionProgress />
      <SectionLabel />
      <Footer />
      <Letterbox active={isTransitioning} />
      <ExpandedProjectOverlay project={selectedProject} onClose={() => setSelectedProject(null)} />
      <div
        ref={containerRef}
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        {renderContent()}
      </div>
    </>
  );
}
