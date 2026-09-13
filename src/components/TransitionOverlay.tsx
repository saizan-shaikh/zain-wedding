import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransitionOverlayProps {
  isActive: boolean;
}

export function TransitionOverlay({ isActive }: TransitionOverlayProps) {
  const [renderPetals, setRenderPetals] = useState(false);

  useEffect(() => {
    if (isActive) {
      setRenderPetals(true);
    } else {
      // Keep petals falling for a bit while they fade out
      const timer = setTimeout(() => {
        setRenderPetals(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!renderPetals) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 2 }}
    >
      {[...Array(40)].map((_, i) => {
        // Create depth: some big and blurry (close), some small (far)
        const isForeground = i % 3 === 0;
        const size = isForeground ? Math.random() * 20 + 20 : Math.random() * 10 + 10;
        const blur = isForeground ? Math.random() * 4 + 4 : Math.random() * 2;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-[40%_60%_60%_40%_/_40%_50%_50%_60%] bg-champagne/80"
            style={{ 
              width: size, 
              height: size * 0.8,
              filter: `blur(${blur}px)`,
              boxShadow: 'inset 2px 2px 5px rgba(255,255,255,0.3)'
            }}
            initial={{ 
              x: `${Math.random() * 100}vw`, 
              y: '-20vh',
              rotate: Math.random() * 360,
              opacity: 0
            }}
            animate={{ 
              x: `${Math.random() * 100 + (Math.random() > 0.5 ? 20 : -20)}vw`,
              y: '120vh',
              rotate: Math.random() * 720,
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 4 + 4, // 4-8 seconds to fall
              ease: "linear",
              delay: Math.random() * 1.5 // Stagger start times
            }}
          />
        );
      })}
    </motion.div>
  );
}
