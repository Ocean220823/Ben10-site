import { useState, useRef } from 'react';
import OmnitrixCanvas from '../components/3d/OmnitrixCanvas';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
  const [clicked, setClicked] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const timeoutRef = useRef<any>(null);

  const handleOmnitrixInteraction = (isActivated: boolean) => {
    setClicked(isActivated);
    setShowStatus(true);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowStatus(false);
    }, 2000);
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      {/* Background Particle Effects & Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Dynamic Status Text overlay moved to top */}
      <div className="absolute top-12 left-0 w-full flex items-center justify-center pointer-events-none z-0 opacity-40">
         <AnimatePresence mode="wait">
            {showStatus && (
              <motion.h1 
                 key={clicked ? "activated" : "disabled"}
                 initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                 animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                 exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                 transition={{ duration: 0.5 }}
                 className="text-[5vw] font-display font-bold uppercase tracking-[0.3em] text-primary whitespace-nowrap"
              >
                 {clicked ? "OMNITRIX ACTIVATED" : "OMNITRIX DISABLED"}
              </motion.h1>
            )}
         </AnimatePresence>
      </div>

      {/* Main Content (UI z-index: 2 over perfectly transparent canvas) */}
      <div className="relative z-[2] text-center w-full flex flex-col items-center justify-center h-full">
        {/* Full screen 3D Omnitrix Canvas Container restored to original safe interaction flow */}
        <div className="w-full h-[70vh] relative cursor-pointer">
          <OmnitrixCanvas clicked={clicked} setClicked={handleOmnitrixInteraction} />
        </div>
      </div>

      {/* Futuristic HUD Elements corners */}
      <div className="absolute top-8 left-8 border-l border-t border-primary p-2 w-16 h-16 opacity-50 pointer-events-none"></div>
      <div className="absolute top-8 right-8 border-r border-t border-primary p-2 w-16 h-16 opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-8 left-8 border-l border-b border-primary p-2 w-16 h-16 opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-8 right-8 border-r border-b border-primary p-2 w-16 h-16 opacity-50 pointer-events-none"></div>
    </div>
  );
};

export default LandingPage;
