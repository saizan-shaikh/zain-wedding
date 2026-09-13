import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SceneDoor from './SceneDoor';
import Scene1 from './Scene1';
import Scene2 from './Scene2';
import Scene3 from './Scene3';
import Scene4 from './Scene4';
import Scene5 from './Scene5';
import Scene6 from './Scene6';
import { TransitionOverlay } from './TransitionOverlay';

export default function SceneController() {
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const nextScene = () => {
    // 1. Start petal transition
    setIsTransitioning(true);
    
    // 2. Wait for petals to cover the screen before fading out the old scene
    setTimeout(() => {
      setCurrentScene(prev => prev + 1);
      
      // 3. Let the new scene fade in, then fade out the petals
      setTimeout(() => {
        setIsTransitioning(false);
      }, 3000);
      
    }, 2000);
  };

  // The door transition doesn't need heavy petals, just camera zoom. 
  // We'll handle door specifically.
  const handleDoorOpen = () => {
    setCurrentScene(1);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black font-sans">
      <TransitionOverlay isActive={isTransitioning} />
      
      <AnimatePresence mode="wait">
        {currentScene === 0 && <SceneDoor key="s0" onEnter={handleDoorOpen} />}
        {currentScene === 1 && <Scene1 key="s1" onComplete={nextScene} />}
        {currentScene === 2 && <Scene2 key="s2" onComplete={nextScene} />}
        {currentScene === 3 && <Scene3 key="s3" onComplete={nextScene} />}
        {currentScene === 4 && <Scene4 key="s4" onComplete={nextScene} />}
        {currentScene === 5 && <Scene5 key="s5" onComplete={nextScene} />}
        {currentScene === 6 && <Scene6 key="s6" />}
      </AnimatePresence>
    </div>
  );
}
