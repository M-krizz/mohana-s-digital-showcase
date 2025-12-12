import { motion } from 'framer-motion';
import { Rocket, Trophy, Globe, Cpu, Bot, Mountain, ExternalLink } from 'lucide-react';

const projectsData = [
  {
    title: 'Logistics AI Compliance Checker',
    badge: 'Top Finalist – Logithon 2025, IIT Bombay',
    icon: Trophy,
    color: 'text-yellow-400',
    description: 'AI-powered system to predict and mitigate shipment risks, ensuring regulatory compliance.',
    highlights: [
      'Reduced potential delays by 20%',
      '85% accuracy in detecting compliance violations',
      'Presented solution to industry leaders',
    ],
    tags: ['Machine Learning', 'Risk Analysis', 'Compliance'],
    status: 'completed',
  },
  {
    title: 'Vision-Based Glacier Density Monitoring',
    badge: 'Independent Research Project',
    icon: Mountain,
    color: 'text-blue-400',
    description: 'Digital Image Processing system analyzing temporal variations in Siachen Glacier (2010–2024).',
    highlights: [
      '93.42% Accuracy achieved',
      'U-Net & Random Forest models',
      'Satellite imagery analysis',
    ],
    tags: ['Deep Learning', 'Computer Vision', 'Climate Research'],
    status: 'research',
  },
  {
    title: 'Federated Learning Simulation',
    badge: 'Academic Project',
    icon: Globe,
    color: 'text-green-400',
    description: 'Client selection approach for Clustered Federated Learning over wireless edge networks.',
    highlights: [
      'Led team project',
      'Simulated large-scale networks',
      'Distributed learning algorithms',
    ],
    tags: ['Federated Learning', 'Edge Computing', 'Distributed Systems'],
    status: 'ongoing',
  },
  {
    title: 'Humanoid Robot for Medical Assistance',
    badge: 'Team Project',
    icon: Bot,
    color: 'text-purple-400',
    description: 'Humanoid robot prototype integrating hardware and software for medical data collection.',
    highlights: [
      'Autonomous navigation system',
      'Hardware-software integration',
      'Multi-disciplinary collaboration',
    ],
    tags: ['Robotics', 'AI', 'Healthcare'],
    status: 'ongoing',
  },
  {
    title: 'Parama Edu – E-Learning Platform',
    badge: 'UI/UX, Frontend Development',
    icon: Cpu,
    color: 'text-pink-400',
    description: 'User-centered e-learning platform with intuitive navigation for students and educators.',
    highlights: [
      'Responsive cross-device design',
      'User testing conducted',
      'Accessibility focused',
    ],
    tags: ['React', 'UI/UX', 'HTML/CSS'],
    status: 'completed',
  },
];

const getStatusBadge = (status: string) => {
  const statusStyles = {
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    ongoing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    research: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };
  return statusStyles[status as keyof typeof statusStyles] || statusStyles.completed;
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="section-container">
        <motion.div 
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Rocket className="text-primary" size={28} />
          <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
        </motion.div>

        <div className="grid gap-6">
          {projectsData.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.01 }}
                className="glass rounded-2xl p-6 md:p-8 card-hover group"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <motion.div 
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-secondary flex items-center justify-center ${project.color}`}>
                      <Icon size={28} />
                    </div>
                  </motion.div>

                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-xl md:text-2xl font-bold">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(project.status)}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>

                    <p className="text-primary text-sm font-medium mb-3">{project.badge}</p>
                    <p className="text-muted-foreground mb-4">{project.description}</p>

                    <ul className="space-y-2 mb-4">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.div 
                    className="flex-shrink-0 lg:self-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <button className="p-3 rounded-lg bg-secondary hover:bg-primary/20 transition-colors group-hover:text-primary">
                      <ExternalLink size={20} />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
