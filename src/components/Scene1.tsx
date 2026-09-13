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
    // 15 seconds sequence + 3 second hold
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
      <SceneBackground imageSrc="/assets/interior.jpg" overlayOpacity={0.45} />

      {/* Foreground Content - Centered with flex gap to prevent collision */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-[4vh] w-full max-w-5xl h-full px-6 py-12">
        
        {/* 1. BISMILLAH */}
        <CinematicElement delayOffset={1} duration={3} className="min-h-[60px]">
          <h2 className="font-arabic text-clamp-2xl text-gold-light drop-shadow-md leading-relaxed">
            {weddingData.bismillah}
          </h2>
        </CinematicElement>

        {/* 2. DUA */}
        <CinematicText 
          text={weddingData.duaShort}
          delayOffset={3.5}
          wordDelay={0.3}
          className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-champagne uppercase"
        />

        {/* 3. COUPLE NAMES */}
        <div className="flex flex-col items-center justify-center gap-2 my-2">
          <CinematicElement delayOffset={6}>
            <h1 className="font-serif text-clamp-5xl text-ivory tracking-widest leading-none drop-shadow-lg">
              {weddingData.couple.groom}
            </h1>
          </CinematicElement>
          
          <CinematicElement delayOffset={8.5} duration={2} blurAmount="5px">
            <span className="font-serif text-3xl md:text-5xl text-gold italic font-light drop-shadow-md">
              &amp;
            </span>
          </CinematicElement>
          
          <CinematicElement delayOffset={10}>
            <h1 className="font-serif text-clamp-5xl text-ivory tracking-widest leading-none drop-shadow-lg">
              {weddingData.couple.bride}
            </h1>
          </CinematicElement>
        </div>

        {/* 4. DATE */}
        <CinematicElement delayOffset={13} className="flex items-center space-x-4 text-champagne my-2">
          <span className="h-[1px] w-8 md:w-12 bg-gold/50 block" />
          <p className="font-serif text-xs md:text-sm tracking-[0.2em] whitespace-nowrap">
            {weddingData.dateFull}
          </p>
          <span className="h-[1px] w-8 md:w-12 bg-gold/50 block" />
        </CinematicElement>

        {/* 5. INVITATION MESSAGE */}
        <CinematicText 
          text={weddingData.inviteMessage}
          delayOffset={15}
          wordDelay={0.2}
          className="font-sans text-[9px] md:text-xs tracking-[0.1em] text-ivory/80 max-w-lg leading-loose uppercase"
        />
      </div>
    </motion.div>
  );
}
