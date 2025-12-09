import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navShadow, setNavShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavShadow(window.pageYOffset > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm ${navShadow ? 'shadow-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex items-center">
                <svg className="w-10 h-10" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g style={{ clipPath: 'inset(0 0 25% 0)' }}>
                    <path d="M30 10L15 25L30 40" stroke="#C41E3A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <g style={{ clipPath: 'inset(25% 0 0 0)' }}>
                    <path d="M40 10L25 25L40 40" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
              </div>
              <span className="text-2xl font-display font-bold">
                <span className="text-cargo-red">77</span>
                <span className="text-cargo-dark">Cargo</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
              <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
              <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
              <Link to="/careers" className={`nav-link ${location.pathname === '/careers' ? 'active' : ''}`}>Careers</Link>
              <Link to="/careers" className="btn-primary text-sm">Join Our Team</Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-cargo-dark hover:text-cargo-red transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed inset-0 z-50 transform transition-transform duration-300 ${mobileMenuOpen ? '' : 'translate-x-full hidden'}`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center justify-between mb-12">
            <Link to="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
              <svg className="w-10 h-10" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g style={{ clipPath: 'inset(0 0 25% 0)' }}>
                  <path d="M30 10L15 25L30 40" stroke="#C41E3A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <g style={{ clipPath: 'inset(25% 0 0 0)' }}>
                  <path d="M40 10L25 25L40 40" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </svg>
              <span className="text-2xl font-display font-bold text-white">
                <span className="text-cargo-red">77</span> Cargo
              </span>
            </Link>
            <button 
              onClick={closeMobileMenu}
              className="p-2 text-white hover:text-cargo-red transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-6 items-end">
            <Link to="/" className="text-2xl text-white hover:text-cargo-red transition-colors font-display" onClick={closeMobileMenu}>Home</Link>
            <Link to="/about" className="text-2xl text-white hover:text-cargo-red transition-colors font-display" onClick={closeMobileMenu}>About</Link>
            <Link to="/contact" className="text-2xl text-white hover:text-cargo-red transition-colors font-display" onClick={closeMobileMenu}>Contact</Link>
            <Link to="/careers" className="text-2xl text-white hover:text-cargo-red transition-colors font-display" onClick={closeMobileMenu}>Careers</Link>
          </nav>
          <div className="mt-auto">
            <Link to="/careers" className="btn-primary w-full text-center" onClick={closeMobileMenu}>Join Our Team</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;

