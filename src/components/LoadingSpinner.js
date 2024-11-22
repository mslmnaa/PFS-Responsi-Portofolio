// src/components/LoadingSpinner/LoadingSpinner.js
import React from 'react';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="text-center mt-3">
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;