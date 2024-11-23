// import React, { useEffect } from 'react';
// import { motion, useAnimation, useInView } from 'framer-motion';

// export const AnimationWrapper = ({ children, animation = "fade", delay = 0, className = "" }) => {
//   const controls = useAnimation();
//   const ref = React.useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.3 });

//   const animations = {
//     fade: {
//       hidden: { opacity: 0, y: 20 },
//       visible: { opacity: 1, y: 0 }
//     },
//     slideLeft: {
//       hidden: { opacity: 0, x: -50 },
//       visible: { opacity: 1, x: 0 }
//     },
//     slideRight: {
//       hidden: { opacity: 0, x: 50 },
//       visible: { opacity: 1, x: 0 }
//     },
//     scale: {
//       hidden: { opacity: 0, scale: 0.8 },
//       visible: { opacity: 1, scale: 1 }
//     },
//     rotate: {
//       hidden: { opacity: 0, rotate: -180 },
//       visible: { opacity: 1, rotate: 0 }
//     }
//   };

//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [isInView, controls]);

//   return (
//     <motion.div
//       ref={ref}
//       variants={animations[animation]}
//       initial="hidden"
//       animate={controls}
//       transition={{ 
//         duration: 0.5, 
//         delay: delay,
//         type: "spring",
//         stiffness: 50
//       }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

// // ScrollProgress.js
// export const ScrollProgress = ({ isDarkMode }) => {
//   return (
//     <motion.div
//       className="fixed top-0 left-0 right-0 h-1 z-50"
//       style={{
//         background: isDarkMode ? "#4F46E5" : "#3B82F6",
//         scaleX: 0,
//         transformOrigin: "0%"
//       }}
//       animate={{
//         scaleX: scrollYProgress
//       }}
//     />
//   );
// };