import { useState } from 'react';
import { motion } from 'framer-motion';

import type { Variants } from 'framer-motion';

interface SceneDoorProps {
  onEnter: () => void;
}

export default function SceneDoor({ onEnter }: SceneDoorProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleDoorClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onEnter();
    }, 3000); 
  };

  const containerVariants: Variants = {
    closed: { scale: 1 },
    opened: { scale: 1.25, transition: { duration: 3, ease: [0.4, 0, 0.2, 1] as const } }
  };

  const leftDoorVariants: Variants = {
    closed: { rotateY: 0 },
    opened: { rotateY: -100, transition: { duration: 3, ease: [0.4, 0, 0.2, 1] as const } }
  };

  const rightDoorVariants: Variants = {
    closed: { rotateY: 0 },
    opened: { rotateY: 100, transition: { duration: 3, ease: [0.4, 0, 0.2, 1] as const } }
  };

  // Adjust these percentages based on the visual proportions of green_door.jpg
  // The wooden rectangular doors are roughly inside these bounds:
  const doorTop = '26%';
  const doorLeft = '20%';
  const doorRight = '80%';
  const doorWidth = '30%'; // Each door is 30% width (total 60%)

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full bg-black overflow-hidden flex items-center justify-center"
      initial="closed"
      animate={isOpening ? "opened" : "closed"}
      variants={containerVariants}
    >
      <div className="relative z-10 w-full h-full max-w-[calc(100vh*9/16)] aspect-[9/16] mx-auto perspective-[2000px]">
        
        {/* Layer 1: The Interior (Scene 1 background) revealed when doors open */}
        <div className="absolute inset-0 w-full h-full">
          <img src="/assets/floral_bg.jpg" alt="Interior" className="w-full h-full object-cover" />
        </div>

        {/* Layer 2: The Outer Wall (with a rectangular hole cut out for the doors) */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, ${doorRight} 100%, ${doorRight} ${doorTop}, ${doorLeft} ${doorTop}, ${doorLeft} 100%, 0% 100%)`
          }}
        >
          <img src="/assets/green_door.jpg" alt="Wall" className="w-full h-full object-cover" />
        </div>

        {/* Layer 3: Left Door */}
        <motion.div 
          className="absolute bottom-0 cursor-pointer pointer-events-auto drop-shadow-2xl"
          style={{ 
            left: doorLeft, 
            width: doorWidth, 
            top: 0, // Full height
            transformOrigin: 'left center',
            clipPath: `polygon(0% ${doorTop}, 100% ${doorTop}, 100% 100%, 0% 100%)`
          }}
          variants={leftDoorVariants}
          onClick={handleDoorClick}
        >
          {/* We use object-cover but shifted inside to only show the left door part of the image */}
          <div className="w-full h-full overflow-hidden relative">
            <img 
              src="/assets/green_door.jpg" 
              className="absolute top-0 h-full max-w-none" 
              style={{ 
                width: `${100 / parseFloat(doorWidth) * 100}%`, // ~333.33%
                left: `-${parseFloat(doorLeft) / parseFloat(doorWidth) * 100}%`, // ~-66.66%
              }} 
            />
          </div>
        </motion.div>

        {/* Layer 4: Right Door */}
        <motion.div 
          className="absolute bottom-0 cursor-pointer pointer-events-auto drop-shadow-2xl"
          style={{ 
            left: '50%', 
            width: doorWidth, 
            top: 0, // Full height
            transformOrigin: 'right center',
            clipPath: `polygon(0% ${doorTop}, 100% ${doorTop}, 100% 100%, 0% 100%)`
          }}
          variants={rightDoorVariants}
          onClick={handleDoorClick}
        >
          <div className="w-full h-full overflow-hidden relative">
            <img 
              src="/assets/green_door.jpg" 
              className="absolute top-0 h-full max-w-none" 
              style={{ 
                width: `${100 / parseFloat(doorWidth) * 100}%`,
                left: `-${50 / parseFloat(doorWidth) * 100}%`, 
              }} 
            />
          </div>
        </motion.div>

        {/* Tap to open overlay */}
        {!isOpening && (
          <motion.div 
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="font-sans tracking-widest text-white/70 text-sm mt-[40vh] uppercase drop-shadow-lg bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
              Tap to enter
            </p>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}
