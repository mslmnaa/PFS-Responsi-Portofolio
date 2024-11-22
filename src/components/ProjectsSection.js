import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaLink, FaCodeBranch } from "react-icons/fa";
import { IoChevronBackCircle, IoChevronForwardCircle } from "react-icons/io5";

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
    image: "/api/placeholder/400/320"
  },
  { 
    id: 2, 
    title: "Personal Portfolio", 
    tech: ["React", "Framer Motion"], 
    demo: "https://portfolio-demo.com", 
    source: "https://github.com/username/portfolio", 
    description: "Interactive portfolio with smooth animations.",
    status: "Live",
    image: "/api/placeholder/400/320"
  },
  { 
    id: 3, 
    title: "Blog Platform", 
    tech: ["Node.js", "Express"], 
    demo: "https://blog-platform.com", 
    source: "https://github.com/username/blog-platform", 
    description: "Full-featured blog platform with user authentication.",
    status: "In Progress",
    image: "/api/placeholder/400/320"
  },
  { 
    id: 4, 
    title: "Weather App", 
    tech: ["React", "API"], 
    demo: "https://weather-app.com", 
    source: "https://github.com/username/weather-app", 
    description: "Real-time weather application with location services.",
    status: "Live",
    image: "/api/placeholder/400/320"
  },
  { 
    id: 4, 
    title: "Weather App", 
    tech: ["React", "API"], 
    demo: "https://weather-app.com", 
    source: "https://github.com/username/weather-app", 
    description: "Real-time weather application with location services.",
    status: "Live",
    image: "/api/placeholder/400/320"
  },
  { 
    id: 4, 
    title: "Weather App", 
    tech: ["React", "API"], 
    demo: "https://weather-app.com", 
    source: "https://github.com/username/weather-app", 
    description: "Real-time weather application with location services.",
    status: "Live",
    image: "/api/placeholder/400/320"
  },
  { 
    id: 4, 
    title: "Weather App", 
    tech: ["React", "API"], 
    demo: "https://weather-app.com", 
    source: "https://github.com/username/weather-app", 
    description: "Real-time weather application with location services.",
    status: "Live",
    image: "/api/placeholder/400/320"
  },
  { 
    id: 4, 
    title: "Weather App", 
    tech: ["React", "API"], 
    demo: "https://weather-app.com", 
    source: "https://github.com/username/weather-app", 
    description: "Real-time weather application with location services.",
    status: "Live",
    image: "/api/placeholder/400/320"
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
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [projectsPerPage, setProjectsPerPage] = useState(3);
  const [totalDisplayed, setTotalDisplayed] = useState(0); // New state for total displayed projects

  useEffect(() => {
    const handleResize = () => {
      let newProjectsPerPage;
      if (window.innerWidth < 640) {
        newProjectsPerPage = 1;
      } else if (window.innerWidth < 1024) {
        newProjectsPerPage = 2;
      } else {
        newProjectsPerPage = 3;
      }
      setProjectsPerPage(newProjectsPerPage);
      setTotalDisplayed(prevTotal => {
        const newTotal = Math.floor(prevTotal / newProjectsPerPage) * newProjectsPerPage;
        setCurrentPage(Math.floor(newTotal / newProjectsPerPage));
        return newTotal;
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        duration: 0.5,
        type: "spring",
        bounce: 0.4
      }
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? project.tech.includes(filter) : true;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePrevPage = () => {
    setDirection(-1);
    setTotalDisplayed(prev => Math.max(0, prev - projectsPerPage));
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setDirection(1);
    setTotalDisplayed(prev => Math.min(filteredProjects.length, prev + projectsPerPage));
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  const currentProjects = filteredProjects.slice(
    totalDisplayed,
    totalDisplayed + projectsPerPage
  );

  const handleDotClick = (index) => {
    const newTotalDisplayed = index * projectsPerPage;
    setDirection(newTotalDisplayed > totalDisplayed ? 1 : -1);
    setTotalDisplayed(newTotalDisplayed);
    setCurrentPage(index);
  };

  return (
    <motion.section 
      ref={ref}
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
        initial="hidden"
        animate={controls}
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
          <input
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
          />
          <select
            className={`
              p-2 border rounded-lg w-full sm:w-64 
              ${isDarkMode 
                ? "bg-gray-700 text-white border-gray-600" 
                : "bg-white text-gray-900 border-gray-300"}
            `}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Technologies</option>
            {[...new Set(projects.flatMap(p => p.tech))].map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </motion.div>

        <div className="flex-grow relative">
          {/* Navigation buttons - Adjusted to be half outside the card */}
          <div className="absolute top-1/2 -left-4 -right-4 flex justify-between z-10 transform -translate-y-1/2">
            <motion.button
              className={`
                w-12 h-12 rounded-full flex items-center justify-center 
                transition-all duration-300
                ${isDarkMode 
                  ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white' 
                  : 'bg-black/10 hover:bg-black/20 text-gray-700 hover:text-gray-900'}
                shadow-md cursor-pointer
                transform -translate-x-1/2
              `}
              onClick={handlePrevPage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IoChevronBackCircle className="w-8 h-8" />
            </motion.button>
            
            <motion.button
              className={`
                w-12 h-12 rounded-full flex items-center justify-center 
                transition-all duration-300
                ${isDarkMode 
                  ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white' 
                  : 'bg-black/10 hover:bg-black/20 text-gray-700 hover:text-gray-900'}
                shadow-md cursor-pointer
                transform translate-x-1/2
              `}
              onClick={handleNextPage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IoChevronForwardCircle className="w-8 h-8" />
            </motion.button>
          </div>

          <AnimatePresence custom={direction} mode="wait">
            <motion.div 
              key={currentPage}
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
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {currentProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className={`
                    rounded-xl shadow-lg overflow-hidden
                    ${isDarkMode 
                      ? "bg-gray-800 border border-gray-700" 
                      : "bg-white border border-gray-200"}
                  `}
                >
                  <div 
                    className="h-32 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          statusColors[project.status]
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className={`mb-3 text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 py-1 rounded text-xs ${
                            isDarkMode 
                              ? "bg-gray-700 text-gray-300" 
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          px-3 py-1 rounded-lg flex-1 text-center flex items-center justify-center gap-1 
                          ${isDarkMode 
                            ? "bg-blue-600 hover:bg-blue-700" 
                            : "bg-blue-500 hover:bg-blue-600"}
                          text-white transition-all duration-300
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaLink className="text-xs" />
                        Demo
                      </motion.a>
                      <motion.a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          px-3 py-1 rounded-lg flex-1 text-center flex items-center justify-center gap-1 
                          ${isDarkMode 
                            ? "bg-gray-700 hover:bg-gray-600" 
                            : "bg-gray-300 hover:bg-gray-400"}
                          text-white transition-all duration-300
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaCodeBranch className="text-xs" />
                        Code
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-3 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <motion.div
              key={index}
              className={`
                h-3 rounded-full cursor-pointer
                ${currentPage === index 
                  ? `w-8 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'}` 
                  : `w-3 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`
                }
              `}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDotClick(index)} // Updated onClick event
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

export default ProjectSection;

