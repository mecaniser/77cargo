import { useState, useRef, useEffect } from 'react';
import Layout from './Layout';

const CareersPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    yearsExperience: '',
    cdlClass: '',
    cdlExpiration: '',
    previousJobs: '',
    message: '',
    consent: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);

  const totalSteps = 3;

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

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'This field is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'This field is required';
      if (!formData.email.trim()) {
        newErrors.email = 'This field is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'This field is required';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, [name]: formatPhone(value) }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const nextStep = (step) => {
    if (validateStep(currentStep)) {
      setCurrentStep(step);
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const prevStep = (step) => {
    setCurrentStep(step);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getExperienceLabel = (value) => {
    const labels = {
      '0': 'Less than 1 year',
      '1': '1-2 years',
      '3': '3-5 years',
      '5': '5-10 years',
      '10': '10+ years'
    };
    return labels[value] || 'Not provided';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.consent) {
      alert('Please accept the consent to continue');
      return;
    }

    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const data = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ''),
        years_experience: formData.yearsExperience ? parseInt(formData.yearsExperience) : null,
        cdl_class: formData.cdlClass || null,
        cdl_expiration: formData.cdlExpiration || null,
        previous_jobs: formData.previousJobs || null,
        message: formData.message || null
      };

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to submit application');
      }

      setShowSuccess(true);
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepIndicator = ({ step, label }) => {
    const isActive = step === currentStep;
    const isCompleted = step < currentStep;
    
    return (
      <div className="flex items-center">
        <div className={`step-indicator ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
          {isCompleted ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
            </svg>
          ) : (
            step
          )}
        </div>
        <span className={`ml-2 text-sm font-medium hidden sm:inline ${isActive ? 'text-cargo-dark' : 'text-cargo-gray-400'}`}>
          {label}
        </span>
      </div>
    );
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-cargo-gray-900 lg:bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80')] lg:bg-cover lg:bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cargo-dark/95 via-cargo-gray-700/90 to-cargo-dark/95"></div>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-cargo-red/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-cargo-red/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-cargo-red/20 text-cargo-red rounded-full text-sm font-semibold mb-6 animate-fade-in">
              Opportunity Knocks
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight animate-slide-up">
              The Road Chooses<br/>
              <span className="text-cargo-red">The Right People</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed animate-slide-up animate-delay-200">
              Here's a thought: the economy doesn't run on algorithms. It runs on people who actually 
              show up. Truck drivers aren't just employees—they're the reason anything arrives anywhere. 
              We treat them accordingly.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-cargo-red font-semibold uppercase tracking-wider text-sm">The Fine Print (That's Actually Good)</span>
            <h2 className="section-title mt-4">Why Smart Drivers Choose Us</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                ),
                title: 'Money That Respects You',
                desc: 'Pay that matches the value you create'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                ),
                title: 'Health That\'s Covered',
                desc: 'Because worry is a terrible co-pilot'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                ),
                title: 'Time That\'s Yours',
                desc: 'Home isn\'t just where you park'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                ),
                title: 'People Who Get It',
                desc: 'Run by drivers, for drivers'
              }
            ].map((benefit, index) => (
              <div key={index} className="feature-card text-center">
                <div className="feature-icon mx-auto">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-display font-bold text-cargo-dark mb-2">{benefit.title}</h3>
                <p className="text-cargo-gray-400 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 md:py-24 bg-cargo-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card shadow-2xl">
            {!showSuccess ? (
              <>
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-cargo-dark mb-3">Let's Talk</h2>
                  <p className="text-cargo-gray-400">No algorithms, no automated rejections. A real person will actually read this.</p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-10">
                  <div className="flex items-center gap-4">
                    <StepIndicator step={1} label="Personal Info" />
                    <div className="w-8 md:w-16 h-0.5 bg-cargo-gray-200"></div>
                    <StepIndicator step={2} label="Experience" />
                    <div className="w-8 md:w-16 h-0.5 bg-cargo-gray-200"></div>
                    <StepIndicator step={3} label="Review" />
                  </div>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="form-step">
                      <h3 className="text-lg font-display font-semibold text-cargo-dark mb-6 pb-3 border-b border-cargo-gray-200">
                        Personal Information
                      </h3>
                      
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="form-label form-label-required">First Name</label>
                          <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <label htmlFor="lastName" className="form-label form-label-required">Last Name</label>
                          <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6 mt-6">
                        <div>
                          <label htmlFor="email" className="form-label form-label-required">Email Address</label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                            required
                            value={formData.email}
                            onChange={handleChange}
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label htmlFor="phone" className="form-label form-label-required">Phone Number</label>
                          <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                            placeholder="(555) 123-4567" 
                            required
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                      </div>

                      <div className="flex justify-end mt-8">
                        <button type="button" className="btn-primary" onClick={() => nextStep(2)}>
                          Continue
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Experience */}
                  {currentStep === 2 && (
                    <div className="form-step">
                      <h3 className="text-lg font-display font-semibold text-cargo-dark mb-6 pb-3 border-b border-cargo-gray-200">
                        Driving Experience
                      </h3>
                      
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="yearsExperience" className="form-label">Years of Experience</label>
                          <select 
                            id="yearsExperience" 
                            name="yearsExperience" 
                            className="form-input"
                            value={formData.yearsExperience}
                            onChange={handleChange}
                          >
                            <option value="">Select...</option>
                            <option value="0">Less than 1 year</option>
                            <option value="1">1-2 years</option>
                            <option value="3">3-5 years</option>
                            <option value="5">5-10 years</option>
                            <option value="10">10+ years</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="cdlClass" className="form-label">CDL Class</label>
                          <select 
                            id="cdlClass" 
                            name="cdlClass" 
                            className="form-input"
                            value={formData.cdlClass}
                            onChange={handleChange}
                          >
                            <option value="">Select...</option>
                            <option value="A">Class A</option>
                            <option value="B">Class B</option>
                            <option value="C">Class C</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-6">
                        <label htmlFor="cdlExpiration" className="form-label">CDL Expiration Date</label>
                        <input 
                          type="date" 
                          id="cdlExpiration" 
                          name="cdlExpiration" 
                          className="form-input"
                          value={formData.cdlExpiration}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mt-6">
                        <label htmlFor="previousJobs" className="form-label">Previous Employment (Optional)</label>
                        <textarea 
                          id="previousJobs" 
                          name="previousJobs" 
                          rows="4" 
                          className="form-input resize-none"
                          placeholder="Tell us about your previous trucking experience..."
                          value={formData.previousJobs}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="flex justify-between mt-8">
                        <button type="button" className="btn bg-transparent text-cargo-dark border-2 border-cargo-dark hover:bg-cargo-dark hover:text-white" onClick={() => prevStep(1)}>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                          </svg>
                          Back
                        </button>
                        <button type="button" className="btn-primary" onClick={() => nextStep(3)}>
                          Continue
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Review */}
                  {currentStep === 3 && (
                    <div className="form-step">
                      <h3 className="text-lg font-display font-semibold text-cargo-dark mb-6 pb-3 border-b border-cargo-gray-200">
                        Review Your Application
                      </h3>
                      
                      <div className="space-y-4 mb-8">
                        <div className="bg-cargo-gray-50 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-cargo-gray-400 uppercase tracking-wide mb-3">Personal Information</h4>
                          <div className="space-y-2">
                            <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                            <p><span className="font-medium">Email:</span> {formData.email}</p>
                            <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                          </div>
                        </div>
                        
                        <div className="bg-cargo-gray-50 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-cargo-gray-400 uppercase tracking-wide mb-3">Driving Experience</h4>
                          <div className="grid sm:grid-cols-3 gap-4">
                            <div>
                              <p className="font-medium">Years of Experience</p>
                              <p className="text-cargo-gray-500">{getExperienceLabel(formData.yearsExperience)}</p>
                            </div>
                            <div>
                              <p className="font-medium">CDL Class</p>
                              <p className="text-cargo-gray-500">{formData.cdlClass ? `Class ${formData.cdlClass}` : 'Not provided'}</p>
                            </div>
                            <div>
                              <p className="font-medium">CDL Expiration</p>
                              <p className="text-cargo-gray-500">{formData.cdlExpiration || 'Not provided'}</p>
                            </div>
                          </div>
                        </div>
                        
                        {formData.previousJobs && (
                          <div className="bg-cargo-gray-50 rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-cargo-gray-400 uppercase tracking-wide mb-3">Previous Employment</h4>
                            <p className="whitespace-pre-line text-cargo-gray-600">{formData.previousJobs}</p>
                          </div>
                        )}
                        
                        {formData.message && (
                          <div className="bg-cargo-gray-50 rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-cargo-gray-400 uppercase tracking-wide mb-3">Additional Information</h4>
                            <p className="text-cargo-gray-600">{formData.message}</p>
                          </div>
                        )}
                      </div>

                      <div className="mt-6">
                        <label htmlFor="message" className="form-label">Additional Information (Optional)</label>
                        <textarea 
                          id="message" 
                          name="message" 
                          rows="4" 
                          className="form-input resize-none"
                          placeholder="Anything else you'd like us to know?"
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="flex items-start gap-3 mt-6">
                        <input 
                          type="checkbox" 
                          id="consent" 
                          name="consent" 
                          className="mt-1 w-5 h-5 text-cargo-red border-cargo-gray-300 rounded focus:ring-cargo-red"
                          checked={formData.consent}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="consent" className="text-sm text-cargo-gray-500">
                          I consent to 77 Cargo contacting me about employment opportunities and understand that 
                          my information will be used for recruitment purposes.
                        </label>
                      </div>

                      <div className="flex justify-between mt-8">
                        <button type="button" className="btn bg-transparent text-cargo-dark border-2 border-cargo-dark hover:bg-cargo-dark hover:text-white" onClick={() => prevStep(2)}>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                          </svg>
                          Back
                        </button>
                        <button type="submit" className="btn-primary" disabled={isSubmitting || !formData.consent}>
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Application
                              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </>
            ) : (
              <div id="successMessage" className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-cargo-dark mb-3">Application Submitted!</h3>
                <p className="text-cargo-gray-400 mb-8 max-w-md mx-auto">
                  Thank you for your interest in joining 77 Cargo. We've received your application 
                  and a member of our team will review it shortly. We'll be in touch soon!
                </p>
                <button 
                  onClick={() => {
                    setShowSuccess(false);
                    setCurrentStep(1);
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      yearsExperience: '',
                      cdlClass: '',
                      cdlExpiration: '',
                      previousJobs: '',
                      message: '',
                      consent: false
                    });
                  }}
                  className="btn-primary"
                >
                  Submit Another Application
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CareersPage;

