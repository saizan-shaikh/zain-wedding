import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CinematicText, CinematicElement } from './CinematicText';
import { SceneBackground } from './SceneBackground';
import { weddingData } from '../data/weddingData';

interface Scene1Props {
  onComplete: () => void;
}

export default function Scene1({ onComplete }: Scene1Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 18000); 
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
      <SceneBackground imageSrc="/assets/ref_s2.jpg" overlayOpacity={0.0} />

      <div className="relative z-20 flex flex-col items-center justify-center gap-[4vh] w-full max-w-[calc(100vh*9/16)] h-full px-8 py-16 mx-auto">
        
        {/* 1. BISMILLAH */}
        <CinematicElement delayOffset={1} duration={3} className="min-h-[60px]">
          <h2 className="font-arabic text-clamp-2xl text-[#3B4232] drop-shadow-sm leading-relaxed">
            {weddingData.bismillah}
          </h2>
        </CinematicElement>

        {/* 2. DUA */}
        <CinematicText 
          text={weddingData.duaShort}
          delayOffset={3.5}
          wordDelay={0.3}
          className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-[#5C6551] uppercase"
        />

        {/* 3. COUPLE NAMES */}
        <div className="flex flex-col items-center justify-center gap-2 my-4">
          <CinematicElement delayOffset={6}>
            <h1 className="font-serif text-clamp-5xl text-[#2A3122] tracking-widest leading-none">
              {weddingData.couple.groom}
            </h1>
          </CinematicElement>
          
          <CinematicElement delayOffset={8.5} duration={2} blurAmount="5px">
            <span className="font-serif text-3xl md:text-5xl text-[#A68F63] italic font-light">
              &amp;
            </span>
          </CinematicElement>
          
          <CinematicElement delayOffset={10}>
            <h1 className="font-serif text-clamp-5xl text-[#2A3122] tracking-widest leading-none">
              {weddingData.couple.bride}
            </h1>
          </CinematicElement>
        </div>

        {/* 4. DATE */}
        <CinematicElement delayOffset={13} className="flex items-center space-x-4 text-[#5C6551] my-2">
          <span className="h-[1px] w-8 md:w-12 bg-[#A68F63]/40 block" />
          <p className="font-serif text-xs md:text-sm tracking-[0.2em] whitespace-nowrap text-[#454D3C]">
            {weddingData.dateFull}
          </p>
          <span className="h-[1px] w-8 md:w-12 bg-[#A68F63]/40 block" />
        </CinematicElement>

        {/* 5. INVITATION MESSAGE */}
        <CinematicText 
          text={weddingData.inviteMessage}
          delayOffset={15}
          wordDelay={0.2}
          className="font-sans text-[9px] md:text-xs tracking-[0.1em] text-[#5C6551] max-w-lg leading-loose uppercase"
        />
      </div>
    </motion.div>
  );
}
