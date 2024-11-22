import React from "react";
import { cn } from '../../lib/utils';
import { motion } from "framer-motion";


export function Spotlight({ 
  className, 
  isDarkMode = true,
  children,
  gradientColors = null,
  animationVariant = 'subtle'
}) {
  // Predefined gradient color sets
  const defaultGradients = {
    dark: ['rgba(70,130,180,0.2)', 'rgba(100,149,237,0.1)', 'transparent'],
    light: ['rgba(135,206,250,0.2)', 'rgba(173,216,230,0.1)', 'transparent']
  };

  // Select gradient colors based on mode
  const colors = gradientColors || 
    (isDarkMode ? defaultGradients.dark : defaultGradients.light);

  // Animation variants
  const animationVariants = {
    subtle: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { 
        scale: [0.8, 1, 1.1, 1],
        opacity: [0, 0.6, 0.8, 0.6]
      },
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    },
    dynamic: {
      initial: { rotate: 0, scale: 0.9 },
      animate: { 
        rotate: [0, 15, -15, 0],
        scale: [0.9, 1.1, 0.95, 1]
      },
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const selectedAnimation = animationVariants[animationVariant] || 
    animationVariants.subtle;

  return (
    <motion.div 
      className={cn(
        "absolute -top-20 -left-20 z-0 h-[calc(100%_+_80px)] w-[calc(100%_+_80px)]",
        className
      )}
      {...selectedAnimation}
    >
      <div 
        className="absolute inset-0 [mask-image:radial-gradient(closest-side,white,transparent)]"
        style={{
          background: `radial-gradient(
            circle at center, 
            ${colors[0]} 0%, 
            ${colors[1]} 40%, 
            ${colors[2]} 70%
          )`,
          mixBlendMode: isDarkMode ? 'screen' : 'multiply'
        }}
      />
      {children}
    </motion.div>
  );
}