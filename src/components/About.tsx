import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Target className="text-primary" size={28} />
            <h2 className="text-3xl md:text-4xl font-bold">Objective</h2>
          </div>

          <div className="glass rounded-2xl p-8 md:p-12 card-hover">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              A motivated Computer Science student with a strong foundation in{' '}
              <span className="text-foreground font-medium">C++</span>,{' '}
              <span className="text-foreground font-medium">Python</span>, and{' '}
              <span className="text-foreground font-medium">Object-Oriented Design</span>. 
              Seeking a Software Engineering internship to contribute to innovative digital solutions 
              and gain hands-on experience in a global technology network that prioritizes{' '}
              <span className="text-gradient">reliability</span>,{' '}
              <span className="text-gradient">security</span>, and{' '}
              <span className="text-gradient">large-scale transaction processing</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
