import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CinematicElement } from './CinematicText';
import { SceneBackground } from './SceneBackground';
import { weddingData } from '../data/weddingData';

interface Scene4Props {
  onComplete: () => void;
}

export default function Scene4({ onComplete }: Scene4Props) {
  useEffect(() => {
    // Bismillah (3s) + 2 events * 4s = 11s + initial 2s + 3s hold = 16s
    const timer = setTimeout(() => {
      onComplete();
    }, 16000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      transition={{ duration: 2 }}
    >
      <SceneBackground imageSrc="/assets/scene4.jpg" overlayOpacity={0.65} zoomDuration={18} />

      <div className="relative z-10 flex flex-col items-center justify-center gap-[6vh] w-full max-w-4xl h-full px-6 py-12">
        
        {/* Formal Ornamental Bismillah */}
        <CinematicElement delayOffset={1} duration={2.5} className="flex items-center space-x-6 border-b border-gold/30 pb-4 mb-[2vh]">
          <span className="w-12 h-[1px] bg-gold-light/40" />
          <p className="font-arabic text-xl md:text-2xl text-gold drop-shadow-md">
            {weddingData.bismillah}
          </p>
          <span className="w-12 h-[1px] bg-gold-light/40" />
        </CinematicElement>

        {weddingData.events.map((event, index) => {
          const baseDelay = 4 + (index * 4); // each event spaced by 4 seconds, starting after Bismillah
          
          return (
            <div key={index} className="flex flex-col items-center gap-[1.5vh]">
              {/* Event Title */}
              <CinematicElement delayOffset={baseDelay}>
                <h2 className="font-serif text-clamp-2xl tracking-[0.2em] text-gold-light">
                  {event.title}
                </h2>
              </CinematicElement>
              
              {/* Event Date & Time */}
              <CinematicElement delayOffset={baseDelay + 1.5}>
                <p className="font-sans text-xs md:text-sm tracking-[0.1em] text-ivory/90 uppercase">
                  {event.date} • {event.time}
                </p>
              </CinematicElement>
              
              {/* Event Location */}
              <CinematicElement delayOffset={baseDelay + 2.5}>
                <p className="font-serif text-sm md:text-lg tracking-[0.1em] text-champagne italic">
                  {event.location}
                </p>
              </CinematicElement>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
