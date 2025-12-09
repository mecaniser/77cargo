const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* Background: solid on mobile/tablet, photo only on large screens */}
      <div className="absolute inset-0 bg-cargo-gray-900 lg:bg-[url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2000&q=80')] lg:bg-cover lg:bg-center"></div>
      <div className="hero-overlay"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cargo-red/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cargo-red/5 rounded-full blur-3xl animate-pulse-slow animate-delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
            The Best Logistics<br/>
            <span className="text-cargo-red">Feel Invisible</span><br/>
            Until They Don't
          </h1>
        </div>
        
        <p className="animate-slide-up animate-delay-200 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Anyone can move boxes. The real magic is making complexity disappear. 
          We obsess over the details you'll never notice—so you never have to.
        </p>
        
        <div className="animate-slide-up animate-delay-400 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" className="btn-primary text-lg px-8 py-4">
            Contact Us
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
          <a href="/about" className="btn-outline text-lg px-8 py-4">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

