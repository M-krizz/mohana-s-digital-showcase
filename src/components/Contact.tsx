import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mvm.krish82@gmail.com',
    href: 'mailto:mvm.krish82@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 8248477456',
    href: 'tel:+918248477456',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Connect with me',
    href: 'https://linkedin.com/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'View my code',
    href: 'https://github.com/',
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="section-container">
        <motion.div 
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Send className="text-primary" size={28} />
          <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {contactLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={index}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass rounded-2xl p-6 card-hover group flex items-center gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  whileHover={{ rotate: 10 }}
                >
                  <Icon size={24} />
                </motion.div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{link.label}</p>
                  <p className="font-semibold group-hover:text-primary transition-colors">{link.value}</p>
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-muted-foreground mb-4">
            Open to opportunities and collaborations
          </p>
          <motion.a
            href="mailto:mvm.krish82@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={20} />
            Let's Connect
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
