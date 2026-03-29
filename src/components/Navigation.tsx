import { NavLink } from 'react-router-dom';
import { Watch, Users, Database } from 'lucide-react';

const Navigation = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-display tracking-widest uppercase transition-all duration-300 ${
      isActive 
        ? 'text-primary border-b-2 border-primary bg-primary/10' 
        : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-40 glass-panel border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-primary flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,255,0,0.5)] transition-all">
            <span className="text-primary font-display font-bold text-xl">10</span>
          </div>
          <span className="text-xl font-display font-bold tracking-widest text-on-surface group-hover:text-primary transition-colors">
            OMNI<span className="text-primary">TRIX</span>
          </span>
        </NavLink>

        <div className="hidden md:flex items-center gap-4">
          <NavLink to="/classic" className={navLinkClass}>
            <Database size={16} />
            Classic Playlist
          </NavLink>
          <NavLink to="/variants" className={navLinkClass}>
            <Watch size={16} />
            Omnitrix Variants
          </NavLink>
          <NavLink to="/characters" className={navLinkClass}>
            <Users size={16} />
            Core Characters
          </NavLink>
        </div>
        
        {/* Mobile menu button could go here */}
      </div>
    </nav>
  );
};

export default Navigation;
