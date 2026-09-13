
import { motion } from 'framer-motion';

interface SceneBackgroundProps {
  imageSrc: string;
  zoomDuration?: number;
  particles?: boolean;
  overlayOpacity?: number;
  isWalkingScene?: boolean; // specialized flag for scene 3
}

export function SceneBackground({ 
  imageSrc, 
  zoomDuration = 30, 
  particles = true, 
  overlayOpacity = 0.4,
  isWalkingScene = false
}: SceneBackgroundProps) {
  
  const coverAspectClass = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100vh] w-[max(100vw,calc(100vh*16/9))] h-[max(100vh,calc(100vw*9/16))]";

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none">
      <div className={coverAspectClass}>
        {isWalkingScene ? (
          // Scene 3 logic: Zoom the background to simulate walking forward
          <motion.img 
            src={imageSrc} 
            alt="Background" 
            className="w-full h-full object-cover transform-origin-bottom"
            initial={{ scale: 1.1, y: 0 }}
            animate={{ scale: 1.3, y: '5%' }} // zoom in and shift slightly down to simulate moving forward
            transition={{ duration: zoomDuration, ease: "linear" }}
          />
        ) : (
          // Normal scenes: Slow, subtle breathing zoom
          <motion.img 
            src={imageSrc} 
            alt="Background" 
            className="w-full h-full object-cover"
            initial={{ scale: 1.02 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: zoomDuration, ease: "linear" }}
          />
        )}
        
        {/* Soft shadow overlay for text readability */}
        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      </div>

      {/* Floating Petals/Dust */}
      {particles && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
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
