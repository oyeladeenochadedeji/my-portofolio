import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'services', 'results', 'testimonials', 'portfolio', 'process', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-white">
              Oyelade Enoch
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Services', 'Results', 'Testimonials', 'Portfolio', 'Process', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1606588984221-7ab3e2bb038a" 
            alt="Digital Marketing Professional" 
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h1 className="hero-title">
              Transform Your Brand Into a
              <span className="gradient-text"> Revenue Powerhouse</span>
            </h1>
            <p className="hero-subtitle">
              I help businesses scale from $0 to 6-figures through strategic digital marketing, 
              proven funnels, and data-driven campaigns that convert.
            </p>
            <div className="hero-cta">
              <button 
                onClick={() => scrollToSection('contact')}
                className="cta-button primary-cta"
              >
                Work With Me
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="cta-button secondary-cta ml-4"
              >
                View My Work
              </button>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-mouse"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-container">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="section-header">
                <h2 className="section-title">About Me</h2>
                <p className="section-subtitle">
                  Your Growth Partner in Digital Marketing
                </p>
              </div>
              <div className="prose-content">
                <p>
                  I'm Oyelade Enoch Adedeji, a results-driven digital marketing strategist with a proven track record 
                  of helping businesses achieve explosive growth. Over the past 5+ years, I've generated over $2M+ 
                  in revenue for my clients across diverse industries.
                </p>
                <p>
                  My expertise spans the entire digital marketing ecosystem - from crafting compelling book marketing 
                  campaigns that turn authors into bestsellers, to building high-converting funnels that transform 
                  visitors into loyal customers.
                </p>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">500+</div>
                    <div className="stat-label">Successful Campaigns</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">$2M+</div>
                    <div className="stat-label">Revenue Generated</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">98%</div>
                    <div className="stat-label">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-image-container">
              <img 
                src="https://images.pexels.com/photos/7789851/pexels-photo-7789851.jpeg" 
                alt="Professional Digital Marketer"
                className="about-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-container bg-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-header text-center">
            <h2 className="section-title text-white">My Services</h2>
            <p className="section-subtitle text-blue-100">
              Comprehensive Digital Marketing Solutions That Drive Results
            </p>
          </div>
          <div className="services-grid">
            {[
              {
                icon: "https://images.pexels.com/photos/13638882/pexels-photo-13638882.jpeg",
                title: "Book Marketing",
                description: "Transform your book into a bestseller with targeted campaigns that reach your ideal readers and drive sales."
              },
              {
                icon: "https://images.unsplash.com/photo-1491951931722-5a446214b4e2",
                title: "Affiliate Marketing",
                description: "Build profitable affiliate networks and partnerships that generate passive income streams for your business."
              },
              {
                icon: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb",
                title: "Social Media Marketing",
                description: "Dominate TikTok and Instagram with viral content strategies that build massive engaged audiences."
              },
              {
                icon: "https://images.unsplash.com/photo-1626076597347-fc204a64d0a6",
                title: "Paid Advertising",
                description: "Scale your business with high-ROI Meta and Google Ads campaigns that convert prospects into customers."
              },
              {
                icon: "https://images.unsplash.com/photo-1551721434-f5a13c7a6d14",
                title: "Email Automation",
                description: "Build sophisticated email funnels that nurture leads and maximize customer lifetime value."
              },
              {
                icon: "https://images.unsplash.com/photo-1661028191560-3aa1f664f397",
                title: "SEO & Content",
                description: "Boost your search rankings and brand authority with strategic content marketing and SEO optimization."
              }
            ].map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">
                  <img src={service.icon} alt={service.title} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="section-container">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-header text-center">
            <h2 className="section-title">Client Results</h2>
            <p className="section-subtitle">
              Real Success Stories, Real ROI
            </p>
          </div>
          <div className="results-grid">
            {[
              {
                image: "https://images.pexels.com/photos/13638882/pexels-photo-13638882.jpeg",
                title: "Author Success Story",
                metric: "450% Sales Increase",
                description: "Helped indie author achieve Amazon bestseller status in 30 days through targeted book marketing campaign.",
                results: ["15,000+ copies sold", "Top 10 in category", "Media coverage secured"]
              },
              {
                image: "https://images.pexels.com/photos/8254894/pexels-photo-8254894.jpeg",
                title: "E-commerce Scale",
                metric: "300% Revenue Growth",
                description: "Scaled online store from $10K to $40K monthly revenue using strategic social media and paid ads.",
                results: ["$120K additional revenue", "60% lower CAC", "5x ROAS achieved"]
              },
              {
                image: "https://images.unsplash.com/photo-1553639558-fb2e565066f5",
                title: "SaaS Lead Generation",
                metric: "250% Lead Increase",
                description: "Generated 500+ qualified leads for B2B SaaS through LinkedIn and email automation strategies.",
                results: ["500+ qualified leads", "40% conversion rate", "$200K pipeline value"]
              }
            ].map((result, index) => (
              <div key={index} className="result-card">
                <div className="result-image">
                  <img src={result.image} alt={result.title} />
                </div>
                <div className="result-content">
                  <div className="result-metric">{result.metric}</div>
                  <h3 className="result-title">{result.title}</h3>
                  <p className="result-description">{result.description}</p>
                  <ul className="result-list">
                    {result.results.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-container bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-header text-center">
            <h2 className="section-title">What Clients Say</h2>
            <p className="section-subtitle">
              Trusted by Industry Leaders Worldwide
            </p>
          </div>
          <div className="testimonials-grid">
            {[
              {
                avatar: "https://images.pexels.com/photos/7616608/pexels-photo-7616608.jpeg",
                name: "Sarah Martinez",
                role: "Bestselling Author",
                company: "Romance Novel Series",
                rating: 5,
                text: "Enoch transformed my book marketing completely. Within 3 months, I went from selling 50 copies to hitting the Amazon bestseller list. His strategies are pure gold!"
              },
              {
                avatar: "https://images.unsplash.com/photo-1610631066894-62452ccb927c",
                name: "David Chen",
                role: "E-commerce Founder",
                company: "TechGadgets Pro",
                rating: 5,
                text: "Working with Enoch was a game-changer. He scaled our monthly revenue from $15K to $60K in just 6 months. His paid ads expertise is unmatched."
              },
              {
                avatar: "https://images.pexels.com/photos/16781915/pexels-photo-16781915.jpeg",
                name: "Michael Thompson",
                role: "SaaS CEO",
                company: "ProductivityApp",
                rating: 5,
                text: "Enoch's email automation sequences generated over $100K in revenue for our SaaS. His understanding of customer psychology is incredible."
              }
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="star-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="testimonial-text">
                  "{testimonial.text}"
                </blockquote>
                <div className="testimonial-author">
                  <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
                  <div>
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-role">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-container">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-header text-center">
            <h2 className="section-title">Portfolio</h2>
            <p className="section-subtitle">
              Recent Projects & Creative Work
            </p>
          </div>
          <div className="portfolio-grid">
            {[
              {
                image: "https://images.pexels.com/photos/13638882/pexels-photo-13638882.jpeg",
                category: "Book Marketing",
                title: "Bestseller Campaign Design",
                description: "Complete marketing package for romance novel series"
              },
              {
                image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb",
                category: "Social Media",
                title: "Viral TikTok Strategy",
                description: "Content that generated 2M+ views for fitness brand"
              },
              {
                image: "https://images.pexels.com/photos/16053029/pexels-photo-16053029.jpeg",
                category: "Landing Pages",
                title: "High-Converting Sales Page",
                description: "SaaS landing page with 45% conversion rate"
              },
              {
                image: "https://images.unsplash.com/photo-1626076597347-fc204a64d0a6",
                category: "Paid Ads",
                title: "Meta Ads Campaign",
                description: "E-commerce campaign with 8x ROAS"
              },
              {
                image: "https://images.unsplash.com/photo-1551721434-f5a13c7a6d14",
                category: "Email Marketing",
                title: "Automation Sequence",
                description: "Welcome series that converts 35% of subscribers"
              },
              {
                image: "https://images.unsplash.com/photo-1661028191560-3aa1f664f397",
                category: "SEO Content",
                title: "Content Marketing Hub",
                description: "Blog strategy that ranks #1 for 50+ keywords"
              }
            ].map((item, index) => (
              <div key={index} className="portfolio-item">
                <div className="portfolio-image">
                  <img src={item.image} alt={item.title} />
                  <div className="portfolio-overlay">
                    <div className="portfolio-category">{item.category}</div>
                    <button className="portfolio-view-btn">
                      View Project
                    </button>
                  </div>
                </div>
                <div className="portfolio-content">
                  <h3 className="portfolio-title">{item.title}</h3>
                  <p className="portfolio-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="section-container bg-gradient">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-header text-center">
            <h2 className="section-title text-white">My Process</h2>
            <p className="section-subtitle text-blue-100">
              A Proven 3-Step System for Guaranteed Results
            </p>
          </div>
          <div className="process-steps">
            {[
              {
                step: "01",
                title: "Strategy",
                description: "Deep dive into your business, audience, and goals. I develop a custom roadmap designed specifically for your success.",
                features: ["Market research", "Competitor analysis", "Customer persona development", "Strategic planning"]
              },
              {
                step: "02",
                title: "Launch",
                description: "Execute the strategy with precision. I create and launch campaigns across all chosen channels with meticulous attention to detail.",
                features: ["Campaign creation", "Content development", "Channel setup", "Launch execution"]
              },
              {
                step: "03",
                title: "Optimize & Scale",
                description: "Continuously monitor, test, and optimize for maximum ROI. Once we hit our targets, we scale aggressively.",
                features: ["Performance monitoring", "A/B testing", "Optimization", "Scaling strategies"]
              }
            ].map((step, index) => (
              <div key={index} className="process-step">
                <div className="process-number">{step.step}</div>
                <div className="process-content">
                  <h3 className="process-title">{step.title}</h3>
                  <p className="process-description">{step.description}</p>
                  <ul className="process-features">
                    {step.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-container">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-header text-center">
            <h2 className="section-title">Let's Work Together</h2>
            <p className="section-subtitle">
              Ready to Transform Your Business? Let's Start the Conversation.
            </p>
          </div>
          <div className="contact-container">
            <div className="contact-form">
              <form className="space-y-6">
                <div className="form-group">
                  <input type="text" placeholder="Your Name" className="form-input" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" className="form-input" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Your Business/Project" className="form-input" required />
                </div>
                <div className="form-group">
                  <textarea rows={5} placeholder="Tell me about your goals and challenges..." className="form-input" required></textarea>
                </div>
                <button type="submit" className="cta-button primary-cta w-full">
                  Send Message
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="contact-label">Email</div>
                  <a href="mailto:oyeladeenochadedeji@gmail.com" className="contact-value">
                    oyeladeenochadedeji@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <div className="contact-label">WhatsApp</div>
                  <a href="https://wa.me//2347089692376" className="contact-value" target="_blank" rel="noopener noreferrer">
                    Message Me
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <div>
                  <div className="contact-label">LinkedIn</div>
                  <a href="https://www.linkedin.com/in/enoch-marketin" className="contact-value" target="_blank" rel="noopener noreferrer">
                    Connect with Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">Oyelade Enoch Adedeji</div>
            <p className="text-slate-400 mb-6">
              Digital Marketing Expert • Revenue Growth Specialist
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="mailto:oyeladeenochadedeji@gmail.com" className="footer-link">
                Email
              </a>
              <a href="https://wa.me//2347089692376" className="footer-link" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <a href="https://www.linkedin.com/in/enoch-marketin" className="footer-link" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
            <div className="border-t border-slate-800 pt-6">
              <p className="text-slate-500">
                © 2025 Oyelade Enoch Adedeji. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;