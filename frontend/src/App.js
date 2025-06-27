import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [counters, setCounters] = useState({
    revenue: 0,
    campaigns: 0,
    satisfaction: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    // Loading animation
    setTimeout(() => setIsLoading(false), 2000);

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

      // Animate stats when in view
      if (statsRef.current && !hasAnimated) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setHasAnimated(true);
          animateCounters();
        }
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    const targets = { revenue: 2000000, campaigns: 500, satisfaction: 98 };
    const duration = 2000;
    const intervals = {
      revenue: setInterval(() => {
        setCounters(prev => {
          const increment = targets.revenue / (duration / 50);
          const newValue = Math.min(prev.revenue + increment, targets.revenue);
          if (newValue >= targets.revenue) clearInterval(intervals.revenue);
          return { ...prev, revenue: Math.floor(newValue) };
        });
      }, 50),
      campaigns: setInterval(() => {
        setCounters(prev => {
          const increment = targets.campaigns / (duration / 50);
          const newValue = Math.min(prev.campaigns + increment, targets.campaigns);
          if (newValue >= targets.campaigns) clearInterval(intervals.campaigns);
          return { ...prev, campaigns: Math.floor(newValue) };
        });
      }, 50),
      satisfaction: setInterval(() => {
        setCounters(prev => {
          const increment = targets.satisfaction / (duration / 50);
          const newValue = Math.min(prev.satisfaction + increment, targets.satisfaction);
          if (newValue >= targets.satisfaction) clearInterval(intervals.satisfaction);
          return { ...prev, satisfaction: Math.floor(newValue) };
        });
      }, 50)
    };
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">
            <div className="logo-text">Oyelade Enoch</div>
            <div className="logo-subtitle">Digital Marketing Expert</div>
          </div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Custom Cursor */}
      <div 
        className="custom-cursor"
        style={{ left: mousePosition.x, top: mousePosition.y }}
      ></div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'nav-scrolled' 
          : 'nav-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="nav-logo">
              <div className="logo-main">Oyelade Enoch</div>
              <div className="logo-sub">Digital Marketing Expert</div>
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
            <div className="nav-cta hidden lg:block">
              <button 
                onClick={() => scrollToSection('contact')}
                className="nav-cta-button"
              >
                Get Started
              </button>
            </div>
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
          <div className="hero-pattern"></div>
        </div>
        
        <div className="hero-content">
          <div className="max-w-5xl mx-auto text-center px-6">
            <div className="hero-badge">
              <span className="badge-icon">🚀</span>
              <span>$2M+ Revenue Generated for Clients</span>
            </div>
            
            <h1 className="hero-title">
              I Turn Your Business Into a
              <span className="gradient-text-animated"> Revenue Machine</span>
            </h1>
            
            <p className="hero-subtitle">
              Join 500+ successful entrepreneurs who've scaled from $0 to 6-figures using my 
              proven digital marketing strategies. No fluff, just results that speak for themselves.
            </p>
            
            <div className="hero-social-proof">
              <div className="proof-item">
                <div className="proof-number">98%</div>
                <div className="proof-label">Client Satisfaction</div>
              </div>
              <div className="proof-item">
                <div className="proof-number">$2M+</div>
                <div className="proof-label">Revenue Generated</div>
              </div>
              <div className="proof-item">
                <div className="proof-number">500+</div>
                <div className="proof-label">Success Stories</div>
              </div>
            </div>
            
            <div className="hero-cta">
              <button 
                onClick={() => scrollToSection('contact')}
                className="cta-button primary-cta premium-glow"
              >
                <span className="cta-text">Book Free Strategy Call</span>
                <span className="cta-price">($497 Value)</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button 
                onClick={() => scrollToSection('results')}
                className="cta-button secondary-cta"
              >
                <span>See Success Stories</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            
            <div className="hero-urgency">
              <span className="urgency-icon">⚡</span>
              <span>Only 3 Strategy Calls Available This Month</span>
            </div>
          </div>
        </div>
        
        <div className="hero-scroll-indicator">
          <div className="scroll-text">Scroll to Discover</div>
          <div className="scroll-mouse"></div>
        </div>
      </section>

      {/* About Section with Enhanced Authority */}
      <section id="about" className="section-container">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="section-header">
                <div className="section-badge">About Me</div>
                <h2 className="section-title">
                  Meet The Marketing Strategist Behind 
                  <span className="gradient-text"> $2M+ in Client Success</span>
                </h2>
              </div>
              
              <div className="authority-content">
                <p className="lead-text">
                  I'm not just another marketer making promises. I'm Oyelade Enoch Adedeji, 
                  and I've built my reputation by delivering measurable results that transform businesses.
                </p>
                
                <div className="credentials-grid">
                  <div className="credential-item">
                    <div className="credential-icon">🎯</div>
                    <div className="credential-text">5+ Years Proven Track Record</div>
                  </div>
                  <div className="credential-item">
                    <div className="credential-icon">📈</div>
                    <div className="credential-text">500+ Successful Campaigns</div>
                  </div>
                  <div className="credential-item">
                    <div className="credential-icon">💎</div>
                    <div className="credential-text">Multi-Industry Expertise</div>
                  </div>
                  <div className="credential-item">
                    <div className="credential-icon">🏆</div>
                    <div className="credential-text">98% Client Retention Rate</div>
                  </div>
                </div>
                
                <div className="guarantee-box">
                  <div className="guarantee-icon">🛡️</div>
                  <div className="guarantee-content">
                    <div className="guarantee-title">My Iron-Clad Guarantee</div>
                    <div className="guarantee-text">
                      If you don't see measurable results within 90 days, 
                      I'll work for free until you do.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="about-visual">
              <div className="about-image-container">
                <img 
                  src="https://images.pexels.com/photos/7789851/pexels-photo-7789851.jpeg" 
                  alt="Oyelade Enoch Adedeji - Digital Marketing Expert"
                  className="about-image"
                />
                <div className="image-badge">
                  <span className="badge-text">Trusted by 500+ Clients</span>
                </div>
              </div>
              
              <div ref={statsRef} className="stats-floating">
                <div className="stat-float">
                  <div className="stat-number">${counters.revenue.toLocaleString()}+</div>
                  <div className="stat-label">Revenue Generated</div>
                </div>
                <div className="stat-float">
                  <div className="stat-number">{counters.campaigns}+</div>
                  <div className="stat-label">Campaigns Launched</div>
                </div>
                <div className="stat-float">
                  <div className="stat-number">{counters.satisfaction}%</div>
                  <div className="stat-label">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="section-container services-premium">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-header text-center">
            <div className="section-badge light">My Expertise</div>
            <h2 className="section-title text-white">
              6 Proven Services That 
              <span className="gradient-text-light"> Scale Your Revenue</span>
            </h2>
            <p className="section-subtitle text-blue-100">
              Each service is battle-tested across 500+ campaigns and guaranteed to deliver ROI
            </p>
          </div>
          
          <div className="services-grid-premium">
            {[
              {
                icon: "📚",
                image: "https://images.pexels.com/photos/13638882/pexels-photo-13638882.jpeg",
                title: "Book Marketing Mastery",
                subtitle: "Amazon Bestseller Specialist",
                description: "Transform your book into a bestselling revenue generator with targeted campaigns that reach hungry readers.",
                features: ["Amazon Algorithm Optimization", "Targeted Reader Acquisition", "Review Generation System", "Launch Strategy Blueprint"],
                result: "Average: 450% sales increase in 30 days"
              },
              {
                icon: "🤝",
                image: "https://images.unsplash.com/photo-1491951931722-5a446214b4e2",
                title: "Affiliate Marketing Empire",
                subtitle: "Passive Income Systems",
                description: "Build profitable affiliate networks that generate consistent passive income streams for your business.",
                features: ["High-Converting Affiliate Funnels", "Partnership Network Building", "Commission Optimization", "Automated Systems"],
                result: "Average: $10K+ monthly passive income"
              },
              {
                icon: "📱",
                image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb",
                title: "Viral Social Media",
                subtitle: "TikTok & Instagram Domination",
                description: "Create viral content strategies that build massive engaged audiences and convert followers to customers.",
                features: ["Viral Content Formula", "Influencer Partnerships", "Community Building", "Conversion Optimization"],
                result: "Average: 2M+ views, 50K+ followers"
              },
              {
                icon: "🎯",
                image: "https://images.unsplash.com/photo-1626076597347-fc204a64d0a6",
                title: "High-ROI Paid Ads",
                subtitle: "Meta & Google Certified",
                description: "Scale your business with laser-targeted ad campaigns that consistently deliver 5x+ ROAS.",
                features: ["Advanced Targeting Systems", "Creative Testing Lab", "Conversion Tracking", "Budget Optimization"],
                result: "Average: 8x ROAS, $100K+ monthly spend"
              },
              {
                icon: "✉️",
                image: "https://images.unsplash.com/photo-1551721434-f5a13c7a6d14",
                title: "Email Automation Funnels",
                subtitle: "Customer Lifetime Value Maximizer",
                description: "Build sophisticated email sequences that nurture leads and maximize customer lifetime value.",
                features: ["Behavioral Trigger Sequences", "Segmentation Strategies", "Personalization Engine", "Retention Campaigns"],
                result: "Average: 35% conversion rate, $50 per subscriber"
              },
              {
                icon: "🔍",
                image: "https://images.unsplash.com/photo-1661028191560-3aa1f664f397",
                title: "SEO & Content Domination",
                subtitle: "Organic Traffic Authority",
                description: "Dominate search rankings and build unshakeable brand authority with strategic content marketing.",
                features: ["Keyword Domination Strategy", "Authority Content Creation", "Link Building Campaigns", "Technical SEO Mastery"],
                result: "Average: #1 rankings for 50+ keywords"
              }
            ].map((service, index) => (
              <div key={index} className="service-card-premium">
                <div className="service-image-container">
                  <img src={service.image} alt={service.title} className="service-bg-image" />
                  <div className="service-icon-large">{service.icon}</div>
                </div>
                
                <div className="service-content">
                  <div className="service-header">
                    <h3 className="service-title">{service.title}</h3>
                    <div className="service-subtitle">{service.subtitle}</div>
                  </div>
                  
                  <p className="service-description">{service.description}</p>
                  
                  <ul className="service-features">
                    {service.features.map((feature, i) => (
                      <li key={i}>
                        <span className="feature-check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="service-result">
                    <span className="result-icon">📊</span>
                    <span className="result-text">{service.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Results Section */}
      <section id="results" className="section-container results-showcase">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-header text-center">
            <div className="section-badge">Proven Results</div>
            <h2 className="section-title">
              Real Clients, Real Revenue,
              <span className="gradient-text"> Real ROI</span>
            </h2>
            <p className="section-subtitle">
              These aren't just case studies—they're proof that my strategies work
            </p>
          </div>
          
          <div className="results-grid-enhanced">
            {[
              {
                image: "https://images.pexels.com/photos/13638882/pexels-photo-13638882.jpeg",
                client: "Sarah M.",
                industry: "Romance Author",
                challenge: "Zero sales, unknown author",
                metric: "450% Sales Increase",
                timeline: "30 Days",
                revenue: "$47,000",
                description: "Transformed unknown romance author into Amazon bestseller through strategic book marketing campaign.",
                results: [
                  "15,000+ copies sold in first month",
                  "Top 3 in Romance category",
                  "Featured in major media outlets",
                  "Built email list of 8,000+ fans"
                ],
                quote: "Enoch didn't just market my book—he transformed my entire author business!"
              },
              {
                image: "https://images.pexels.com/photos/8254894/pexels-photo-8254894.jpeg",
                client: "David C.",
                industry: "E-commerce Store",
                challenge: "Struggling with $10K monthly revenue",
                metric: "300% Revenue Growth",
                timeline: "6 Months",
                revenue: "$120,000",
                description: "Scaled struggling e-commerce store using social media and strategic paid advertising.",
                results: [
                  "$40K+ monthly recurring revenue",
                  "60% reduction in customer acquisition cost",
                  "5x return on ad spend",
                  "Built loyal customer community of 50K+"
                ],
                quote: "Best investment I ever made. Enoch's strategies are pure gold!"
              },
              {
                image: "https://images.unsplash.com/photo-1553639558-fb2e565066f5",
                client: "Michael T.",
                industry: "B2B SaaS",
                challenge: "Low-quality leads, poor conversion",
                metric: "250% Lead Quality Increase",
                timeline: "90 Days",
                revenue: "$200,000",
                description: "Generated 500+ qualified leads for B2B SaaS through LinkedIn and email automation.",
                results: [
                  "500+ high-quality leads generated",
                  "40% lead-to-customer conversion rate",
                  "$200K+ in pipeline value created",
                  "Reduced sales cycle by 50%"
                ],
                quote: "Enoch's lead generation system revolutionized our entire sales process!"
              }
            ].map((result, index) => (
              <div key={index} className="result-card-enhanced">
                <div className="result-image-section">
                  <img src={result.image} alt={result.client} className="result-image" />
                  <div className="result-overlay">
                    <div className="result-metrics">
                      <div className="metric-primary">{result.metric}</div>
                      <div className="metric-timeline">in {result.timeline}</div>
                    </div>
                  </div>
                </div>
                
                <div className="result-content-section">
                  <div className="result-header">
                    <div className="client-info">
                      <div className="client-name">{result.client}</div>
                      <div className="client-industry">{result.industry}</div>
                    </div>
                    <div className="revenue-badge">{result.revenue} Generated</div>
                  </div>
                  
                  <div className="challenge-section">
                    <div className="challenge-label">The Challenge:</div>
                    <div className="challenge-text">{result.challenge}</div>
                  </div>
                  
                  <p className="result-description">{result.description}</p>
                  
                  <div className="results-list">
                    {result.results.map((item, i) => (
                      <div key={i} className="result-item">
                        <span className="result-check">🎯</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <blockquote className="client-quote">
                    <span className="quote-mark">"</span>
                    {result.quote}
                    <span className="quote-mark">"</span>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
          
          <div className="results-cta">
            <div className="cta-content">
              <h3 className="cta-title">Ready to Be My Next Success Story?</h3>
              <p className="cta-subtitle">Join the elite group of entrepreneurs who've transformed their businesses</p>
              <button 
                onClick={() => scrollToSection('contact')}
                className="cta-button primary-cta mega-glow"
              >
                <span>Book Your Success Call Now</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Continue with other sections... */}
      {/* Testimonials, Portfolio, Process, Contact sections would follow with similar enhancements */}
      
      {/* Testimonials Section */}
      <section id="testimonials" className="section-container testimonials-premium">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-header text-center">
            <div className="section-badge">Client Love</div>
            <h2 className="section-title">
              What Industry Leaders Say About
              <span className="gradient-text"> Working With Me</span>
            </h2>
            <p className="section-subtitle">
              Don't just take my word for it—hear from clients who've transformed their businesses
            </p>
          </div>
          
          <div className="testimonials-grid-premium">
            {[
              {
                avatar: "https://images.pexels.com/photos/7616608/pexels-photo-7616608.jpeg",
                name: "Sarah Martinez",
                role: "Bestselling Romance Author",
                company: "6-Figure Author Business",
                rating: 5,
                revenue: "$47K in 30 days",
                text: "Enoch didn't just help me sell books—he transformed me into a 6-figure author entrepreneur. His strategies are absolutely genius!",
                highlight: "From zero to bestseller in 30 days"
              },
              {
                avatar: "https://images.unsplash.com/photo-1610631066894-62452ccb927c",
                name: "David Chen",
                role: "E-commerce Founder",
                company: "TechGadgets Empire",
                rating: 5,
                revenue: "$120K+ monthly",
                text: "Working with Enoch was the turning point for my business. He scaled us from $15K to $60K monthly revenue in just 6 months!",
                highlight: "300% revenue growth achieved"
              },
              {
                avatar: "https://images.pexels.com/photos/16781915/pexels-photo-16781915.jpeg",
                name: "Michael Thompson",
                role: "SaaS CEO",
                company: "ProductivityPro",
                rating: 5,
                revenue: "$200K pipeline",
                text: "Enoch's email automation sequences generated over $100K in revenue for our SaaS. His understanding of customer psychology is incredible.",
                highlight: "500+ qualified leads in 90 days"
              }
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card-premium">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    <img src={testimonial.avatar} alt={testimonial.name} />
                    <div className="verified-badge">✓</div>
                  </div>
                  <div className="testimonial-info">
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-role">{testimonial.role}</div>
                    <div className="testimonial-company">{testimonial.company}</div>
                  </div>
                  <div className="testimonial-revenue">{testimonial.revenue}</div>
                </div>
                
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
                
                <div className="testimonial-highlight">
                  <span className="highlight-icon">🎯</span>
                  <span>{testimonial.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Continue with remaining sections - Portfolio, Process, Contact */}
      {/* ... (keeping character limit in mind, continuing with key sections) */}

      {/* Contact Section Enhanced */}
      <section id="contact" className="section-container contact-premium">
        <div className="max-w-5xl mx-auto px-6">
          <div className="section-header text-center">
            <div className="section-badge">Let's Talk</div>
            <h2 className="section-title">
              Ready to Join the
              <span className="gradient-text"> $2M+ Revenue Club?</span>
            </h2>
            <p className="section-subtitle">
              Book your complimentary strategy session and discover how to scale your business
            </p>
            
            <div className="urgency-banner">
              <span className="urgency-icon">⚡</span>
              <span className="urgency-text">Limited: Only 3 strategy calls available this month</span>
              <span className="urgency-value">($497 Value - FREE for qualified applicants)</span>
            </div>
          </div>
          
          <div className="contact-container-premium">
            <div className="contact-form-premium">
              <div className="form-header">
                <h3 className="form-title">Book Your FREE Strategy Session</h3>
                <p className="form-subtitle">Tell me about your business and let's create your growth plan</p>
              </div>
              
              <form className="premium-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input type="text" placeholder="Enter your full name" className="form-input premium" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" placeholder="your@email.com" className="form-input premium" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Current Monthly Revenue *</label>
                  <select className="form-input premium" required>
                    <option value="">Select your current range</option>
                    <option value="0-1k">$0 - $1,000</option>
                    <option value="1k-5k">$1,000 - $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-50k">$10,000 - $50,000</option>
                    <option value="50k+">$50,000+</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Your Biggest Challenge *</label>
                  <textarea 
                    rows={4} 
                    placeholder="What's your #1 challenge in scaling your business right now?" 
                    className="form-input premium" 
                    required
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label>Revenue Goal</label>
                  <input 
                    type="text" 
                    placeholder="What's your 12-month revenue goal?" 
                    className="form-input premium" 
                  />
                </div>
                
                <button type="submit" className="cta-button primary-cta premium-submit">
                  <span className="submit-icon">🚀</span>
                  <span>Book My FREE Strategy Session</span>
                  <span className="submit-value">($497 Value)</span>
                </button>
              </form>
              
              <div className="form-guarantee">
                <span className="guarantee-icon">🛡️</span>
                <span>100% Confidential • No Spam • Instant Calendar Access</span>
              </div>
            </div>
            
            <div className="contact-info-premium">
              <div className="contact-card">
                <div className="contact-header">
                  <h4>Prefer Direct Contact?</h4>
                  <p>Choose your preferred method</p>
                </div>
                
                <div className="contact-methods">
                  <a href="mailto:oyeladeenochadedeji@gmail.com" className="contact-method">
                    <div className="method-icon email">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="method-content">
                      <div className="method-title">Email Me</div>
                      <div className="method-subtitle">oyeladeenochadedeji@gmail.com</div>
                    </div>
                  </a>
                  
                  <a href="https://wa.me//2347089692376" className="contact-method" target="_blank" rel="noopener noreferrer">
                    <div className="method-icon whatsapp">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div className="method-content">
                      <div className="method-title">WhatsApp</div>
                      <div className="method-subtitle">Instant Response</div>
                    </div>
                  </a>
                  
                  <a href="https://www.linkedin.com/in/enoch-marketin" className="contact-method" target="_blank" rel="noopener noreferrer">
                    <div className="method-icon linkedin">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                      </svg>
                    </div>
                    <div className="method-content">
                      <div className="method-title">LinkedIn</div>
                      <div className="method-subtitle">Professional Network</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Enhanced */}
      <footer className="footer-premium">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-main">Oyelade Enoch Adedeji</div>
                <div className="logo-tagline">Digital Marketing Expert & Revenue Growth Specialist</div>
              </div>
              <p className="footer-description">
                Transforming businesses through proven digital marketing strategies. 
                Join 500+ successful entrepreneurs who've scaled with my systems.
              </p>
              <div className="footer-stats">
                <div className="footer-stat">
                  <span className="stat-number">$2M+</span>
                  <span className="stat-label">Revenue Generated</span>
                </div>
                <div className="footer-stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Success Stories</span>
                </div>
                <div className="footer-stat">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Client Satisfaction</span>
                </div>
              </div>
            </div>
            
            <div className="footer-cta">
              <h4 className="footer-cta-title">Ready to Scale Your Business?</h4>
              <p className="footer-cta-text">Book your complimentary strategy session today</p>
              <button 
                onClick={() => scrollToSection('contact')}
                className="footer-cta-button"
              >
                Book Free Call
              </button>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-links">
              <a href="mailto:oyeladeenochadedeji@gmail.com" className="footer-link">Email</a>
              <a href="https://wa.me//2347089692376" className="footer-link" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href="https://www.linkedin.com/in/enoch-marketin" className="footer-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <div className="footer-copyright">
              <p>© 2025 Oyelade Enoch Adedeji. All rights reserved. | Results not typical. Individual results may vary.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;