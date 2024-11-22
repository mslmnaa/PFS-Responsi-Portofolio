import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FaDownload,
  FaLaptopCode,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaRocket
} from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
import { SparklesCore } from "./ui/sparkles";
import { Spotlight } from "./ui/spotlight";
import { useInView } from "react-intersection-observer";

function AboutSection({ isDarkMode }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const slideInFromLeft = {
    hidden: { 
      x: -100, 
      opacity: 0,
      transition: {
        type: "spring",
        duration: 1
      }
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1
      }
    }
  };

  const slideInFromRight = {
    hidden: { 
      x: 100, 
      opacity: 0,
      transition: {
        type: "spring",
        duration: 1
      }
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1
      }
    }
  };

  const fadeInUp = {
    hidden: { 
      y: 60, 
      opacity: 0,
      transition: {
        type: "spring",
        duration: 1
      }
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1
      }
    }
  };

  const socialLinks = [
    { Icon: FaLinkedin, href: "https://www.linkedin.com/in/muhammad-salman-alfarisi-466584300/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
    { Icon: FaGithub, href: "https://github.com/mslmnaa", label: "GitHub" },
    { Icon: FaTwitter, href: "https://x.com/mslmnaa", label: "Twitter" }
  ];

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={`min-h-screen flex items-center justify-center relative ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <SparklesCore
        id="tsparticles"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="absolute inset-0"
        particleColor={isDarkMode ? "#4F46E5" : "#3B82F6"}
      />

      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill={isDarkMode ? "#4F46E5" : "#3B82F6"}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            className="lg:w-1/2 flex flex-col items-center lg:items-start"
            variants={containerVariants}
          >
            <motion.h1
              variants={slideInFromLeft}
              className="text-5xl font-bold mb-6 text-center lg:text-left w-full"
            >
              Hi, I'm <span className="text-blue-600">Salman</span>
            </motion.h1>

            <motion.div 
              variants={fadeInUp} 
              className="h-16 mb-6 w-full text-center lg:text-left"
            >
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  2000,
                  'UI/UX Designer',
                  2000,
                  'Problem Solver',
                  2000,
                ]}
                wrapper="h2"
                className="text-3xl font-semibold text-blue-500"
                repeat={Infinity}
              />
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-lg mb-8 max-w-2xl text-center lg:text-left"
            >
              A passionate full-stack developer with expertise in modern web technologies.
              I create scalable applications that solve real-world problems.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center w-full gap-4 mb-8"
            >
              <motion.a
                href="/assets/cv_salman.pdf"
                download
                className={`
                  no-underline w-full sm:w-auto px-6 py-3 rounded-full flex items-center justify-center gap-2
                  ${isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition-all duration-300 transform hover:-translate-y-1
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload />
                Download CV
              </motion.a>

              <motion.button
                className={`
                  w-full sm:w-auto px-6 py-3 rounded-full flex items-center justify-center gap-2
                  ${isDarkMode
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-purple-500 hover:bg-purple-600'
                  } text-white transition-all duration-300 transform hover:-translate-y-1
                `}
                onClick={() => window.open('https://bit.ly/m/slmnaa', '_blank')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRocket />
                Contact Me
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex justify-center w-full gap-6"
            >
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    text-2xl p-3 rounded-full transition-all duration-300
                    ${isDarkMode
                      ? 'hover:bg-gray-800 hover:text-blue-400'
                      : 'hover:bg-gray-200 hover:text-blue-600'
                    }
                  `}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            className="lg:w-1/2 flex justify-center"
            variants={slideInFromRight}
          >
            <div className="relative">
              <motion.img
                src="/img/salman2.png"
                alt="Profile"
                className={`
                  w-64 h-64 md:w-80 md:h-80 rounded-full object-cover
                  border-5 ${isDarkMode ? 'border-blue-600' : 'border-blue-500'}
                  shadow-xl transition-transform duration-300 transform hover:scale-105
                `}
                whileHover={{ scale: 1.05, rotate: 5 }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 bg-blue-500 p-3 rounded-full shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                whileHover={{ rotate: 360 }}
              >
                <FaLaptopCode size={24} className="text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default AboutSection;