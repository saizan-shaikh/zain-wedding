import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CinematicElement } from './CinematicText';
import { SceneBackground } from './SceneBackground';
import { weddingData } from '../data/weddingData';

interface Scene3Props {
  onComplete: () => void;
}

export default function Scene3({ onComplete }: Scene3Props) {
  useEffect(() => {
    // Reveal text (6s) + Walk (3s) + Hold (3s) = 12s
    const timer = setTimeout(() => {
      onComplete();
    }, 12000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Bobbing animation to simulate walking footsteps POV
  const walkBobbing: import('framer-motion').TargetAndTransition = {
    y: [0, -3, 0, -3, 0, -3, 0],
    scale: [1.05, 1.15],
    transition: { 
      y: { duration: 3, ease: "easeInOut", repeat: Infinity },
      scale: { duration: 12, ease: "linear" }
    }
  };

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      transition={{ duration: 2 }}
    >
      <motion.div className="absolute inset-0 w-full h-full origin-bottom" animate={walkBobbing}>
        <SceneBackground 
          imageSrc="/assets/ref_s3.jpg" 
          overlayOpacity={0.15} 
          zoomDuration={12} 
          particles={true}
          isWalkingScene={true}
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-start pt-[10vh] gap-[3vh] w-full max-w-4xl h-full px-6 pointer-events-none">
        
        {/* Subtle Sky Bismillah */}
        <CinematicElement delayOffset={1} duration={3} blurAmount="5px">
          <p className="font-arabic text-2xl md:text-3xl text-ivory/70 drop-shadow-lg tracking-widest opacity-80">
            {weddingData.bismillah}
          </p>
        </CinematicElement>

        <div className="mt-[5vh] flex flex-col gap-[2vh]">
          <CinematicElement delayOffset={3} duration={2.5}>
            <h3 className="font-serif text-xl md:text-3xl tracking-[0.2em] text-ivory drop-shadow-xl">
              {weddingData.scene3.message1}
            </h3>
          </CinematicElement>
          
          <CinematicElement delayOffset={5} duration={2.5}>
            <h3 className="font-serif text-xl md:text-3xl tracking-[0.2em] text-champagne drop-shadow-xl">
              {weddingData.scene3.message2}
            </h3>
          </CinematicElement>
        </div>

      </div>
    </motion.div>
  );
}
