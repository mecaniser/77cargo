import { useState } from 'react';
import Layout from './Layout';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    position: '',
    message: '',
    smsConsent: false
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    } else if (cleaned.length >= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length >= 3) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    }
    return cleaned;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          companyName: '',
          position: '',
          message: '',
          smsConsent: false
        });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cargo-dark via-cargo-gray-700 to-cargo-dark"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-cargo-red/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
            Let's Have a <span className="text-cargo-red">Real Conversation</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            No chatbots. No endless hold music. No "your call is important to us" while clearly 
            demonstrating it isn't. Just humans, ready to help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-cargo-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <span className="text-cargo-red font-semibold uppercase tracking-wider text-sm">The Direct Line</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-cargo-dark mt-4 mb-6">
                Questions Deserve Answers
              </h2>
              <p className="text-cargo-gray-400 leading-relaxed mb-10">
                Whether you need a quote, have a complex logistics puzzle, or just want to know 
                if we're the right fit—ask. The worst thing that can happen is you'll learn something.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6 text-cargo-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    ),
                    title: 'Email Us',
                    content: <a href="mailto:info@77cargo.com" className="text-cargo-gray-400 hover:text-cargo-red transition-colors">info@77cargo.com</a>
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6 text-cargo-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                    ),
                    title: 'Call Us',
                    content: <a href="tel:+17048352433" className="text-cargo-gray-400 hover:text-cargo-red transition-colors">(704) 835-2433</a>
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6 text-cargo-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    ),
                    title: 'Business Hours',
                    content: <p className="text-cargo-gray-400">24/7 Support Available</p>
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cargo-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-cargo-dark mb-1">{item.title}</h3>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="card shadow-2xl">
              {!showSuccess ? (
                <>
                  <h3 className="text-xl font-display font-bold text-cargo-dark mb-6">Drop Us a Line</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="form-label form-label-required">First Name</label>
                        <input 
                          type="text" 
                          id="firstName" 
                          name="firstName" 
                          className="form-input" 
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input 
                          type="text" 
                          id="lastName" 
                          name="lastName" 
                          className="form-input"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="form-label form-label-required">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="form-input" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        className="form-input" 
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="companyName" className="form-label">Company Name</label>
                        <input 
                          type="text" 
                          id="companyName" 
                          name="companyName" 
                          className="form-input"
                          value={formData.companyName}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="position" className="form-label">Position</label>
                        <input 
                          type="text" 
                          id="position" 
                          name="position" 
                          className="form-input"
                          value={formData.position}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="form-label form-label-required">Your Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows="4" 
                        className="form-input resize-none" 
                        placeholder="How can we help you?" 
                        required
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input 
                        type="checkbox" 
                        id="smsConsent" 
                        name="smsConsent" 
                        className="mt-1 w-5 h-5 text-cargo-red border-cargo-gray-300 rounded focus:ring-cargo-red"
                        checked={formData.smsConsent}
                        onChange={handleChange}
                      />
                      <label htmlFor="smsConsent" className="text-sm text-cargo-gray-500">
                        By checking this box, you agree to receive automated and personalized text 
                        messages at the number listed above. Reply STOP to cancel. Message frequency 
                        varies. Message & data rates may apply.
                      </label>
                    </div>

                    <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                      </svg>
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-display font-bold text-cargo-dark mb-2">Message Sent!</h3>
                  <p className="text-cargo-gray-400 mb-6">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => setShowSuccess(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;

