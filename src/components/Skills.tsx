import { motion, Variants } from 'framer-motion';
import { Code, Wrench, Brain, Users } from 'lucide-react';

const skillsData = {
  languages: [
    { name: 'C++', level: 90 },
    { name: 'Python', level: 85 },
    { name: 'Java', level: 75 },
    { name: 'SQL', level: 80 },
    { name: 'HTML/CSS', level: 85 },
    { name: 'C', level: 80 },
  ],
  frameworks: [
    { name: 'React', level: 75 },
    { name: 'TensorFlow', level: 70 },
    { name: 'PyTorch', level: 70 },
    { name: 'Scikit-learn', level: 80 },
    { name: 'OpenCV', level: 75 },
    { name: 'NumPy/Pandas', level: 85 },
  ],
  tools: ['Git', 'GitHub', 'VSCode', 'Webots', 'Eclipse', 'Jupyter Notebook', 'Google Colab'],
  soft: ['Team Collaboration', 'Strategic Thinking', 'Project Management', 'Communication', 'Adaptability'],
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="section-container">
        <motion.div 
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Code className="text-primary" size={28} />
          <h2 className="text-3xl md:text-4xl font-bold">Technical Skills</h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Languages */}
          <motion.div variants={cardVariants} className="glass rounded-2xl p-6 card-hover">
            <div className="flex items-center gap-2 mb-6">
              <Code size={20} className="text-primary" />
              <h3 className="text-xl font-semibold">Languages</h3>
            </div>
            <div className="space-y-4">
              {skillsData.languages.map((skill, idx) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-sm">{skill.name}</span>
                    <span className="text-muted-foreground text-sm">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Frameworks */}
          <motion.div variants={cardVariants} className="glass rounded-2xl p-6 card-hover">
            <div className="flex items-center gap-2 mb-6">
              <Brain size={20} className="text-primary" />
              <h3 className="text-xl font-semibold">Libraries & Frameworks</h3>
            </div>
            <div className="space-y-4">
              {skillsData.frameworks.map((skill, idx) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-sm">{skill.name}</span>
                    <span className="text-muted-foreground text-sm">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div variants={cardVariants} className="glass rounded-2xl p-6 card-hover">
            <div className="flex items-center gap-2 mb-6">
              <Wrench size={20} className="text-primary" />
              <h3 className="text-xl font-semibold">Developer Tools</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillsData.tools.map((tool, idx) => (
                <motion.span 
                  key={tool} 
                  className="px-4 py-2 rounded-lg bg-secondary text-sm font-mono hover:bg-primary/20 transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div variants={cardVariants} className="glass rounded-2xl p-6 card-hover">
            <div className="flex items-center gap-2 mb-6">
              <Users size={20} className="text-primary" />
              <h3 className="text-xl font-semibold">Soft Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillsData.soft.map((skill, idx) => (
                <motion.span 
                  key={skill} 
                  className="px-4 py-2 rounded-lg bg-secondary text-sm hover:bg-accent/20 transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
