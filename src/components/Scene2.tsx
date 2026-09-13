import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CinematicText, CinematicElement } from './CinematicText';
import { SceneBackground } from './SceneBackground';
import { weddingData } from '../data/weddingData';

interface Scene2Props {
  onComplete: () => void;
}

export default function Scene2({ onComplete }: Scene2Props) {
  useEffect(() => {
    // 14s animation sequence + 3s hold
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
      {/* Slightly more opaque overlay for focus */}
      <SceneBackground imageSrc="/assets/interior.jpg" overlayOpacity={0.6} zoomDuration={20} />

      <div className="relative z-10 flex flex-col items-center justify-center gap-[4vh] w-full max-w-4xl h-full px-6 py-12">
        
        {/* Arch-framed Bismillah */}
        <CinematicElement delayOffset={1} duration={2.5}>
          <div className="px-8 py-6 border-t-2 border-l border-r border-gold/30 rounded-t-full bg-black/20 backdrop-blur-sm mb-[2vh]">
            <p className="font-arabic text-2xl md:text-3xl text-gold-light">
              {weddingData.bismillah}
            </p>
          </div>
        </CinematicElement>

        {/* Intro */}
        <CinematicText 
          text={weddingData.scene2.intro}
          delayOffset={3}
          wordDelay={0.3}
          className="font-sans text-xs md:text-sm tracking-[0.3em] text-champagne/90 uppercase"
        />

        {/* Names */}
        <div className="flex flex-col items-center justify-center gap-1 my-4">
          <CinematicElement delayOffset={5}>
            <h1 className="font-serif text-clamp-5xl text-ivory tracking-widest leading-none drop-shadow-xl">
              {weddingData.couple.groom}
            </h1>
          </CinematicElement>
          
          <CinematicElement delayOffset={6.5} duration={2} blurAmount="5px">
            <span className="font-serif text-3xl md:text-5xl text-gold italic font-light">
              &amp;
            </span>
          </CinematicElement>
          
          <CinematicElement delayOffset={7.5}>
            <h1 className="font-serif text-clamp-5xl text-ivory tracking-widest leading-none drop-shadow-xl">
              {weddingData.couple.bride}
            </h1>
          </CinematicElement>
        </div>

        {/* Date */}
        <CinematicElement delayOffset={10.5}>
          <p className="font-serif text-sm md:text-base tracking-[0.2em] text-champagne">
            {weddingData.dateFull}
          </p>
        </CinematicElement>

        {/* Beautiful Beginning */}
        <CinematicText 
          text={weddingData.scene2.message}
          delayOffset={12.5}
          wordDelay={0.2}
          className="font-sans text-[10px] md:text-xs tracking-[0.1em] text-ivory/80 uppercase"
        />
      </div>
    </motion.div>
  );
}
