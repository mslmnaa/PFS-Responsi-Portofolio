import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

function Footer({ isDarkMode }) {
  return (
    <footer className={`w-full py-6 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-200 text-gray-800'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className={`text-center md:text-left mb-4 md:mb-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            &copy; 2024 Salman. Built with passion.
          </p>
          <div className="flex gap-4">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-2xl hover:text-blue-500 transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-2xl hover:text-blue-500 transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a 
              href="mailto:your-email@example.com"
              className={`text-2xl hover:text-blue-500 transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

