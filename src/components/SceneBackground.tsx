import { motion } from 'framer-motion';

interface SceneBackgroundProps {
  imageSrc: string;
  zoomDuration?: number;
  particles?: boolean;
  overlayOpacity?: number;
  isWalkingScene?: boolean;
}

export function SceneBackground({ 
  imageSrc, 
  zoomDuration = 30, 
  particles = true, 
  overlayOpacity = 0.0,
  isWalkingScene = false
}: SceneBackgroundProps) {
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#f4f1eb] pointer-events-none flex items-center justify-center w-full h-full">
      
      {/* 
        The background image now completely fills the viewport using object-cover 
        and object-top. This ensures the ornamental top arch and floral borders 
        reach the edges naturally on all devices without any empty card margins, 
        satisfying the true full-screen requirement.
      */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {isWalkingScene ? (
          <motion.img 
            src={imageSrc} 
            alt="Background" 
            className="w-full h-full object-cover object-top transform-origin-bottom"
            initial={{ scale: 1.0, y: 0 }}
            animate={{ scale: 1.15, y: '5%' }}
            transition={{ duration: zoomDuration, ease: "linear" }}
          />
        ) : (
          <motion.img 
            src={imageSrc} 
            alt="Background" 
            className="w-full h-full object-cover object-top"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.03 }}
            transition={{ duration: zoomDuration, ease: "linear" }}
          />
        )}
        
        {/* Soft shadow overlay only if requested */}
        {overlayOpacity > 0 && (
          <div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: overlayOpacity }} />
        )}
      </div>

      {/* Floating Petals/Dust */}
      {particles && (
        <div className="absolute inset-0 overflow-hidden z-20 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full bg-champagne/60 mix-blend-screen"
              style={{ filter: `blur(${Math.random() * 2 + 1}px)` }}
              initial={{ 
                x: `${Math.random() * 100}vw`, 
                y: '110vh',
                opacity: 0,
                rotate: Math.random() * 360,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: '-10vh',
                x: `${Math.random() * 100}vw`,
                opacity: [0, 1, 1, 0],
                rotate: Math.random() * 360 + 180
              }}
              transition={{ 
                duration: 15 + Math.random() * 20, 
                repeat: Infinity,
                delay: Math.random() * 15,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
