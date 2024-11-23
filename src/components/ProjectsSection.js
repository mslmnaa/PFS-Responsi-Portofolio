import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BoxArrowUpRight, CodeSlash, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

// Sample projects data
const projects = [
  { 
    id: 1, 
    title: "Nurse Game", 
    tech: ["C"], 
    demo: "https://ecommerce-demo.com", 
    source: "https://github.com/username/ecommerce", 
    description: "A comprehensive e-commerce solution with advanced product filtering.",
    status: "Completed",
    image: "/assets/myproject/nurse_c.png"
  },
  { 
    id: 2, 
    title: "Virus Movement Game", 
    tech: ["Java"], 
    demo: "https://portfolio-demo.com", 
    source: "https://github.com/username/portfolio", 
    description: "Interactive portfolio with smooth animations.",
    status: "Live",
    image: "/assets/myproject/virus.png" 
  },
  { 
    id: 3, 
    title: "Portofolio", 
    tech: ["Node.js", "JavaScript", "React"], 
    demo: "https://blog-platform.com", 
    source: "https://github.com/username/blog-platform", 
    description: "Full-featured blog platform with user authentication.",
    status: "In Progress",
    image: "/assets/myproject/myportofolio.png"
  },
  { 
    id: 4, 
    title: "Weather App", 
    tech: ["React", "API"], 
    demo: "https://weather-app.com", 
    source: "https://github.com/username/weather-app", 
    description: "Real-time weather application with location services.",
    status: "Live",
    image: "/placeholder.svg?height=400&width=320"
  }
];

// Status color mapping
const statusColors = {
  "Completed": "bg-green-100 text-green-800",
  "Live": "bg-blue-100 text-blue-800",
  "In Progress": "bg-yellow-100 text-yellow-800"
};

function ProjectSection({ isDarkMode }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? project.tech.includes(filter) : true;
    return matchesSearch && matchesFilter;
  });

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredProjects.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === filteredProjects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const currentProject = filteredProjects[currentIndex];

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={`
        min-h-screen w-full flex flex-col justify-start items-center 
        py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden
        ${isDarkMode 
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" 
          : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900"}
      `}
    >
      <motion.div 
        className="container mx-auto h-full flex flex-col max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
      >
        <motion.h2 
          className="text-4xl font-bold mb-6 text-center"
          variants={itemVariants}
        >
          My <span className="text-blue-500">Projects</span>
        </motion.h2>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-6 justify-center w-full"
          variants={itemVariants}
        >
          <motion.input
            type="text"
            placeholder="Search projects..."
            className={`
              p-2 border rounded-lg w-full sm:w-64 
              ${isDarkMode 
                ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400" 
                : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"}
            `}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variants={itemVariants}
          />
          <motion.select
            className={`
              p-2 border rounded-lg w-full sm:w-64 
              ${isDarkMode 
                ? "bg-gray-700 text-white border-gray-600" 
                : "bg-white text-gray-900 border-gray-300"}
            `}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            variants={itemVariants}
          >
            <option value="">All Technologies</option>
            {[...new Set(projects.flatMap(p => p.tech))].map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </motion.select>
        </motion.div>

        <motion.div className="flex-grow relative" variants={itemVariants}>
          {/* Navigation buttons */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between z-10 transform -translate-y-1/2">
            <motion.button
              className={`
                w-12 h-12 rounded-full flex items-center justify-center 
                transition-all duration-300 -ml-6
                ${isDarkMode 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-white text-gray-900 hover:bg-gray-100'}
                shadow-lg cursor-pointer
              `}
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              className={`
                w-12 h-12 rounded-full flex items-center justify-center 
                transition-all duration-300 -mr-6
                ${isDarkMode 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-white text-gray-900 hover:bg-gray-100'}
                shadow-lg cursor-pointer
              `}
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          <AnimatePresence custom={direction} mode="wait">
            <motion.div 
              key={currentIndex}
              custom={direction}
              variants={{
                enter: (direction) => ({
                  x: direction > 0 ? 1000 : -1000,
                  opacity: 0
                }),
                center: {
                  x: 0,
                  opacity: 1
                },
                exit: (direction) => ({
                  x: direction < 0 ? 1000 : -1000,
                  opacity: 0
                })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full"
            >
              <motion.div
                variants={itemVariants}
                className={`
                  rounded-xl shadow-lg overflow-hidden mx-auto max-w-xl
                  ${isDarkMode 
                    ? "bg-gray-800 border border-gray-700" 
                    : "bg-white border border-gray-200"}
                `}
              >
                <motion.div 
                  className="relative h-40 overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={toggleFullscreen}
                >
                  <motion.div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentProject.image})` }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300"
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.span className="text-white text-lg font-semibold">
                      Click to view full image
                    </motion.span>
                  </motion.div>
                </motion.div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <motion.h3 
                      className="text-xl font-semibold"
                      variants={itemVariants}
                    >
                      {currentProject.title}
                    </motion.h3>
                    <motion.span 
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        statusColors[currentProject.status]
                      }`}
                      variants={itemVariants}
                    >
                      {currentProject.status}
                    </motion.span>
                  </div>
                  <motion.p 
                    className={`mb-3 text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                    variants={itemVariants}
                  >
                    {currentProject.description}
                  </motion.p>
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-4"
                    variants={itemVariants}
                  >
                    {currentProject.tech.map((tech) => (
                      <motion.span
                        key={tech}
                        className={`px-2 py-1 rounded-full text-xs ${
                          isDarkMode 
                            ? "bg-gray-700 text-gray-300" 
                            : "bg-gray-200 text-gray-800"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                  <motion.div 
                    className="flex gap-4"
                    variants={itemVariants}
                  >
                    <motion.a
                      href={currentProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        px-3 py-1.5 rounded-lg flex-1 text-center flex items-center justify-center gap-1.5 text-sm
                        ${isDarkMode 
                          ? "bg-blue-600 text-white hover:bg-blue-700" 
                          : "bg-blue-500 text-white hover:bg-blue-600"}
                        transition-all duration-300
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <BoxArrowUpRight className="w-4 h-4" />
                      Demo
                    </motion.a>
                    <motion.a
                      href={currentProject.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        px-3 py-1.5 rounded-lg flex-1 text-center flex items-center justify-center gap-1.5 text-sm
                        ${isDarkMode 
                          ? "bg-gray-700 text-white hover:bg-gray-600" 
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"}
                        transition-all duration-300
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CodeSlash className="w-4 h-4" />
                      Code
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Pagination dots */}
        <motion.div 
          className="flex justify-center gap-3 mt-6"
          variants={itemVariants}
        >
          {filteredProjects.map((_, index) => (
            <motion.div
              key={index}
              className={`
                h-3 rounded-full cursor-pointer
                ${currentIndex === index 
                  ? `w-6 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'}` 
                  : `w-3 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`
                }
              `}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {isFullscreen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleFullscreen}
        >
          <motion.img
            src={currentProject.image}
            alt={currentProject.title}
            className="max-w-full max-h-full object-contain"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.div>
      )}
    </motion.section>
  );
}

export default ProjectSection;

