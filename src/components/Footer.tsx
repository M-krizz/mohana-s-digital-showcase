import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container text-center">
        <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
          Built with <Heart size={14} className="text-primary fill-primary" /> by Mohana Krishnan M V
        </p>
        <p className="text-muted-foreground/60 text-xs mt-2">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
