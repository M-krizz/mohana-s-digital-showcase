import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { sections } from '../../config/sections';
import gsap from 'gsap';
import { content } from '../../content';

const HomeUI = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', pointerEvents: 'auto', textAlign: 'center', position: 'relative', height: '100%', justifyContent: 'center' }}>
    <div className="lm">
      <div className="li profile-avatar">
        <img src="/avatar_lofi.png" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
    <h1 className="lm hero-title" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', letterSpacing: '2px' }}>
      <span className="li">{content.profile.name}</span>
    </h1>
    <h3 className="lm" style={{ color: '#48CAE4', fontSize: '1.2rem', margin: '0 0 2rem 0', fontWeight: '400', letterSpacing: '4px', textTransform: 'uppercase' }}>
      <span className="li">AI/ML Engineer & Full-Stack Developer</span>
    </h3>
    <div className="lm" style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      <span className="li">
        <a href={content.profile.linkedin} target="_blank" rel="noreferrer" className="skill-chip" style={{ textDecoration: 'none', padding: '0.8rem 1.5rem' }}>LinkedIn</a>
      </span>
      <span className="li">
        <a href={content.profile.github} target="_blank" rel="noreferrer" className="skill-chip" style={{ textDecoration: 'none', padding: '0.8rem 1.5rem' }}>GitHub</a>
      </span>
      <span className="li">
        <a href={`mailto:${content.profile.email}`} className="skill-chip" style={{ textDecoration: 'none', padding: '0.8rem 1.5rem' }}>Email Hub</a>
      </span>
      <span className="li">
        <a href="#" target="_blank" rel="noreferrer" className="skill-chip" style={{ textDecoration: 'none', padding: '0.8rem 1.5rem' }}>Resume</a>
      </span>
    </div>

    <div className="scroll-indicator" style={{ position: 'absolute', bottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', animation: 'bounce 2s infinite' }}>
      <span style={{ fontSize: '0.8rem', opacity: 0.6, letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll to explore</span>
      <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #48CAE4, transparent)' }}></div>
    </div>
  </div>
);

const NavBar = () => {
  const sectionIndex = useAppStore((state) => state.sectionIndex);
  const setSectionIndex = useAppStore((state) => state.setSectionIndex);
  const isTransitioning = useAppStore((state) => state.isTransitioning);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getLabel = (id) => {
    if (!isMobile) return id === 'contact' ? 'Reach Out' : id;
    switch(id) {
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
          onClick={() => {
            if (!isTransitioning && sectionIndex !== idx) {
              setSectionIndex(idx);
            }
          }}
        >
          {getLabel(sec.id)}
        </a>
      ))}
    </div>
  );
};

const AboutUI = () => (
  <div className="glass-card" style={{ maxWidth: '700px', pointerEvents: 'auto' }}>
    <h2 className="lm" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
      <span className="li">🧠 Intelligence Core</span>
    </h2>
    <div className="lm">
      <p className="li" style={{ lineHeight: '1.8', opacity: 0.9, marginBottom: '2rem', fontSize: '1.1rem' }}>
        {content.objective}
      </p>
    </div>
    
    <div className="about-grid" style={{ display: 'grid', gap: '2rem' }}>
      <div className="lm">
        <div className="li">
          <h4 style={{ color: '#48CAE4', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>Education</h4>
          <p style={{ fontWeight: '700', margin: 0 }}>{content.education.institution}</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>{content.education.degree}</p>
        </div>
      </div>
      <div className="lm">
        <div className="li">
          <h4 style={{ color: '#48CAE4', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>Location</h4>
          <p style={{ fontWeight: '700', margin: 0 }}>{content.profile.location}</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Remote / On-site</p>
        </div>
      </div>
    </div>
  </div>
);

const SkillsUI = () => (
  <div className="glass-card" style={{ maxWidth: '800px', pointerEvents: 'auto' }}>
    <h2 className="lm" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
      <span className="li">🛠️ Tech Stack Engine</span>
    </h2>
    <div className="skills-grid" style={{ display: 'grid', gap: '1.5rem' }}>
      <div>
        <h4 className="lm" style={{ color: '#48CAE4', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}><span className="li">Languages</span></h4>
        <div className="lm">
          <div className="li">
            {content.skills.languages.map(s => <span key={s} className="skill-chip">{s}</span>)}
          </div>
        </div>
      </div>
      <div>
        <h4 className="lm" style={{ color: '#48CAE4', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}><span className="li">Frameworks</span></h4>
        <div className="lm">
          <div className="li">
            {content.skills.librariesFrameworks.map(s => <span key={s} className="skill-chip">{s}</span>)}
          </div>
        </div>
      </div>
      <div>
        <h4 className="lm" style={{ color: '#48CAE4', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}><span className="li">Backend & Data</span></h4>
        <div className="lm">
          <div className="li">
            {content.skills.backendData.map(s => <span key={s} className="skill-chip">{s}</span>)}
          </div>
        </div>
      </div>
      <div>
        <h4 className="lm" style={{ color: '#48CAE4', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}><span className="li">Tools</span></h4>
        <div className="lm">
          <div className="li">
            {content.skills.developerTools.map(s => <span key={s} className="skill-chip">{s}</span>)}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ExperienceUI = () => (
  <div className="glass-card" style={{ maxWidth: '800px', pointerEvents: 'auto', maxHeight: '70vh', overflowY: 'auto' }}>
    <h2 className="lm" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}><span className="li">💼 Experience Log</span></h2>
    {content.experience.map((exp, idx) => (
      <div key={idx} style={{ marginBottom: '2.5rem' }} className="lm">
        <div className="li">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{exp.company}</h3>
            <span style={{ color: '#48CAE4', fontSize: '0.9rem', fontWeight: '700' }}>{exp.duration}</span>
          </div>
          <p style={{ color: '#48CAE4', margin: '0 0 1rem 0', fontWeight: '500' }}>{exp.role}</p>
          <ul style={{ paddingLeft: '1.2rem', fontSize: '1rem', opacity: 0.8, lineHeight: '1.6' }}>
            {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      </div>
    ))}
  </div>
);

const ProjectsUI = ({ onSelect }) => (
  <div className="project-grid">
    {content.projects.map((project, idx) => (
      <div key={idx} className="project-card lm" onClick={() => onSelect(project)} style={{ padding: '1.5rem', minHeight: '190px' }}>
        <div className="li">
          <h3 style={{ margin: 0, fontSize: '1.3rem' }}>{project.title}</h3>
          <p style={{ color: '#48CAE4', fontSize: '0.75rem', margin: '0.4rem 0', fontWeight: '700' }}>
            {project.tech.slice(0, 2).join(' | ')}
          </p>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '0.8rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.3' }}>
            {project.points[0]}
          </p>
          <div style={{ marginTop: '1.2rem', color: '#48CAE4', fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>
            View Intelligence →
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ExpandedProjectOverlay = ({ project, onClose }) => {
  if (!project) return null;
  
  return (
    <div className={`expanded-overlay ${project ? 'active' : ''}`} onClick={onClose}>
      <div className="expanded-card glass-card" onClick={e => e.stopPropagation()} style={{ padding: '2.5rem', maxWidth: '900px' }}>
        <button className="close-btn" style={{ top: '1rem', right: '1.5rem', fontSize: '2rem' }} onClick={onClose}>&times;</button>
        
        <h2 style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{project.title}</h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          {project.tech.map(t => <span key={t} className="skill-chip" style={{ fontSize: '0.75rem', padding: '0.4rem 1rem' }}>{t}</span>)}
        </div>

        <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2.5rem' }}>
          <div>
            <h4 style={{ color: '#48CAE4', textTransform: 'uppercase', marginBottom: '0.8rem', fontSize: '0.85rem', letterSpacing: '2px' }}>Mission Objectives</h4>
            {project.points.slice(0, 4).map((p, i) => (
              <div key={i} className="feature-block" style={{ fontSize: '0.9rem', padding: '0.8rem 1.2rem' }}>{p}</div>
            ))}

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <button className="arch-toggle" style={{ padding: '0.7rem 1.5rem', fontSize: '0.8rem' }}>📂 Source Code</button>
              <button className="arch-toggle" style={{ background: 'transparent', border: '1px solid #48CAE4', color: '#48CAE4', padding: '0.7rem 1.5rem', fontSize: '0.8rem' }}>🧠 Logic Map</button>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#48CAE4', textTransform: 'uppercase', marginBottom: '0.8rem', fontSize: '0.85rem', letterSpacing: '2px' }}>Tactical Impact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div className="impact-chip" style={{ margin: 0, padding: '0.6rem 1.2rem', fontSize: '0.85rem', width: 'fit-content' }}>🚀 Performance: +40%</div>
              <div className="impact-chip" style={{ margin: 0, padding: '0.6rem 1.2rem', fontSize: '0.85rem', width: 'fit-content' }}>⚡ Latency: {'<'} 200ms</div>
              <div className="impact-chip" style={{ margin: 0, padding: '0.6rem 1.2rem', fontSize: '0.85rem', width: 'fit-content' }}>📈 Growth: +25%</div>
            </div>

            {project.title === "Vectra" && (
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(72, 202, 228, 0.05)', borderRadius: '15px', border: '1px solid rgba(72, 202, 228, 0.2)' }}>
                <h5 style={{ margin: 0, color: '#48CAE4', fontSize: '0.9rem', letterSpacing: '1px' }}>System Architecture</h5>
                <button className="arch-toggle" style={{ width: '100%', fontSize: '0.75rem', marginTop: '1rem', padding: '0.6rem' }}>Visualize Nodes</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactUI = () => (
  <div className="glass-card" style={{ maxWidth: '500px', pointerEvents: 'auto', textAlign: 'center' }}>
    <h2 className="lm" style={{ fontSize: '2rem', marginBottom: '2rem' }}><span className="li">📡 Reach Me Out</span></h2>
    <div className="lm">
      <div className="li" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
        <div className="contact-info-row" style={{ display: 'flex', gap: '1rem', width: '100%', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', border: '1px solid rgba(72, 202, 228, 0.1)' }}>
            <p style={{ margin: '0 0 0.5rem 0', color: '#48CAE4', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Direct Email</p>
            <p style={{ fontSize: '0.95rem', margin: 0, fontWeight: '700', wordBreak: 'break-all' }}>{content.profile.email}</p>
          </div>
          <div style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', border: '1px solid rgba(72, 202, 228, 0.1)' }}>
            <p style={{ margin: '0 0 0.5rem 0', color: '#48CAE4', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Mobile Uplink</p>
            <p style={{ fontSize: '0.95rem', margin: 0, fontWeight: '700' }}>{content.profile.mobile}</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={content.profile.linkedin} target="_blank" rel="noreferrer" className="skill-chip" style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href={content.profile.github} target="_blank" rel="noreferrer" className="skill-chip" style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href={`https://wa.me/${content.profile.mobile.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="skill-chip" style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.413-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.308 1.655zm6.79-14.507c-.121-.271-.245-.275-.359-.28l-.304-.006c-.21 0-.551.08-.84.393-.288.311-1.103 1.077-1.103 2.629 0 1.552 1.129 3.051 1.286 3.26.157.21 2.219 3.384 5.374 4.746.751.325 1.336.518 1.792.661.753.239 1.44.205 1.983.124.605-.09 1.847-.754 2.108-1.474.261-.719.261-1.335.184-1.474-.077-.139-.281-.222-.591-.377s-1.847-.911-2.133-1.015c-.286-.105-.494-.157-.702.156-.208.312-.806 1.014-.988 1.222-.182.208-.363.233-.673.078-.31-.155-1.309-.482-2.493-1.538-.921-.822-1.542-1.837-1.722-2.147-.181-.31-.019-.478.136-.632.14-.139.311-.363.466-.544.156-.182.208-.312.311-.519.104-.208.052-.389-.026-.544z"/></svg>
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="skill-chip" style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.558.217.957.477 1.377.896.419.42.679.819.896 1.377.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.217.558-.477.957-.896 1.377-.42.419-.819.679-1.377.896-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.558-.217-.957-.477-1.377-.896-.419-.42-.679-.819-.896-1.377-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.217-.558.477-.957.896-1.377.42-.419.819-.679 1.377-.896.422-.163 1.057-.358 2.227-.412 1.266-.058-1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.337 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.351-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.28-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="skill-chip" style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
          </a>
        </div>
        
        <p style={{ opacity: 0.5, fontSize: '0.8rem', marginTop: '1.5rem' }}>
          {content.profile.location} <br/> 
          Available for Global Research
        </p>
      </div>
    </div>
  </div>
);

export default function Overlay() {
  const sectionIndex = useAppStore((state) => state.sectionIndex);
  const isTransitioning = useAppStore((state) => state.isTransitioning);
  const containerRef = useRef();
  const [renderedIndex, setRenderedIndex] = useState(sectionIndex);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Handle the Fade Out / Scale Up of the OLD section
    gsap.to(containerRef.current, { 
      opacity: 0, 
      scale: 1.5,
      duration: 0.5, 
      ease: 'power2.in',
      onComplete: () => {
        setRenderedIndex(sectionIndex);
        setSelectedProject(null);
        gsap.set(containerRef.current, { scale: 0.8 });
      }
    });
  }, [sectionIndex]);

  useEffect(() => {
    // Handle the Fade In / Scale Down of the NEW section
    if (!isTransitioning) {
      gsap.to(containerRef.current, { 
        opacity: 1, 
        scale: 1,
        duration: 0.8, 
        ease: 'power3.out' 
      });
      
      gsap.fromTo(
        containerRef.current.querySelectorAll('.li'),
        { translateY: '110%' },
        { translateY: '0%', duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, [isTransitioning]);

  const renderContent = () => {
    const currentSection = sections[renderedIndex]?.id;
    
    switch (currentSection) {
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
      <ExpandedProjectOverlay project={selectedProject} onClose={() => setSelectedProject(null)} />
      <div 
        ref={containerRef} 
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none'
        }}
      >
        {renderContent()}
      </div>
    </>
  );
}
