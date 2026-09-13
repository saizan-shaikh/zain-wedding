import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface CinematicTextProps extends HTMLMotionProps<"div"> {
  text: string;
  delayOffset?: number;
  wordDelay?: number;
  className?: string;
  wordClassName?: string;
  splitByLine?: boolean;
}

export function CinematicText({ 
  text, 
  delayOffset = 0, 
  wordDelay = 0.4, 
  className = "", 
  wordClassName = "",
  splitByLine = false,
  ...props 
}: CinematicTextProps) {
  
  // Split by line if requested (useful for multi-line dua/message)
  const segments = splitByLine ? text.split('\n') : text.split(" ");
  
  return (
    <motion.div 
      className={`flex flex-wrap justify-center ${className}`}
      {...props}
    >
      {segments.map((segment, i) => (
        <motion.span
          key={i}
          className={`${splitByLine ? 'block w-full' : 'mx-[0.2em] inline-block'} ${wordClassName}`}
          initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ 
            duration: 2, 
            delay: delayOffset + (i * wordDelay), 
            ease: [0.25, 0.1, 0.25, 1] 
          }}
        >
          {segment}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Dedicated single element fade-in (for names, ampersands, etc)
interface CinematicElementProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delayOffset?: number;
  duration?: number;
  yOffset?: number;
  blurAmount?: string;
}

export function CinematicElement({
  children,
  delayOffset = 0,
  duration = 2.5,
  yOffset = 20,
  blurAmount = '15px',
  ...props
}: CinematicElementProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, filter: `blur(${blurAmount})` }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration, delay: delayOffset, ease: [0.25, 1, 0.5, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
