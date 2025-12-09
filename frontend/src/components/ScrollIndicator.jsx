import { useState, useEffect } from 'react';

const ScrollIndicator = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const currentScroll = window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - viewportHeight;
      setIsAtBottom(currentScroll >= maxScroll - 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const viewportHeight = window.innerHeight;
    const currentScroll = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - viewportHeight;
    
    if (isAtBottom) {
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Scroll down by viewport height
      const targetScroll = currentScroll + viewportHeight;
      window.scrollTo({
        top: Math.min(targetScroll, maxScroll),
        behavior: 'smooth'
      });
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="fixed bottom-8 right-8 animate-bounce cursor-pointer z-40 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white hover:shadow-xl transition-all"
      aria-label={isAtBottom ? 'Scroll to top' : 'Scroll down'}
    >
      <svg 
        className="w-6 h-6 text-cargo-red transition-transform duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        strokeWidth="2.5"
        style={{ transform: isAtBottom ? 'rotate(180deg)' : 'rotate(0deg)' }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </button>
  );
};

export default ScrollIndicator;

