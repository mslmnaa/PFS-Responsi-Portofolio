import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { IoArrowUp, IoArrowDown } from 'react-icons/io5';
import LoadingSpinner from '../components/LoadingSpinner';
import Footer from '../components/Footer';
import '../styles/Portfolio.css';
import '../styles/DarkMode.css';
import { debounce } from 'lodash';

const PortfolioNavbar = lazy(() => import('../components/Navbar'));
const AboutSection = lazy(() => import('../components/AboutSection'));
const ProjectsSection = lazy(() => import('../components/ProjectsSection'));
const SkillsSection = lazy(() => import('../components/SkillsSection'));
const ContactSection = lazy(() => import('../components/ContactSection'));

const sections = [
  { id: 'about', title: 'About' },
  { id: 'projects', title: 'Projects' },
  { id: 'skills', title: 'Skills' },
  { id: 'contact', title: 'Contact' }
];

function Portfolio() {
  const [activeSection, setActiveSection] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const setSectionHeights = () => {
      const sectionElements = document.querySelectorAll('.section');
      sectionElements.forEach((section) => {
        section.style.height = `${window.innerHeight}px`;
      });
    };

    setSectionHeights();
    window.addEventListener('resize', setSectionHeights);

    return () => {
      window.removeEventListener('resize', setSectionHeights);
    };
  }, []);

  const scrollToSection = (index) => {
    if (index >= 0 && index < sections.length) {
      setIsScrolling(true);
      setActiveSection(index);
      const container = document.querySelector('.sections-container');
      if (container) {
        const extraScroll = 30; // Tambahkan 50px ekstra pada gulir
        const targetScrollPosition = index * window.innerHeight + extraScroll;
        container.scrollTo({
          top: targetScrollPosition,
          behavior: 'smooth'
        });

        const checkScrollEnd = () => {
          if (Math.abs(container.scrollTop - targetScrollPosition) < 5) {
            setIsScrolling(false);
          } else {
            requestAnimationFrame(checkScrollEnd);
          }
        };
        requestAnimationFrame(checkScrollEnd);
      }
    }
  };

  const handleScroll = debounce(() => {
    if (!isScrolling) {
      const container = document.querySelector('.sections-container');
      if (container) {
        const scrollPosition = container.scrollTop;
        const windowHeight = window.innerHeight;
        const newActiveSection = Math.round(scrollPosition / windowHeight);
        setActiveSection(newActiveSection);
      }
    }
  }, 100);

  useEffect(() => {
    const container = document.querySelector('.sections-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const NavigationControls = () => (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
      {sections.map((_, index) => (
        <motion.div
          key={index}
          className={`w-3 h-3 my-2 rounded-full cursor-pointer ${
            activeSection === index
              ? isDarkMode
                ? 'bg-white'
                : 'bg-gray-800'
              : isDarkMode
              ? 'bg-gray-600'
              : 'bg-gray-400'
          }`}
          onClick={() => scrollToSection(index)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        />
      ))}
    </div>
  );

  const ScrollButton = ({ direction, onClick }) => (
    <motion.button
      className={`fixed ${
        direction === 'up' ? 'top-4' : 'bottom-4'
      } right-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {direction === 'up' ? <IoArrowUp /> : <IoArrowDown />}
    </motion.button>
  );

  const scrollUp = () => {
    const newIndex = Math.max(0, activeSection - 1);
    scrollToSection(newIndex);
  };

  const scrollDown = () => {
    const newIndex = Math.min(sections.length - 1, activeSection + 1);
    scrollToSection(newIndex);
  };

  return (
    <div className={`portfolio relative w-screen h-screen overflow-x-hidden ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Helmet>
        <title>Portfolio | Full Stack Developer</title>
        <meta name="description" content="Welcome to my portfolio - Full Stack Developer" />
      </Helmet>

      <Suspense fallback={<LoadingSpinner />}>
        <PortfolioNavbar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          activeSection={activeSection}
          setActiveSection={scrollToSection}
        />

        <NavigationControls />

        <ScrollButton direction="up" onClick={scrollUp} />
        <ScrollButton direction="down" onClick={scrollDown} />

        <AnimatePresence mode="wait">
          <motion.div
            className="sections-container absolute top-0 left-0 w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="section" id="about">
              <AboutSection isDarkMode={isDarkMode} />
            </div>
            <div className="section" id="projects">
              <ProjectsSection isDarkMode={isDarkMode} />
            </div>
            <div className="section" id="skills">
              <SkillsSection isDarkMode={isDarkMode} />
            </div>
            <div className="section" id="email">
              <ContactSection isDarkMode={isDarkMode} />
            </div>
          </motion.div>
        </AnimatePresence>

        <Footer isDarkMode={isDarkMode} />
      </Suspense>
    </div>
  );
}

export default React.memo(Portfolio);


