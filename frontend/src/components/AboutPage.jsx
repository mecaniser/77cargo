import Layout from './Layout';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-cargo-gray-50 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-cargo-red/10 text-cargo-red rounded-full text-sm font-semibold mb-6">
              The Backstory
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-cargo-dark mb-6 leading-tight">
              Why <span className="text-cargo-red">77 Cargo</span> Exists
            </h1>
            <p className="text-lg md:text-xl text-cargo-gray-400 leading-relaxed">
              Because someone had to build a logistics company that treats people like people. 
              Turns out, that was us.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-cargo-red font-semibold uppercase tracking-wider text-sm">The Contrarian View</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-cargo-dark mt-4 mb-6">
                The Unsexy Secret to Great Logistics
              </h2>
              <p className="text-cargo-gray-400 leading-relaxed mb-6">
                Here's something the industry gets wrong: they optimize for speed and forget about humans. 
                We did the opposite. We optimized for humans and discovered that speed follows naturally 
                when people actually care about what they're doing.
              </p>
              <p className="text-cargo-gray-400 leading-relaxed mb-6">
                Our drivers aren't resources to be managed—they're the reason we exist. When you treat 
                skilled professionals like skilled professionals, remarkable things happen. Loads arrive 
                on time. Problems get solved before they become problems. Customers stop worrying.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Safety First', 'Reliability', 'Excellence'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-cargo-dark">
                    <svg className="w-5 h-5 text-cargo-red" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80" 
                  alt="Truck on highway" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-cargo-red text-white p-6 rounded-xl shadow-xl">
                <div className="text-4xl font-display font-bold">10+</div>
                <div className="text-sm opacity-90">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-cargo-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cargo-red font-semibold uppercase tracking-wider text-sm">The Obvious Things (That Aren't)</span>
            <h2 className="section-title mt-4">What We Actually Believe</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                ),
                title: 'Safety Is Non-Negotiable',
                description: 'The fastest delivery in the world means nothing if it doesn\'t arrive intact. We\'ve never met a deadline worth more than a life.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                ),
                title: 'People Over Process',
                description: 'Systems should serve people, not the other way around. We built our operations around what drivers actually need, not what a spreadsheet suggested.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                ),
                title: 'Simplicity Is Sophistication',
                description: 'Complexity is easy. Simplicity is hard. We work to make complicated logistics feel effortless—because that\'s what you\'re actually paying for.'
              }
            ].map((value, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {value.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-cargo-dark mb-3">{value.title}</h3>
                <p className="text-cargo-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cargo-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            Intrigued? Let's Talk.
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Whether you need cargo moved or you want to be the one moving it, 
            the next step is the same: a conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-lg px-8 py-4">
              Get a Quote
            </Link>
            <Link to="/careers" className="btn bg-transparent text-white border-2 border-white hover:bg-white hover:text-cargo-dark text-lg px-8 py-4">
              Join Our Team
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;

