import { motion } from 'framer-motion';

interface SceneBackgroundProps {
  imageSrc: string;
  zoomDuration?: number;
  particles?: boolean;
  overlayOpacity?: number;
  isWalkingScene?: boolean;
  bgColor?: string;
}

export function SceneBackground({ 
  imageSrc, 
  zoomDuration = 30, 
  particles = true, 
  overlayOpacity = 0.0,
  isWalkingScene = false,
  bgColor = '#F5F3EC'
}: SceneBackgroundProps) {
  
  // A seamless background for the entire viewport to eliminate "dark/gray margins"
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center w-full h-full" style={{ backgroundColor: bgColor }}>
      
      {/* 
        The image container is restricted to preserving the natural aspect ratio 
        so it never excessively crops or zooms on desktop, fulfilling the requirement:
        "The background/design should cover the viewport while preserving its proper composition and proportions."
      */}
      <div className="relative z-10 w-full h-full max-w-[min(100vw,calc(100vh*0.45))] mx-auto flex items-center justify-center">
        {isWalkingScene ? (
          <motion.img 
            src={imageSrc} 
            alt="Background" 
            className="w-full h-full object-cover object-top transform-origin-bottom"
            initial={{ scale: 1.0, y: 0 }}
            animate={{ scale: 1.05, y: '2%' }} // Subtler animation as requested
            transition={{ duration: zoomDuration, ease: "linear" }}
          />
        ) : (
          <motion.img 
            src={imageSrc} 
            alt="Background" 
            className="w-full h-full object-cover object-top"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.02 }} // Subtler animation
            transition={{ duration: zoomDuration, ease: "linear" }}
          />
        )}
        
        {/* Soft shadow overlay only if requested (e.g. night scenes) */}
        {overlayOpacity > 0 && (
          <div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: overlayOpacity }} />
        )}
      </div>

      {/* Floating Petals/Dust */}
      {particles && (
        <div className="absolute inset-0 overflow-hidden z-20 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full bg-champagne/40 mix-blend-screen"
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
                duration: 20 + Math.random() * 20, 
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
