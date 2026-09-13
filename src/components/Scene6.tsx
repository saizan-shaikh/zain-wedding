import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CinematicText, CinematicElement } from './CinematicText';
import { SceneBackground } from './SceneBackground';
import { weddingData } from '../data/weddingData';

export default function Scene6() {
  return (
    <motion.div 
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5 }}
    >
      <SceneBackground imageSrc="/assets/scene6.jpg" overlayOpacity={0.4} zoomDuration={40} />

      <div className="relative z-10 flex flex-col items-center justify-center gap-[4vh] w-full max-w-3xl h-full px-6 py-12">
        
        {/* Grand Final Bismillah */}
        <CinematicElement delayOffset={2} duration={4} blurAmount="10px">
          <p className="font-arabic text-4xl md:text-5xl text-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] mb-[2vh]">
            {weddingData.bismillah}
          </p>
        </CinematicElement>

        {/* Couple Names */}
        <CinematicElement delayOffset={5}>
          <h2 className="font-serif text-clamp-2xl tracking-[0.2em] text-ivory drop-shadow-xl">
            {weddingData.couple.groom} &amp; {weddingData.couple.bride}
          </h2>
        </CinematicElement>

        {/* Date */}
        <CinematicElement delayOffset={7}>
          <p className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-champagne uppercase">
            {weddingData.dateFull}
          </p>
        </CinematicElement>

        {/* Dua */}
        <CinematicElement delayOffset={10} duration={3} className="my-[2vh]">
          <p className="font-serif text-sm md:text-lg text-gold-light/90 italic leading-loose">
            "{weddingData.closing.dua}"
          </p>
        </CinematicElement>

        {/* Closing Message */}
        <CinematicText 
          text={weddingData.closing.message}
          delayOffset={14}
          wordDelay={0.3}
          className="font-sans text-[10px] md:text-xs tracking-[0.1em] text-ivory/80 uppercase leading-loose"
        />

        {/* Signoff */}
        <CinematicElement delayOffset={18} duration={3} className="mt-[2vh]">
          <p className="font-serif text-xl md:text-2xl text-ivory">
            {weddingData.closing.signoff}
            <br />
            <span className="text-sm md:text-base text-gold mt-2 block tracking-widest uppercase">
              {weddingData.couple.groom} &amp; {weddingData.couple.bride}
            </span>
          </p>
        </CinematicElement>
        
      </div>
    </motion.div>
  );
}
