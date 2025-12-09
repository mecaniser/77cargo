import { useEffect, useRef } from 'react';

const ServicesSection = () => {
  const featureCardsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          entry.target.style.opacity = '1';
        }
      });
    }, observerOptions);

    featureCardsRef.current.forEach(el => {
      if (el) {
        el.style.opacity = '0';
        observer.observe(el);
      }
    });

    return () => {
      featureCardsRef.current.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
        </svg>
      ),
      title: 'Smart Storage',
      description: 'A warehouse is just a building. What happens inside it is either chaos or choreography. We chose choreography.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
        </svg>
      ),
      title: 'Coast to Coast',
      description: 'The shortest distance between two points is a straight line. The fastest? That requires knowing which lines are actually straight.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: 'Peace of Mind',
      description: 'The absence of worry is worth more than the presence of speed. We deliver both, but we never confuse one for the other.'
    }
  ];

  return (
    <section id="services" className="section bg-cargo-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-cargo-red font-semibold uppercase tracking-wider text-sm">The Boring Stuff That Matters</span>
          <h2 className="section-title mt-4">What We Actually Do</h2>
          <p className="section-subtitle mx-auto">Most logistics companies sell speed. We sell certainty. There's a difference.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              ref={el => featureCardsRef.current[index] = el}
              className="feature-card animate-slide-up"
            >
              <div className="feature-icon">
                {service.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-cargo-dark mb-3">{service.title}</h3>
              <p className="text-cargo-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

