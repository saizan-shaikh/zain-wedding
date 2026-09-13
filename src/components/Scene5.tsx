import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CinematicElement } from './CinematicText';
import { SceneBackground } from './SceneBackground';
import { weddingData } from '../data/weddingData';

interface Scene5Props {
  onComplete: () => void;
}

export default function Scene5({ onComplete }: Scene5Props) {
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
      <SceneBackground imageSrc="/assets/interior.jpg" overlayOpacity={0.7} zoomDuration={19} />

      <div className="relative z-10 flex flex-col items-center justify-center gap-[5vh] w-full max-w-4xl h-full px-6 py-8">
        
        {/* Intimate Warm Bismillah */}
        <CinematicElement delayOffset={1} duration={3}>
          <p className="font-arabic text-xl md:text-2xl text-champagne/90 drop-shadow-sm mb-[1vh]">
            {weddingData.bismillah}
          </p>
        </CinematicElement>

        <div className="flex flex-col md:flex-row justify-center gap-[4vh] md:gap-[8vw] w-full">
          {/* Bride Family */}
          <div className="flex flex-col items-center gap-[1vh]">
            <CinematicElement delayOffset={3.5}>
              <h3 className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-gold-light uppercase">
                {weddingData.families.brideFamily.title}
              </h3>
            </CinematicElement>
            <CinematicElement delayOffset={5}>
              <p className="font-serif text-lg md:text-xl text-ivory">
                {weddingData.families.brideFamily.names}
              </p>
            </CinematicElement>
            <CinematicElement delayOffset={6}>
              <p className="font-sans text-[9px] md:text-xs text-champagne/80 italic">
                {weddingData.families.brideFamily.blessing}
              </p>
            </CinematicElement>
          </div>

          {/* Groom Family */}
          <div className="flex flex-col items-center gap-[1vh]">
            <CinematicElement delayOffset={7.5}>
              <h3 className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-gold-light uppercase">
                {weddingData.families.groomFamily.title}
              </h3>
            </CinematicElement>
            <CinematicElement delayOffset={9}>
              <p className="font-serif text-lg md:text-xl text-ivory">
                {weddingData.families.groomFamily.names}
              </p>
            </CinematicElement>
            <CinematicElement delayOffset={10}>
              <p className="font-sans text-[9px] md:text-xs text-champagne/80 italic">
                {weddingData.families.groomFamily.blessing}
              </p>
            </CinematicElement>
          </div>
        </div>

        {/* Venue Section */}
        <div className="flex flex-col items-center gap-[1.5vh] mt-[2vh]">
          <CinematicElement delayOffset={12.5}>
            <h3 className="font-sans text-[10px] md:text-xs tracking-[0.3em] text-gold uppercase">
              {weddingData.venue.title}
            </h3>
          </CinematicElement>
          <CinematicElement delayOffset={13.5}>
            <p className="font-serif text-2xl md:text-3xl text-ivory drop-shadow-lg">
              {weddingData.venue.name}
            </p>
          </CinematicElement>
          <CinematicElement delayOffset={14.5}>
            <p className="font-sans text-xs md:text-sm tracking-[0.1em] text-champagne">
              {weddingData.venue.city}
            </p>
          </CinematicElement>
        </div>

      </div>
    </motion.div>
  );
}
