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
    }, 3000); // Allow camera to gently enter before transitioning
  };

  // The scaling animation for the camera entering the venue (subtle and controlled)
  const containerVariants: import('framer-motion').Variants = {
    closed: { scale: 1 },
    opened: { scale: 1.25, transition: { duration: 3, ease: [0.4, 0, 0.2, 1] } }
  };

  const leftDoorVariants: Variants = {
    closed: { rotateY: 0 },
    opened: { rotateY: -105, transition: { duration: 3, ease: [0.25, 1, 0.5, 1] } }
  };

  const rightDoorVariants: Variants = {
    closed: { rotateY: 0 },
    opened: { rotateY: 105, transition: { duration: 3, ease: [0.25, 1, 0.5, 1] } }
  };

  // This ensures our layers always maintain a 16:9 aspect ratio and cover the viewport
  const coverAspectClass = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100vh] w-[max(100vw,calc(100vh*16/9))] h-[max(100vh,calc(100vw*9/16))]";

  // Polygon that cuts out an arched hole in the center for the doors
  const archClipPath = "polygon(0% 0%, 0% 100%, 35% 100%, 35% 30%, 40% 23%, 50% 20%, 60% 23%, 65% 30%, 65% 100%, 100% 100%, 100% 0%)";

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full overflow-hidden bg-black z-50 perspective-[2000px] origin-center"
      onClick={handleDoorClick}
      variants={containerVariants}
      initial="closed"
      animate={isOpening ? "opened" : "closed"}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      {/* LAYER 1: The Interior (What we see when doors open) */}
      <div className={coverAspectClass}>
        <img src="/assets/interior.jpg" alt="Interior" className="w-full h-full object-cover" />
      </div>

      {/* LAYER 2: The Swinging Doors */}
      <div className={`${coverAspectClass} z-10 pointer-events-none`}>
        {/* Left Door */}
        <motion.div
          className="absolute left-[35%] top-[20%] w-[15%] h-[80%] origin-left overflow-hidden"
          variants={leftDoorVariants}
        >
          {/* We position the background image so it perfectly matches the cutout */}
          <img src="/assets/door.jpg" alt="" className="absolute left-[calc(-35vw*100/15)] top-[calc(-20vh*100/80)] w-[calc(100vw*100/15)] h-[calc(100vh*100/80)] max-w-none" style={{
            width: '666.66%', // 100 / 15
            height: '125%',  // 100 / 80
            left: '-233.33%', // -35 / 15 * 100
            top: '-25%',      // -20 / 80 * 100
          }} />
        </motion.div>

        {/* Right Door */}
        <motion.div
          className="absolute left-[50%] top-[20%] w-[15%] h-[80%] origin-right overflow-hidden"
          variants={rightDoorVariants}
        >
          <img src="/assets/door.jpg" alt="" className="absolute max-w-none" style={{
            width: '666.66%',
            height: '125%',
            left: '-333.33%', // -50 / 15 * 100
            top: '-25%',
          }} />
        </motion.div>
      </div>

      {/* LAYER 3: The Exterior Walls (with a hole cut out for the doors) */}
      <div 
        className={`${coverAspectClass} z-20 pointer-events-none`}
        style={{ clipPath: archClipPath }}
      >
        <img src="/assets/door.jpg" alt="Exterior" className="w-full h-full object-cover" />
      </div>
      
      {/* Ambient shadow / fade to black during entry to smooth transition to Scene 1 */}
      <motion.div 
        className="absolute inset-0 z-30 pointer-events-none bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpening ? 0.3 : 0 }}
        transition={{ duration: 4 }}
      />
    </motion.div>
  );
}
