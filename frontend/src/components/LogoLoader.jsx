import { useEffect, useState } from 'react';
import './LogoLoader.css';

/**
 * LogoLoader Component
 * Displays animated logo loading screen on page load
 */
const LogoLoader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Animation sequence timing
    const hideLoader = () => {
      setIsVisible(false);
      setTimeout(() => {
        setShowContent(true);
        if (onComplete) {
          onComplete();
        }
      }, 500); // Fade out duration
    };

    // Start hide sequence after all animations complete
    const timer = setTimeout(hideLoader, 1800); // Total animation time

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible && showContent) {
    return null; // Component unmounts after animation
  }

  return (
    <div className={`logo-loader ${!isVisible ? 'fade-out' : ''}`}>
      <div className="logo-loader__container">
        {/* Arrows Container - positioned to overlap perfectly */}
        <div className="logo-loader__arrows-container">
          {/* Left Arrow (Red) - slides from left */}
          <div className="logo-loader__arrow logo-loader__arrow--left">
            <svg 
              className="logo-loader__svg" 
              viewBox="0 0 50 50" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g style={{ clipPath: 'inset(0 0 25% 0)' }}>
                <path 
                  d="M30 10L15 25L30 40" 
                  stroke="#C41E3A" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>

          {/* Right Arrow (Black) - slides from right */}
          <div className="logo-loader__arrow logo-loader__arrow--right">
            <svg 
              className="logo-loader__svg" 
              viewBox="0 0 50 50" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g style={{ clipPath: 'inset(25% 0 0 0)' }}>
                <path 
                  d="M40 10L25 25L40 40" 
                  stroke="#1A1A1A" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Text - fades in */}
        <div className="logo-loader__text">
          <span className="logo-loader__text-number">77</span>
          <span className="logo-loader__text-name">Cargo</span>
        </div>
      </div>
    </div>
  );
};

export default LogoLoader;

