import React, { useMemo, useState } from 'react';
import { Edges, Html, Text } from '@react-three/drei';
import { content } from '../content';
import { sections } from '../config/sections';
import { useSketchTexture } from '../utils/sketchTextures';

const stripHtml = (value) => value.replace(/<[^>]*>/g, '').trim();

const sectionCopy = {
  home: {
    title: content.profile.name,
    body: `${content.profile.role} based in ${content.profile.location}.`,
    items: [
      { title: 'Role', value: content.profile.role },
      { title: 'Location', value: content.profile.location },
      { title: 'Email', value: content.profile.email },
      { title: 'Phone', value: content.profile.phone },
    ],
    actions: [
      { label: 'Email', href: `mailto:${content.profile.email}` },
      { label: 'GitHub', href: content.profile.github },
      { label: 'LinkedIn', href: content.profile.linkedin },
      { label: 'Resume', href: content.profile.resume, download: true },
    ],
  },
  about: {
    title: 'About',
    body: stripHtml(content.about.body[0]),
    items: content.about.body.slice(1).map((line) => ({ body: stripHtml(line) })),
  },
  skills: {
    title: 'Skills',
    body: 'A focused toolkit across ML, full-stack engineering, and product systems.',
    items: content.skills.map((skill) => ({
      title: skill.name,
      meta: skill.category,
      value: `${skill.level}%`,
    })),
  },
  projects: {
    title: 'Projects',
    body: 'Selected work across machine learning, platform tooling, and product builds.',
    items: content.projects.map((project) => ({
      title: project.title,
      meta: project.year,
      tags: project.tags,
      href: project.link,
    })),
    actions: [
      { label: 'All Work', href: content.profile.github },
    ],
  },
  experience: {
    title: 'Experience',
    body: 'From research initiatives to production deployments that ship reliably.',
    items: content.process.map((step) => ({
      title: `${step.label} - ${step.title}`,
      meta: `Step ${step.id}`,
      body: step.text,
    })),
  },
  contact: {
    title: 'Contact',
    body: content.contact.availability,
    items: [
      { title: 'Email', value: content.profile.email },
      { title: 'Phone', value: content.profile.phone },
      { title: 'Location', value: content.profile.location },
    ],
    actions: [
      { label: 'Email', href: `mailto:${content.profile.email}` },
      { label: 'GitHub', href: content.profile.github },
      { label: 'LinkedIn', href: content.profile.linkedin },
      { label: 'Resume', href: content.profile.resume, download: true },
    ],
  },
};

const skillCategories = Array.from(new Set(content.skills.map((skill) => skill.category)));

const ideaIcons = [
  { label: 'Design Tool', code: 'D', tone: 'yellow' },
  { label: 'Code Editor', code: 'C', tone: 'blue' },
  { label: 'Research', code: 'R', tone: 'green' },
];

const actionIcons = [
  { label: 'Define Goals', code: 'G', tone: 'purple' },
  { label: 'Launch', code: 'L', tone: 'orange' },
  { label: 'Feedback', code: 'F', tone: 'pink' },
];

const modulesBySection = {
  home: {
    modules: [
      {
        title: 'Module 1: Key Concepts',
        blocks: [
          {
            title: 'Core Profile',
            type: 'list',
            items: [
              content.profile.name,
              content.profile.role,
              content.profile.location,
              content.profile.email,
              content.profile.phone,
            ],
          },
          { title: 'Tools', type: 'icons', icons: ideaIcons },
        ],
      },
      {
        title: 'Module 2: Strategies',
        blocks: [
          {
            title: 'Target Audience',
            type: 'list',
            items: ['Hiring teams', 'Product leaders', 'Research partners'],
          },
          {
            title: 'Execution Plan',
            type: 'icons',
            icons: actionIcons,
          },
          {
            title: 'Quick Links',
            type: 'links',
            links: [
              { label: 'GitHub', href: content.profile.github },
              { label: 'LinkedIn', href: content.profile.linkedin },
              { label: 'Resume', href: content.profile.resume, download: true },
            ],
          },
        ],
      },
    ],
  },
  about: {
    modules: [
      {
        title: 'Module 1: Key Concepts',
        blocks: [
          {
            title: 'Core Principles',
            type: 'list',
            items: content.about.body.map(stripHtml),
          },
          { title: 'Tools', type: 'icons', icons: ideaIcons },
        ],
      },
      {
        title: 'Module 2: Strategies',
        blocks: [
          {
            title: 'Target Audience',
            type: 'list',
            items: ['Startups', 'Research labs', 'Product teams'],
          },
          {
            title: 'Execution Plan',
            type: 'stats',
            stats: content.stats,
          },
        ],
      },
    ],
  },
  skills: {
    modules: [
      {
        title: 'Module 1: Key Concepts',
        blocks: [
          {
            title: 'Core Skills',
            type: 'list',
            items: content.skills.map((skill) => skill.name),
          },
          { title: 'Tools', type: 'icons', icons: ideaIcons },
        ],
      },
      {
        title: 'Module 2: Strategies',
        blocks: [
          {
            title: 'Target Audience',
            type: 'list',
            items: skillCategories,
          },
          {
            title: 'Execution Plan',
            type: 'rows',
            rows: content.skills.map((skill) => ({
              label: skill.name,
              value: `${skill.level}%`,
            })),
          },
        ],
      },
    ],
  },
  projects: {
    modules: [
      {
        title: 'Module 1: Key Concepts',
        blocks: [
          {
            title: 'Selected Work',
            type: 'projects',
            projects: content.projects,
          },
          {
            title: 'Tools',
            type: 'tags',
            tags: Array.from(new Set(content.projects.flatMap((project) => project.tags))).slice(0, 8),
          },
        ],
      },
      {
        title: 'Module 2: Strategies',
        blocks: [
          {
            title: 'Target Audience',
            type: 'list',
            items: ['Product teams', 'Founders', 'Engineering leads'],
          },
          {
            title: 'Execution Plan',
            type: 'icons',
            icons: actionIcons,
          },
        ],
      },
    ],
  },
  experience: {
    modules: [
      {
        title: 'Module 1: Key Concepts',
        blocks: [
          {
            title: 'Process',
            type: 'steps',
            steps: content.process,
          },
          { title: 'Tools', type: 'icons', icons: ideaIcons },
        ],
      },
      {
        title: 'Module 2: Strategies',
        blocks: [
          {
            title: 'Target Audience',
            type: 'list',
            items: ['Strategy teams', 'Innovation labs', 'Product squads'],
          },
          {
            title: 'Execution Plan',
            type: 'icons',
            icons: actionIcons,
          },
        ],
      },
    ],
  },
  contact: {
    modules: [
      {
        title: 'Module 1: Key Concepts',
        blocks: [
          {
            title: 'Reach Me',
            type: 'rows',
            rows: [
              { label: 'Email', value: content.profile.email },
              { label: 'Phone', value: content.profile.phone },
              { label: 'Location', value: content.profile.location },
            ],
          },
          { title: 'Tools', type: 'icons', icons: ideaIcons },
        ],
      },
      {
        title: 'Module 2: Strategies',
        blocks: [
          {
            title: 'Target Audience',
            type: 'list',
            items: ['Collaborations', 'Project briefs', 'Partnerships'],
          },
          {
            title: 'Execution Plan',
            type: 'links',
            links: [
              { label: 'GitHub', href: content.profile.github },
              { label: 'LinkedIn', href: content.profile.linkedin },
              { label: 'Resume', href: content.profile.resume, download: true },
            ],
          },
        ],
      },
    ],
  },
};

export default function WallContent({
  sectionName,
  position = [0, 1.7, -2.2],
  size = [10, 5.6],
  rotation = [0, 0, 0],
}) {
  const [hovered, setHovered] = useState(false);
  const section = sections.find((item) => item.name === sectionName) || sections[0];
  const copy = sectionCopy[section.name] || sectionCopy.home;
  const wallTexture = useSketchTexture({ scale: 5, rotation: 0.18, lineColor: '#c7beb1' });
  const modules = useMemo(() => modulesBySection[section.name]?.modules || [], [section.name]);
  const boardSize = useMemo(() => [size[0] - 0.6, size[1] - 0.6], [size]);
  const boardTitle = useMemo(
    () => `${section.label.toUpperCase()} KNOWLEDGE HUB`,
    [section.label]
  );

  return (
    <group position={position} rotation={rotation}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={size} />
        <meshStandardMaterial
          map={wallTexture}
          color="#fdfbf7"
          roughness={0.92}
          emissive="#ede7dd"
          emissiveIntensity={hovered ? 0.18 : 0.05}
        />
        <Edges color="#2b2723" />
      </mesh>

      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={boardSize} />
        <meshStandardMaterial
          color="#3b46c8"
          emissive="#1f2a7a"
          emissiveIntensity={0.45}
          roughness={0.4}
        />
        <Edges color="#f6f2ff" />
      </mesh>

      <spotLight
        position={[0, 3.6, 1.8]}
        angle={0.45}
        penumbra={0.7}
        intensity={0.65}
        color="#ffffff"
      />
      <pointLight position={[-2.8, 2.2, 1.5]} intensity={0.35} color="#ffe9b3" />
      <pointLight position={[2.8, 2.2, 1.5]} intensity={0.35} color="#cfe1ff" />

      <Text
        position={[0, size[1] / 2 + 0.35, 0.02]}
        fontSize={0.45}
        color="#2b2723"
        letterSpacing={0.14}
      >
        {section.label.toUpperCase()}
      </Text>

      <Html transform center distanceFactor={0.5} position={[0, 0, 0.06]}>
        <div className="wall-board" data-hovered={hovered ? 'true' : 'false'}>
          <div className="wall-board-header">
            <div className="wall-board-title">{boardTitle}</div>
            <div className="wall-board-sub">{copy.body}</div>
          </div>
          <div className="wall-board-columns">
            {modules.map((module) => (
              <div className="wall-board-module" key={module.title}>
                <div className="wall-board-module-title">{module.title}</div>
                {module.blocks.map((block) => (
                  <div className="wall-board-block" key={block.title}>
                    <div className="wall-board-block-title">{block.title}</div>

                    {block.type === 'list' && (
                      <ul className="wall-board-list">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}

                    {block.type === 'rows' && (
                      <div className="wall-board-rows">
                        {block.rows.map((row) => (
                          <div className="wall-board-row" key={row.label}>
                            <span className="wall-board-row-label">{row.label}</span>
                            <span className="wall-board-row-value">{row.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {block.type === 'icons' && (
                      <div className="wall-board-icon-row">
                        {block.icons.map((icon) => (
                          <div className="wall-board-icon" data-tone={icon.tone} key={icon.label}>
                            <span className="wall-board-icon-badge">{icon.code}</span>
                            <span className="wall-board-icon-label">{icon.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {block.type === 'stats' && (
                      <div className="wall-board-stats">
                        {block.stats.map((stat) => (
                          <div key={stat.label} className="wall-board-stat">
                            <span className="wall-board-stat-value">{stat.value}{stat.suffix}</span>
                            <span className="wall-board-stat-label">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {block.type === 'projects' && (
                      <ul className="wall-board-projects">
                        {block.projects.map((project) => (
                          <li key={project.id}>
                            <a href={project.link} target="_blank" rel="noreferrer">
                              <span className="wall-board-project-title">{project.title}</span>
                              <span className="wall-board-project-year">{project.year}</span>
                            </a>
                            <div className="wall-board-tags">
                              {project.tags.map((tag) => (
                                <span key={tag} className="wall-board-tag">{tag}</span>
                              ))}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}

                    {block.type === 'steps' && (
                      <ul className="wall-board-steps">
                        {block.steps.map((step) => (
                          <li key={step.id}>
                            <span className="wall-board-step-title">{step.label}</span>
                            <span className="wall-board-step-text">{step.title}</span>
                            <span className="wall-board-step-body">{step.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {block.type === 'tags' && (
                      <div className="wall-board-tags">
                        {block.tags.map((tag) => (
                          <span key={tag} className="wall-board-tag">{tag}</span>
                        ))}
                      </div>
                    )}

                    {block.type === 'links' && (
                      <div className="wall-board-links">
                        {block.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                            rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                            download={link.download ? true : undefined}
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}
