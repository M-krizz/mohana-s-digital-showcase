export const content = {
  profile: {
    name: 'Mohana Krishnan M V',
    location: 'Coimbatore, Tamil Nadu',
    linkedin: 'https://linkedin.com/in/mohanakrishnan28',
    github: 'https://github.com/M-krizz',
    email: 'mvm.krish82@gmail.com',
    mobile: '+91 8248477456',
    stats: [
      { label: 'Projects', value: '10+' },
      { label: 'Internships', value: '2' },
      { label: 'Graduating', value: '2027' },
      { label: 'CGPA', value: '7.18' },
    ]
  },
  objective: 'I build intelligent systems that solve real problems — from ride-sharing platforms to glacier monitoring pipelines. CS undergrad at Amrita Vishwa Vidyapeetham with hands-on experience in AI/ML research, full-stack engineering, and UI/UX design. I ship fast, learn constantly, and care deeply about craft.',
  skills: {
    languages: ['Python', 'TypeScript', 'Java', 'C', 'SQL', 'Dart', 'HTML/CSS'],
    backendData: ['NestJS', 'Node.js', 'FastAPI', 'Socket.io', 'PostgreSQL (PostGIS)', 'Redis', 'Supabase'],
    librariesFrameworks: ['React', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'NumPy', 'Pandas', 'Flutter'],
    developerTools: ['Docker', 'Git', 'GitHub', 'VSCode', 'Webots', 'Jupyter Notebook', 'Google Colab']
  },
  education: {
    institution: 'Amrita Vishwa Vidyapeetham',
    degree: 'Bachelor of Technology in Computer Science',
    location: 'Coimbatore, India',
    graduation: 'Expected May 2027',
    cgpa: '7.18/10',
    coursework: ['Data Structures & Algorithms', 'Machine Learning', 'Operating Systems', 'Database Management Systems', 'Computer Networks', 'Generative AI']
  },
  experience: [
    {
      company: 'Broad Peak Design Solutions Ltd.',
      role: 'UI/UX & AI Systems Intern',
      location: 'Remote',
      duration: 'Apr 2026 - Present',
      achievements: [
        'Designing and prototyping user interfaces for client-facing products, focusing on intuitive interaction patterns and modern design systems.',
        'Collaborating with cross-functional teams to integrate AI-driven features into production Management systems, enhancing productivity and efficiency, system performance.'
      ]
    },
    {
      company: 'KVT Exports',
      role: 'AI/ML Engineer Intern',
      location: 'Coimbatore, India',
      duration: 'Jan 2026 - Mar 2026',
      achievements: [
        'Designed a product recommendation system combining 2 filtering strategies — collaborative and content-based — to personalize customer product discovery at scale.',
        'Developed an LLM-driven auto-reply engine that autonomously drafts contextual support responses from incoming product queries, reducing manual response time by over 60%.'
      ]
    }
  ],
  projectCategories: [
    {
      id: 'research',
      title: 'Research',
      icon: '🔬',
      description: 'Academic and independent research projects.',
      projects: [
        {
          title: 'Vision-Based Glacier Density Monitoring',
          tech: ['Independent Research', 'Deep Learning', 'Remote Sensing'],
          icon: '🏔️',
          link: 'https://github.com/M-krizz/Comparative-Study-of-Glacier-Classification-and-Change-Detection.git',
          impact: ['93.42% Accuracy', 'Satellite Imagery', 'Climate Analysis'],
          points: [
            'Developed a digital image processing pipeline to analyze temporal variation in the Siachen Glacier, enabling data-driven climate risk assessment from satellite imagery.',
            'Compared deep learning classifiers against traditional image processing baselines, achieving a peak accuracy of 93.42% on real-world environmental data.',
            'Collected, curated, and annotated large-scale satellite imagery datasets to support robust model training and evaluation across multiple glacier states.'
          ]
        },
        {
          title: 'Gaze Prediction via Fractional-Order Modeling',
          tech: ['Ongoing Research', 'Python', 'Signal Processing'],
          icon: '👁️',
          link: 'https://github.com/M-krizz/Gaze-Prediction-via-Fractional-Order-Modeling.git',
          impact: ['Active Research', 'Fractional Calculus', 'Multi-stage Pipeline'],
          points: [
            'Designing a multi-stage Python pipeline to predict future gaze positions by clustering eye-tracking data and identifying behavioral patterns across user sessions.',
            'Applying fractional calculus to model non-local memory effects in human visual attention, targeting higher prediction accuracy over conventional integer-order baselines.',
            'Preprocessing and normalizing large-scale coordinate datasets to strengthen model robustness and generalization across diverse user behaviors.'
          ]
        }
      ]
    },
    {
      id: 'aiml',
      title: 'AI / ML',
      icon: '🧠',
      description: 'Machine learning, Generative AI, and automation engines.',
      projects: [
        {
          title: 'BlueprintGPT: Ontology-Guided Floor Plan Generator',
          tech: ['GenAI', 'Knowledge Graph', 'Constraint Solving'],
          icon: '🏗️',
          link: 'https://github.com/M-krizz/Gen-AI.git',
          impact: ['Knowledge Graph', 'Multi-config Output', 'Privacy Scoring'],
          points: [
            'Represented architectural domain knowledge through an ontology and knowledge graph, enforcing spatial design rules and room relationship constraints systematically.',
            'Leveraged a constraint-solving approach for geometric layout generation, producing multiple valid floor plan configurations per input specification.',
            'Formulated ranking metrics — including privacy score and spatial compactness — to objectively evaluate and compare generated layouts across configurations.'
          ]
        },
        {
          title: 'LLM-Driven Auto Reply Engine',
          tech: ['NLP', 'Conversational AI', 'Automation'],
          icon: '🤖',
          impact: ['60% Time Reduction', 'Contextual Parsing', 'Omnichannel Support'],
          points: [
            'Engineered an intelligent NLP-based automation system that autonomously drafts contextual responses for incoming queries across chat and email platforms.',
            'Integrated Large Language Models to interpret semantic intent, drastically reducing manual support response times and improving interaction consistency.',
            'Built a modular conversational AI pipeline designed to seamlessly hook into existing productivity tooling and social communication channels.'
          ]
        },
        {
          title: 'Context-Aware Image Generator',
          tech: ['JavaScript', 'Prompt Engineering', 'Generative Vision'],
          icon: '🎨',
          impact: ['Adaptive Prompting', 'Raw Image Analysis', 'Dynamic Output'],
          points: [
            'Developed a context-aware generative image pipeline leveraging JavaScript-based prompt engineering.',
            'Architected a system that dynamically analyzes raw uploaded images to autonomously draft highly optimized generation prompts based on user-selected environmental options.',
            'Streamlined the creative process by removing the need for manual prompt tuning, ensuring deterministic, high-fidelity outputs matched strictly to chosen styles.'
          ]
        }
      ]
    },
    {
      id: 'simulations',
      title: 'Simulations',
      icon: '⚙️',
      description: 'Distributed networks and multi-agent robotics.',
      projects: [
        {
          title: 'Hive Minded: Robotic Swarm Foraging',
          tech: ['Multi-Agent Systems', 'Emergent Behavior', 'Robotics'],
          icon: '🐜',
          impact: ['Distributed Intelligence', 'Autonomous Search', 'Swarm Logic'],
          points: [
            'Constructed a comprehensive robotics swarm intelligence simulation focusing on autonomous search and foraging behaviors.',
            'Modeled complex emergent behavior by defining simple, localized rules for individual agents, resulting in highly efficient, coordinated multi-agent environmental exploration.',
            'Validated distributed intelligence strategies in a simulated physics environment, demonstrating robust swarm adaptation and obstacle navigation.'
          ]
        },
        {
          title: 'Federated Learning Edge Simulation',
          tech: ['Python', 'Distributed ML', 'Academic Project'],
          icon: '🌐',
          link: 'https://github.com/23CSE362-edge-computing-2025-26-odd/capstone-project-23_xpertedge.git',
          impact: ['4-member Team Lead', 'Edge Computing', 'Convergence Analysis'],
          points: [
            'Directed a 4-member team to re-implement and evaluate a client selection strategy for clustered federated learning in wireless edge network environments.',
            'Performed simulation-based analysis of distributed learning behavior using Python and computational intelligence techniques to assess model convergence and fairness.',
            'Oversaw full project lifecycle — from research and implementation through simulation analysis and final reporting — ensuring timely delivery of all milestones.'
          ]
        }
      ]
    },
    {
      id: 'fullstack',
      title: 'Full Stack',
      icon: '💻',
      description: 'End-to-end applications and web architecture.',
      projects: [
        {
          title: 'ParamaShopping: Secure E-Commerce Platform',
          tech: ['TypeScript', 'Security Architecture', 'Backend APIs'],
          icon: '🛍️',
          impact: ['SQLi Prevention', 'JWT Auth', 'Encrypted Transactions'],
          points: [
            'Architected a modern, highly secure online shopping platform built fundamentally on a robust TypeScript-driven security architecture.',
            'Prioritized secure commerce by implementing strict JWT authentication, encrypted payment flows, and comprehensive SQL injection prevention layers at the API level.',
            'Designed a resilient backend architecture to safely handle user sessions, sensitive transactional data, and high-volume product inventory routing.'
          ]
        },
        {
          title: 'ParamaEdu: Online LMS',
          tech: ['HTML/CSS', 'JavaScript', 'Bootstrap'],
          icon: '📚',
          impact: ['Responsive UI', 'Course Management', 'Interactive Frontend'],
          points: [
            'Developed a full-featured Online Learning Management System utilizing vanilla web technologies and the Bootstrap framework.',
            'Engineered interactive, JavaScript-driven frontend modules to handle course enrollment, dynamic curriculum viewing, and user progress tracking.',
            'Focused on delivering a universally accessible, highly responsive layout that adapts seamlessly across mobile and desktop learning environments.'
          ]
        },
        {
          title: 'Vectra: Intelligent Ride-Sharing & Pooling',
          tech: ['NestJS', 'Flutter', 'PostGIS', 'Redis'],
          icon: '🚗',
          link: 'https://github.com/M-krizz/Vectra',
          impact: ['2 Platforms', 'Real-time GPS', 'Microservices'],
          points: [
            'Built a production-grade microservices system spanning 2 platforms (NestJS backend + Flutter mobile), with Socket.io powering real-time driver tracking and GPS synchronization.',
            'Engineered a custom ride-pooling algorithm grouping compatible riders via detour penalty scoring and multi-factor compatibility matching to maximize route efficiency.',
            'Established a geospatial data layer using PostgreSQL + PostGIS for efficient nearby-driver discovery and radius-based spatial queries.',
            'Architected a robust trip state machine managing complex ride lifecycles with strict transition validation and programmatic resource cleanup.'
          ]
        }
      ]
    }
  ]
};
