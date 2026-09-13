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

  // Rectangular bounding box for the double doors based on the reference image (ref_s1.jpg)
  const doorTop = '26%';
  const doorBottom = '94%'; // Stop slightly above bottom to leave floor intact
  const doorLeft = '18%';
  const doorRight = '82%';
  const doorWidth = '32%'; // (82 - 18) / 2 = 32% per door

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full bg-[#f4f1eb] overflow-hidden flex items-center justify-center"
      initial="closed"
      animate={isOpening ? "opened" : "closed"}
      variants={containerVariants}
    >
      <div className="relative w-full h-full perspective-[2000px]">
        
        {/* Layer 1: The Interior (Scene 2 floral background) revealed when doors open */}
        <div className="absolute inset-0 w-full h-full">
          <img src="/assets/ref_s2.jpg" alt="Interior" className="w-full h-full object-cover object-top" />
        </div>

        {/* Layer 2: The Outer Wall (with a rectangular hole cut out for the doors) */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, ${doorRight} 100%, ${doorRight} ${doorTop}, ${doorLeft} ${doorTop}, ${doorLeft} 100%, 0% 100%)`
          }}
        >
          <img src="/assets/ref_s1.jpg" alt="Wall" className="w-full h-full object-cover object-top" />
        </div>

        {/* Layer 3: Left Door */}
        <motion.div 
          className="absolute cursor-pointer pointer-events-auto shadow-2xl"
          style={{ 
            left: doorLeft, 
            width: doorWidth, 
            top: 0,
            bottom: 0,
            transformOrigin: 'left center',
            clipPath: `polygon(0% ${doorTop}, 100% ${doorTop}, 100% ${doorBottom}, 0% ${doorBottom})`
          }}
          variants={leftDoorVariants}
          onClick={handleDoorClick}
        >
          <div className="w-full h-full overflow-hidden relative">
            <img 
              src="/assets/ref_s1.jpg" 
              className="absolute top-0 h-full max-w-none object-cover object-top" 
              style={{ 
                width: `${100 / parseFloat(doorWidth) * 100}%`,
                left: `-${parseFloat(doorLeft) / parseFloat(doorWidth) * 100}%`,
              }} 
            />
          </div>
        </motion.div>

        {/* Layer 4: Right Door */}
        <motion.div 
          className="absolute cursor-pointer pointer-events-auto shadow-2xl"
          style={{ 
            left: '50%', 
            width: doorWidth, 
            top: 0,
            bottom: 0,
            transformOrigin: 'right center',
            clipPath: `polygon(0% ${doorTop}, 100% ${doorTop}, 100% ${doorBottom}, 0% ${doorBottom})`
          }}
          variants={rightDoorVariants}
          onClick={handleDoorClick}
        >
          <div className="w-full h-full overflow-hidden relative">
            <img 
              src="/assets/ref_s1.jpg" 
              className="absolute top-0 h-full max-w-none object-cover object-top" 
              style={{ 
                width: `${100 / parseFloat(doorWidth) * 100}%`,
                left: `-${50 / parseFloat(doorWidth) * 100}%`, 
              }} 
            />
          </div>
        </motion.div>

        {/* Tap to enter */}
        {!isOpening && (
          <motion.div 
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="font-sans tracking-widest text-[#2A3122] text-sm mt-[40vh] uppercase bg-white/70 px-4 py-2 rounded-full backdrop-blur-sm shadow-md">
              Tap to enter
            </p>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}
