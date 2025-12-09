const Footer = () => {
  return (
    <footer className="bg-cargo-dark-500 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-6">
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
            </a>
            <p className="text-gray-400 leading-relaxed max-w-md mb-6">
              77 Cargo exists because logistics should feel like magic, not math. 
              We move things from A to B while you get on with more interesting problems.
            </p>
            {/* Social Media */}
            <div className="flex items-center gap-3 mt-2">
              <a href="https://www.facebook.com/share/17bi1SdKTR/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-400 hover:text-cargo-red transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Follow us on Facebook</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-display font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/" className="hover:text-cargo-red transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-cargo-red transition-colors">About Us</a></li>
              <li><a href="/careers" className="hover:text-cargo-red transition-colors">Careers</a></li>
              <li><a href="/contact" className="hover:text-cargo-red transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-display font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-cargo-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:info@77cargo.com" className="hover:text-cargo-red transition-colors">info@77cargo.com</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-cargo-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href="tel:+17048352433" className="hover:text-cargo-red transition-colors">(704) 835-2433</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">&copy; 2024 77 Cargo. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-cargo-red transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cargo-red transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

