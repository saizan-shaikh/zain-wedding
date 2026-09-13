import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CinematicText, CinematicElement } from './CinematicText';
import { SceneBackground } from './SceneBackground';
import { weddingData } from '../data/weddingData';

interface Scene2Props {
  onComplete: () => void;
}

export default function Scene2({ onComplete }: Scene2Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 17000); 
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
      <SceneBackground imageSrc="/assets/floral_bg.jpg" overlayOpacity={0.0} />

      <div className="relative z-20 flex flex-col items-center justify-center gap-[4vh] w-full max-w-[calc(100vh*9/16)] h-full px-8 py-16 mx-auto">
        
        {/* Arch-framed Bismillah (now using subtle floral colors) */}
        <CinematicElement delayOffset={1} duration={2.5}>
          <div className="px-6 py-4 mb-[2vh]">
            <p className="font-arabic text-2xl md:text-3xl text-[#3B4232]">
              {weddingData.bismillah}
            </p>
          </div>
        </CinematicElement>

        {/* Intro */}
        <CinematicText 
          text={weddingData.scene2.intro}
          delayOffset={3}
          wordDelay={0.3}
          className="font-sans text-xs md:text-sm tracking-[0.3em] text-[#5C6551] uppercase"
        />

        {/* Names */}
        <div className="flex flex-col items-center justify-center gap-1 my-4">
          <CinematicElement delayOffset={5}>
            <h1 className="font-serif text-clamp-5xl text-[#2A3122] tracking-widest leading-none">
              {weddingData.couple.groom}
            </h1>
          </CinematicElement>
          
          <CinematicElement delayOffset={6.5} duration={2} blurAmount="5px">
            <span className="font-serif text-3xl md:text-5xl text-[#A68F63] italic font-light">
              &amp;
            </span>
          </CinematicElement>
          
          <CinematicElement delayOffset={7.5}>
            <h1 className="font-serif text-clamp-5xl text-[#2A3122] tracking-widest leading-none">
              {weddingData.couple.bride}
            </h1>
          </CinematicElement>
        </div>

        {/* Date */}
        <CinematicElement delayOffset={10.5}>
          <p className="font-serif text-sm md:text-base tracking-[0.2em] text-[#454D3C]">
            {weddingData.dateFull}
          </p>
        </CinematicElement>

        {/* Beautiful Beginning */}
        <CinematicText 
          text={weddingData.scene2.message}
          delayOffset={12.5}
          wordDelay={0.2}
          className="font-sans text-[10px] md:text-xs tracking-[0.1em] text-[#5C6551] uppercase italic"
        />
      </div>
    </motion.div>
  );
}
