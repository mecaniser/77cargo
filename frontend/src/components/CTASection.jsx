const CTASection = () => {
  return (
    <section className="section bg-gradient-to-br from-cargo-red to-cargo-red-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
          We Don't Hire Drivers. We Hire Partners.
        </h2>
        <p className="text-xl text-white/90 mb-10 leading-relaxed">
          The difference between a job and a career is how Monday morning feels. 
          We've built a place where the best drivers actually want to work. Fancy that.
        </p>
        <a href="/careers" className="btn bg-white text-cargo-red hover:bg-gray-100 text-lg px-10 py-4 shadow-xl">
          Apply Now
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default CTASection;

