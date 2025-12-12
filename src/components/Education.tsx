import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';

const coursework = [
  'Data Structures & Algorithms',
  'Machine Learning',
  'Operating Systems',
  'Database Management Systems',
  'Computer Networks',
];

const Education = () => {
  return (
    <section id="education" className="py-24 relative">
      <div className="section-container">
        <motion.div 
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GraduationCap className="text-primary" size={28} />
          <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
        </motion.div>

        <motion.div 
          className="glass rounded-2xl p-8 md:p-12 card-hover"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Amrita Vishwa Vidhyapeetham
              </h3>
              <p className="text-lg text-primary font-medium mb-1">
                Bachelor of Technology in Computer Science
              </p>
              <p className="text-muted-foreground">Coimbatore, India</p>
            </div>

            <div className="flex flex-col gap-2 md:text-right">
              <div className="flex items-center gap-2 md:justify-end">
                <Calendar size={16} className="text-primary" />
                <span className="text-muted-foreground">Expected May 2027</span>
              </div>
              <motion.div 
                className="glass px-4 py-2 rounded-lg inline-flex items-center gap-2 md:self-end"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-muted-foreground">CGPA:</span>
                <span className="text-2xl font-bold text-gradient">7.02</span>
                <span className="text-muted-foreground">/ 10.0</span>
              </motion.div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={18} className="text-primary" />
              <h4 className="text-lg font-semibold">Relevant Coursework</h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {coursework.map((course, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.08 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {course}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
