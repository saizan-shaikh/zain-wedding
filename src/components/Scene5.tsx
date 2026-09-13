import { useEffect } from 'react';
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
      <SceneBackground imageSrc="/assets/floral_bg.jpg" overlayOpacity={0.0} />

      <div className="relative z-20 flex flex-col items-center justify-center gap-[4vh] w-full max-w-[calc(100vh*9/16)] h-full px-8 py-16 mx-auto">
        
        {/* Intimate Warm Bismillah */}
        <CinematicElement delayOffset={1} duration={3}>
          <p className="font-arabic text-2xl md:text-3xl text-[#3B4232] mb-[2vh]">
            {weddingData.bismillah}
          </p>
        </CinematicElement>

        <div className="flex flex-col items-center gap-[3vh] w-full">
          {/* Bride Family */}
          <div className="flex flex-col items-center gap-[1vh]">
            <CinematicElement delayOffset={3.5}>
              <h3 className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-[#5C6551] uppercase">
                {weddingData.families.brideFamily.title}
              </h3>
            </CinematicElement>
            <CinematicElement delayOffset={5}>
              <p className="font-serif text-lg md:text-xl text-[#2A3122] font-semibold">
                {weddingData.families.brideFamily.names}
              </p>
            </CinematicElement>
            <CinematicElement delayOffset={6}>
              <p className="font-serif text-[11px] md:text-xs text-[#5C6551] italic">
                {weddingData.families.brideFamily.blessing}
              </p>
            </CinematicElement>
          </div>

          <CinematicElement delayOffset={7} className="w-full">
            <div className="flex items-center justify-center gap-4 opacity-60">
              <span className="w-12 h-[1px] bg-[#A68F63]" />
              <span className="text-[#A68F63] text-lg">✿</span>
              <span className="w-12 h-[1px] bg-[#A68F63]" />
            </div>
          </CinematicElement>

          {/* Groom Family */}
          <div className="flex flex-col items-center gap-[1vh]">
            <CinematicElement delayOffset={7.5}>
              <h3 className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-[#5C6551] uppercase">
                {weddingData.families.groomFamily.title}
              </h3>
            </CinematicElement>
            <CinematicElement delayOffset={9}>
              <p className="font-serif text-lg md:text-xl text-[#2A3122] font-semibold">
                {weddingData.families.groomFamily.names}
              </p>
            </CinematicElement>
            <CinematicElement delayOffset={10}>
              <p className="font-serif text-[11px] md:text-xs text-[#5C6551] italic">
                {weddingData.families.groomFamily.blessing}
              </p>
            </CinematicElement>
          </div>
        </div>

        {/* Venue Section */}
        <div className="flex flex-col items-center gap-[1vh] mt-[3vh]">
          <CinematicElement delayOffset={12.5}>
            <h3 className="font-sans text-[10px] md:text-xs tracking-[0.3em] text-[#5C6551] uppercase">
              {weddingData.venue.title}
            </h3>
          </CinematicElement>
          
          <CinematicElement delayOffset={13.5}>
            <span className="text-xl text-[#A68F63] block mb-1">⌂</span>
          </CinematicElement>

          <CinematicElement delayOffset={14.5}>
            <p className="font-serif text-lg md:text-xl text-[#2A3122]">
              {weddingData.venue.name}
            </p>
          </CinematicElement>
          <CinematicElement delayOffset={15.5}>
            <p className="font-sans text-xs md:text-sm tracking-[0.1em] text-[#454D3C]">
              {weddingData.venue.city}
            </p>
          </CinematicElement>
        </div>
      </div>
    </motion.div>
  );
}
