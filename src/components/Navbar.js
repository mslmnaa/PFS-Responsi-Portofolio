import React from 'react';
import { motion } from 'framer-motion';
import {
  HouseFill,
  Diagram3Fill,
  CodeSlash,
  EnvelopeFill,
  Moon,
  Sun
} from 'react-bootstrap-icons';

function PortfolioNavbar({
  isDarkMode,
  toggleDarkMode,
  activeSection,
  setActiveSection
}: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  activeSection: number;
  setActiveSection: (index: number) => void;
}) {
  // Navigation items configuration
  const navItems = [
    {
      icon: <HouseFill className="w-5 h-5" />,
      label: 'About',
      index: 0
    },
    {
      icon: <Diagram3Fill className="w-5 h-5" />,
      label: 'Projects',
      index: 1
    },
    {
      icon: <CodeSlash className="w-5 h-5" />,
      label: 'Skills',
      index: 2
    },
    {
      icon: <EnvelopeFill className="w-5 h-5" />,
      label: 'Contact',
      index: 3
    }
  ];

  const handleNavigation = (index: number) => {
    setActiveSection(index);
    const container = document.querySelector('.sections-container');
    if (container) {
      container.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 
        transition-all duration-300 
        bg-transparent 
      `}
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className={`
            text-xl font-bold transition-all
            ${isDarkMode
              ? 'text-white/70 hover:text-white/100'
              : 'text-gray-800 hover:text-black'
            }
          `}
        >
          Salman's Portfolio
        </motion.div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8 ">
          {navItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => handleNavigation(item.index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center space-x-2 
                transition-all duration-300 
                bg-transparent
                ${activeSection === item.index
                  ? (isDarkMode ? 'text-blue-300' : 'text-blue-600')
                  : isDarkMode
                    ? 'text-white/50 hover:text-white/80'
                    : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              {item.icon}
              <span className="hidden md:inline">{item.label}</span>
            </motion.button>
          ))}

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ rotate: 180 }}
            className={`
              p-2 rounded-full transition-all duration-300
              bg-transparent right-10
              ${isDarkMode
                ? 'text-white/50 hover:text-yellow-400'
                : 'text-gray-600 hover:text-yellow-500'
              }
            `}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>
    </nav>
  );
}

export default React.memo(PortfolioNavbar);

