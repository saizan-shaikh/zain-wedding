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
      <SceneBackground imageSrc="/assets/ref_s6.jpg" overlayOpacity={0.2} zoomDuration={20} bgColor="#000000" />

      <div className="relative z-10 flex flex-col items-center justify-center gap-[3vh] w-full max-w-[min(100vw,calc(100vh*0.45))] h-full px-6 py-12 mx-auto">
        
        {/* Grand Final Bismillah */}
        <CinematicElement delayOffset={2} duration={4} blurAmount="10px">
          <p className="font-arabic text-2xl md:text-3xl text-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] mt-[2vh] mb-[1vh]">
            {weddingData.bismillah}
          </p>
        </CinematicElement>

        {/* Couple Names */}
        <CinematicElement delayOffset={5}>
          <h2 className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-ivory drop-shadow-xl">
            {weddingData.couple.groom} &amp; {weddingData.couple.bride}
          </h2>
        </CinematicElement>

        {/* Date */}
        <CinematicElement delayOffset={7}>
          <p className="font-sans text-[8px] md:text-[10px] tracking-[0.2em] text-champagne uppercase">
            {weddingData.dateFull}
          </p>
        </CinematicElement>

        {/* Dua */}
        <CinematicElement delayOffset={10} duration={3} className="my-[1vh]">
          <p className="font-serif text-sm md:text-base text-gold-light/90 italic leading-loose max-w-[80%] mx-auto">
            "{weddingData.closing.dua}"
          </p>
        </CinematicElement>

        {/* Closing Message */}
        <CinematicText 
          text={weddingData.closing.message}
          delayOffset={14}
          wordDelay={0.3}
          className="font-sans text-[8px] md:text-[10px] tracking-[0.1em] text-ivory/80 uppercase leading-loose"
        />

        {/* Signoff */}
        <CinematicElement delayOffset={18} duration={3} className="mt-[1vh]">
          <p className="font-serif text-lg md:text-xl text-ivory">
            {weddingData.closing.signoff}
            <br />
            <span className="text-[10px] md:text-xs text-gold mt-2 block tracking-widest uppercase">
              {weddingData.couple.groom} &amp; {weddingData.couple.bride}
            </span>
          </p>
        </CinematicElement>
        
      </div>
    </motion.div>
  );
}
