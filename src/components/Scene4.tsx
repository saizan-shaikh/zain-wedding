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
      <SceneBackground imageSrc="/assets/ref_s4.jpg" overlayOpacity={0.0} />

      <div className="relative z-20 flex flex-col items-center justify-center gap-[4vh] w-full max-w-[calc(100vh*9/16)] h-full px-8 py-16 mx-auto">
        
        {/* Formal Ornamental Bismillah */}
        <CinematicElement delayOffset={1} duration={2.5} className="flex items-center space-x-4 mb-[2vh]">
          <p className="font-arabic text-xl md:text-2xl text-[#3B4232]">
            {weddingData.bismillah}
          </p>
        </CinematicElement>

        <CinematicElement delayOffset={3} className="mb-[2vh]">
          <h3 className="font-sans text-xs md:text-sm tracking-[0.3em] text-[#5C6551] uppercase font-medium">
            Wedding Events
          </h3>
        </CinematicElement>

        {weddingData.events.map((event, index) => {
          const baseDelay = 4 + (index * 4); // each event spaced by 4 seconds, starting after Bismillah
          
          return (
            <div key={index} className="flex flex-col items-center gap-[1vh] mb-[2vh] w-full">
              
              <CinematicElement delayOffset={baseDelay}>
                {index === 0 ? (
                  // Nikah Rings Icon (Using text as a placeholder since we don't have SVG, or just a decorative element)
                  <span className="text-2xl text-[#A68F63]">⚭</span>
                ) : (
                  // Walima Food/Plate Icon or decorative divider
                  <span className="text-xl text-[#A68F63]">✧</span>
                )}
              </CinematicElement>

              <CinematicElement delayOffset={baseDelay + 0.5}>
                <h2 className="font-serif text-2xl md:text-3xl tracking-widest text-[#2A3122] uppercase font-bold">
                  {event.title}
                </h2>
              </CinematicElement>
              
              <CinematicElement delayOffset={baseDelay + 1.5}>
                <p className="font-sans text-xs md:text-sm tracking-[0.1em] text-[#454D3C]">
                  {event.date}
                </p>
              </CinematicElement>
              
              <CinematicElement delayOffset={baseDelay + 2.5}>
                <p className="font-sans text-xs md:text-sm tracking-[0.1em] text-[#454D3C]">
                  {event.time}
                </p>
              </CinematicElement>
              
              <CinematicElement delayOffset={baseDelay + 3.5}>
                <p className="font-serif text-sm md:text-base text-[#5C6551] italic mt-1">
                  {event.location}
                </p>
              </CinematicElement>

              {index !== weddingData.events.length - 1 && (
                <CinematicElement delayOffset={baseDelay + 4} className="mt-[2vh]">
                   <span className="w-16 h-[1px] bg-[#A68F63]/30 block mx-auto" />
                </CinematicElement>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
