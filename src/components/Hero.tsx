import { motion, Variants } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import profileAvatar from '@/assets/profile-avatar.png';

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/50" />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <motion.div 
        className="relative z-10 section-container text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Avatar */}
        <motion.div 
          variants={itemVariants}
          className="relative mb-8"
        >
          <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto">
            {/* Glowing ring */}
            <motion.div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                padding: '3px',
              }}
              animate={{ 
                boxShadow: [
                  '0 0 20px hsl(var(--primary) / 0.4)',
                  '0 0 40px hsl(var(--primary) / 0.6)',
                  '0 0 20px hsl(var(--primary) / 0.4)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-full bg-background" />
            </motion.div>
            {/* Avatar image */}
            <img 
              src={profileAvatar} 
              alt="Mohana Krishnan M V"
              className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
        >
          <MapPin size={14} className="text-primary" />
          <span className="text-sm text-muted-foreground">Coimbatore, Tamil Nadu</span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-foreground">Mohana</span>{' '}
          <span className="text-gradient">Krishnan</span>
          <span className="block text-2xl md:text-3xl lg:text-4xl font-normal text-muted-foreground mt-4">
            M V
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          Computer Science Student • AI/ML Enthusiast • Software Developer
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a 
            href="https://linkedin.com/in/" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-lg glass card-hover"
          >
            <Linkedin size={18} className="text-primary" />
            <span>LinkedIn</span>
          </a>
          <a 
            href="https://github.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-lg glass card-hover"
          >
            <Github size={18} className="text-primary" />
            <span>GitHub</span>
          </a>
          <a 
            href="mailto:mvm.krish82@gmail.com"
            className="flex items-center gap-2 px-5 py-3 rounded-lg glass card-hover"
          >
            <Mail size={18} className="text-primary" />
            <span>Email</span>
          </a>
          <a 
            href="tel:+918248477456"
            className="flex items-center gap-2 px-5 py-3 rounded-lg glass card-hover"
          >
            <Phone size={18} className="text-primary" />
            <span>+91 8248477456</span>
          </a>
        </motion.div>

        <motion.button 
          variants={itemVariants}
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors mx-auto"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
