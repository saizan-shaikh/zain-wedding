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
  overlayOpacity = 0.2, // Lighter overlay for the cream theme
  isWalkingScene = false
}: SceneBackgroundProps) {
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-stone-900 pointer-events-none flex items-center justify-center">
      
      {/* Blurred Background layer to fill desktop screens beautifully */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img src={imageSrc} className="w-full h-full object-cover blur-2xl transform scale-110" alt="blur-bg" />
      </div>

      {/* Main image layer - uses object-contain to never break borders on any device */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {isWalkingScene ? (
          <motion.img 
            src={imageSrc} 
            alt="Background" 
            className="w-full h-full object-contain transform-origin-bottom drop-shadow-2xl"
            initial={{ scale: 1.0, y: 0 }}
            animate={{ scale: 1.15, y: '5%' }}
            transition={{ duration: zoomDuration, ease: "linear" }}
          />
        ) : (
          <motion.img 
            src={imageSrc} 
            alt="Background" 
            className="w-full h-full object-contain drop-shadow-2xl"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.03 }}
            transition={{ duration: zoomDuration, ease: "linear" }}
          />
        )}
        
        {/* Soft shadow overlay */}
        <div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: overlayOpacity }} />
      </div>

      {/* Floating Petals/Dust */}
      {particles && (
        <div className="absolute inset-0 overflow-hidden z-20 pointer-events-none">
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
