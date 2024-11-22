import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

// Utility for generating smooth, random movement
const createParticleTrajectory = (startX, startY) => {
  const amplitude = Math.random() * 5;
  const frequency = Math.random() * 0.5 + 0.1;
  
  return (time) => ({
    x: startX + amplitude * Math.sin(frequency * time),
    y: startY + amplitude * Math.cos(frequency * time)
  });
};

export function SparklesCore({ 
  isDarkMode = true, 
  intensity = 0.4,
  particleCount = 40 
}) {
  const [time, setTime] = useState(0);

  // Animate time for particle movement
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setTime(prevTime => prevTime + 0.1);
    });
    return () => cancelAnimationFrame(animationFrame);
  }, [time]);

  // Generate sophisticated particle configurations
  const particles = useMemo(() => {
    const particleColors = isDarkMode 
      ? ['#ffffff', '#e6e6fa', '#87cefa', '#add8e6']
      : ['#000000', '#333333', '#666666', '#999999'];

    return Array.from({ length: particleCount }, (_, index) => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const size = Math.random() * 0.8 + 0.2;
      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      const trajectory = createParticleTrajectory(startX, startY);

      return {
        id: index,
        color,
        size,
        trajectory
      };
    });
  }, [isDarkMode, particleCount]);

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: intensity }}
      transition={{ duration: 1 }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 70" 
        className="absolute h-full w-full"
      >
        {particles.map((particle) => {
          const { x, y } = particle.trajectory(time);
          
          return (
            <motion.circle
              key={particle.id}
              cx={`${x}%`}
              cy={`${y}%`}
              r={particle.size}
              fill={particle.color}
              opacity={0.6}
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 1, 0.8, 1],
                opacity: [0, 0.6, 0.4, 0.6]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: particle.id * 0.2
              }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
}
