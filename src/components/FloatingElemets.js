import React, { useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export const FloatingElement = ({ children, className = "" }) => {
    return (
      <motion.div
        className={className}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.div>
    );
  };
  
  // ParallaxSection.js
  export const ParallaxSection = ({ children, offset = 50 }) => {
    return (
      <motion.div
        style={{
          translateY: 0
        }}
        animate={{
          translateY: [-offset, offset],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 3,
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.div>
    );
  };
  
  // ScrollReveal.js
  export const ScrollReveal = ({ children, direction = "up" }) => {
    const directionOffset = {
      up: 50,
      down: -50,
      left: 50,
      right: -50
    };
  
    return (
      <motion.div
        initial={{ 
          opacity: 0,
          [direction === "up" || direction === "down" ? "y" : "x"]: directionOffset[direction]
        }}
        whileInView={{ 
          opacity: 1,
          [direction === "up" || direction === "down" ? "y" : "x"]: 0
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          type: "spring",
          bounce: 0.3
        }}
      >
        {children}
      </motion.div>
    );
  };
