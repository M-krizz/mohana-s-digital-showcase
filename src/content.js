export const content = {
  profile: {
    name: 'Mohana Krishnan M V',
    location: 'Coimbatore, Tamil Nadu',
    linkedin: 'https://linkedin.com/in/mohanakrishnan28',
    github: 'https://github.com/M-krizz',
    email: 'mvm.krish82@gmail.com',
    mobile: '+91 8248477456'
  },
  objective: 'B.Tech Computer Science student (Expected May 2027) with a strong foundation in Python and Object-Oriented Design, and working knowledge of Java and C. Demonstrated experience delivering AI/ML research projects, production-grade backend systems, and UI/UX prototypes from concept to deployment. Seeking to apply Machine Learning and Software Engineering expertise to build impactful, real-world solutions.',
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
    cgpa: '7.12/10',
    coursework: ['Data Structures & Algorithms', 'Machine Learning', 'Operating Systems', 'Database Management Systems', 'Computer Networks']
  },
  experience: [
    {
      company: 'KVT Exports',
      role: 'AI/ML Engineer Intern',
      location: 'Coimbatore, India',
      duration: 'Jan 2026 - Mar 2026',
      achievements: [
        'Designed a product recommendation system combining 2 filtering strategies — collaborative and content-based — to personalize customer product discovery at scale.',
        'Developed an LLM-driven auto-reply engine that autonomously drafts contextual support responses from incoming product queries, reducing manual response time by over 60%.',
        'Unified ML inference outputs and GenAI workflows within the front-end interface, streamlining support flows and improving end-to-end response consistency.'
      ]
    }
  ],
  projects: [
    {
      title: 'Vectra: Intelligent Ride-Sharing & Pooling Platform',
      tech: ['NestJS', 'Flutter', 'PostGIS', 'Redis'],
      link: 'https://github.com/M-krizz/Vectra',
      points: [
        'Built a production-grade microservices system spanning 2 platforms (NestJS backend + Flutter mobile), with Socket.io powering real-time driver tracking and GPS synchronization.',
        'Engineered a custom ride-pooling algorithm grouping compatible riders via detour penalty scoring and multi-factor compatibility matching to maximize route efficiency.',
        'Established a geospatial data layer using PostgreSQL + PostGIS for efficient nearby-driver discovery and radius-based spatial queries.',
        'Architected a robust trip state machine managing complex ride lifecycles with strict transition validation and programmatic resource cleanup.'
      ]
    },
    {
      title: 'Logistics AI Compliance Checker',
      tech: ['Computer Vision', 'NLP', 'Python'],
      points: [
        'Secured a Top Finalist position at IIT Bombay\'s Logithon 2025 (national-level competition) by building an end-to-end AI system for logistics compliance verification.',
        'Fused Computer Vision (OCR) and NLP pipelines to extract structured, queryable data from unstructured shipping manifests with high reliability.',
        'Constructed a rule-based validation engine that cross-references extracted data against regulatory standards, significantly reducing manual audit time and human error.'
      ]
    },
    {
      title: 'Gaze Prediction via Fractional-Order Modeling',
      tech: ['Ongoing Research', 'Python', 'Signal Processing'],
      link: 'https://github.com/M-krizz/Gaze-Prediction-via-Fractional-Order-Modeling.git',
      points: [
        'Designing a multi-stage Python pipeline to predict future gaze positions by clustering eye-tracking data and identifying behavioral patterns across user sessions.',
        'Applying fractional calculus to model non-local memory effects in human visual attention, targeting higher prediction accuracy over conventional integer-order baselines.',
        'Preprocessing and normalizing large-scale coordinate datasets to strengthen model robustness and generalization across diverse user behaviors.'
      ]
    },
    {
      title: 'Ontology-Guided Floor Plan Generator',
      tech: ['GenAI', 'Knowledge Graph', 'Constraint Solving'],
      link: 'https://github.com/M-krizz/Gen-AI.git',
      points: [
        'Represented architectural domain knowledge through an ontology and knowledge graph, enforcing spatial design rules and room relationship constraints systematically.',
        'Leveraged a constraint-solving approach for geometric layout generation, producing multiple valid floor plan configurations per input specification.',
        'Formulated ranking metrics — including privacy score and spatial compactness — to objectively evaluate and compare generated layouts across configurations.'
      ]
    },
    {
      title: 'Federated Learning Simulation for Edge Networks',
      tech: ['Python', 'Distributed ML', 'Academic Project'],
      link: 'https://github.com/23CSE362-edge-computing-2025-26-odd/capstone-project-23_xpertedge.git',
      points: [
        'Directed a 4-member team to re-implement and evaluate a client selection strategy for clustered federated learning in wireless edge network environments.',
        'Performed simulation-based analysis of distributed learning behavior using Python and computational intelligence techniques to assess model convergence and fairness.',
        'Oversaw full project lifecycle — from research and implementation through simulation analysis and final reporting — ensuring timely delivery of all milestones.'
      ]
    },
    {
      title: 'Vision-Based Glacier Density Monitoring',
      tech: ['Independent Research', 'Deep Learning', 'Remote Sensing'],
      link: 'https://github.com/M-krizz/Comparative-Study-of-Glacier-Classification-and-Change-Detection.git',
      points: [
        'Developed a digital image processing pipeline to analyze temporal variation in the Siachen Glacier, enabling data-driven climate risk assessment from satellite imagery.',
        'Compared deep learning classifiers against traditional image processing baselines, achieving a peak accuracy of 93.42% on real-world environmental data.',
        'Collected, curated, and annotated large-scale satellite imagery datasets to support robust model training and evaluation across multiple glacier states.'
      ]
    }
  ]
};
