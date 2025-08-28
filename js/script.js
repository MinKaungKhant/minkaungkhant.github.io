// Global flag to prevent multiple initializations
let portfolioInitialized = false;

// Global variable to store visitor information
let visitorInfo = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    if (!portfolioInitialized) {
        initializePortfolio();
    }
});

// Fallback for older browsers or if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (!portfolioInitialized) {
            initializePortfolio();
        }
    });
} else {
    // DOM is already loaded
    if (!portfolioInitialized) {
        initializePortfolio();
    }
}

// Additional fallback for window load event
window.addEventListener('load', function() {
    // Only reinitialize navigation if hamburger doesn't work
    const hamburger = document.querySelector('.hamburger');
    if (hamburger && !hamburger.onclick && !hamburger.hasAttribute('data-initialized')) {
        console.log('Reinitializing navigation...');
        initNavigation();
    }
});

function initializePortfolio() {
    if (portfolioInitialized) {
        console.log('Portfolio already initialized, skipping...');
        return;
    }
    
    portfolioInitialized = true;
    console.log('Initializing Portfolio...');
    
    // Initialize EmailJS first
    initEmailJS();
    
    // Fetch visitor information in the background
    fetchVisitorInfo().then((info) => {
        console.log('📍 Visitor location detected:', info.city, info.country);
        
        // Automatically send visitor notification email after fetching visitor info
        setTimeout(() => {
            sendVisitorNotificationEmail(info);
        }, 2000); // Wait 2 seconds to ensure all data is loaded
    });
    
    // Initialize all components with small delays to ensure DOM is ready
    setTimeout(() => {
        initNavigation();
        initScrollAnimations();
        initSkillBars();
        initContactForm();
        initSmoothScrolling();
        initTypingAnimation();
        initParticleBackground();
        initScrollIndicator();
        initProjectFilters();
        initSkillAnimations();
        initCTAScroll();
        initResumeDownload(); // Initialize resume download tracking
        console.log('Portfolio initialization complete!');
    }, 50);
}

// Initialize EmailJS
function initEmailJS() {
    console.log('Initializing EmailJS...');
    
    if (typeof emailjs !== 'undefined') {
        if (window.EMAIL_CONFIG && window.EMAIL_CONFIG.PUBLIC_KEY) {
            emailjs.init(window.EMAIL_CONFIG.PUBLIC_KEY);
            console.log('✅ EmailJS initialized successfully');
        } else {
            // Fallback: initialize with hardcoded key
            emailjs.init('prjIZlyUwDG8noyXF');
            console.log('✅ EmailJS initialized with fallback key');
        }
    } else {
        console.log('❌ EmailJS library not available');
    }
}

// Fetch visitor IP and location information
async function fetchVisitorInfo() {
    try {
        console.log('🌍 Fetching visitor information...');
        
        const response = await fetch('https://ipapi.co/json/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if the API returned an error
        if (data.error) {
            throw new Error(data.reason || 'API returned an error');
        }
        
        visitorInfo = {
            ip: data.ip || 'Unknown',
            city: data.city || 'Unknown',
            region: data.region || 'Unknown',
            country: data.country_name || 'Unknown',
            countryCode: data.country_code || 'Unknown',
            timezone: data.timezone || 'Unknown',
            isp: data.org || 'Unknown',
            postal: data.postal || 'Unknown',
            latitude: data.latitude || 'Unknown',
            longitude: data.longitude || 'Unknown'
        };
        
        console.log('✅ Visitor info fetched successfully:', visitorInfo);
        return visitorInfo;
        
    } catch (error) {
        console.error('❌ Failed to fetch visitor information:', error);
        
        // Set fallback visitor info
        visitorInfo = {
            ip: 'Unable to fetch',
            city: 'Unable to fetch',
            region: 'Unable to fetch',
            country: 'Unable to fetch',
            countryCode: 'Unable to fetch',
            timezone: 'Unable to fetch',
            isp: 'Unable to fetch',
            postal: 'Unable to fetch',
            latitude: 'Unable to fetch',
            longitude: 'Unable to fetch',
            error: error.message
        };
        
        return visitorInfo;
    }
}

// Send visitor notification email automatically
function sendVisitorNotificationEmail(visitorData) {
    // Check if we should send visitor notifications (avoid spam)
    const lastVisitEmail = localStorage.getItem('lastVisitorEmailSent');
    const now = Date.now();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds (for production)
    
    // Only send email once per hour per visitor (production mode)
    if (lastVisitEmail && (now - parseInt(lastVisitEmail)) < oneHour) {
        console.log('⏰ Visitor email already sent recently, skipping...');
        return;
    }
    
    console.log('📧 Sending visitor notification email...');
    
    // Prepare visitor notification data (visitor info only)
    const visitorNotificationData = {
        action_type: 'page_visit',
        activity_message: `Visitor from ${visitorInfo?.city || 'Unknown'}, ${visitorInfo?.country || 'Unknown'} accessed your portfolio website.`
    };
    
    // Send the email
    sendEmailViaEmailJS(visitorNotificationData, null, null, null);
    
    // Store timestamp to prevent spam
    localStorage.setItem('lastVisitorEmailSent', now.toString());
    
    console.log('✅ Visitor notification email sent');
}

// Initialize resume download tracking
function initResumeDownload() {
    // Find all resume download links
    const resumeLinks = document.querySelectorAll('a[href*="resume"], a[href*="Resume"], a[href*="CV"], a[href*="cv"]');
    
    resumeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('📄 Resume download detected');
            
            // Send resume download notification email
            setTimeout(() => {
                sendResumeDownloadEmail();
            }, 500); // Small delay to ensure download starts
        });
    });
    
    console.log(`📄 Resume download tracking initialized for ${resumeLinks.length} links`);
}

// Send resume download notification email
function sendResumeDownloadEmail() {
    console.log('📧 Sending resume download notification email...');
    
    // Prepare resume download notification data (visitor info only)
    const resumeDownloadData = {
        action_type: 'resume_download',
        activity_message: `IP ${visitorInfo?.ip || 'Unknown'} from ${visitorInfo?.city || 'Unknown'}, ${visitorInfo?.country || 'Unknown'} downloaded your resume.`
    };
    
    // Send the email (no rate limiting for resume downloads)
    sendEmailViaEmailJS(resumeDownloadData, null, null, null);
    
    console.log('✅ Resume download notification email sent');
}

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Check if required elements exist
    if (!navbar || !hamburger || !navMenu) {
        console.warn('Navigation elements not found, retrying...');
        setTimeout(initNavigation, 100);
        return;
    }

    // Remove any existing event listeners to prevent duplicates
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);
    const hamburgerElement = document.querySelector('.hamburger');

    // Navbar scroll effect
    const handleScroll = () => {
        if (navbar && window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else if (navbar) {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    const handleHamburgerClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const navMenuElement = document.querySelector('.nav-menu');
        
        hamburgerElement.classList.toggle('active');
        navMenuElement.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    };

    hamburgerElement.addEventListener('click', handleHamburgerClick);
    hamburgerElement.setAttribute('data-initialized', 'true');

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerElement.classList.remove('active');
            document.querySelector('.nav-menu').classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const navMenuElement = document.querySelector('.nav-menu');
        if (!hamburgerElement.contains(e.target) && !navMenuElement.contains(e.target)) {
            hamburgerElement.classList.remove('active');
            navMenuElement.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Trigger counter animations
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('section, .skill-item, .project-card, .timeline-item, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, index * 200);
    });
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += step;
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCounter();
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    // Check if form already has event listener to prevent duplicates
    if (form.hasAttribute('data-initialized')) {
        console.log('Contact form already initialized, skipping...');
        return;
    }
    
    // Mark as initialized
    form.setAttribute('data-initialized', 'true');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        console.log('📝 Form submission handler triggered');
        console.log('🔍 Current visitorInfo:', visitorInfo);
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('📊 Form data:', data);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Check if EmailJS is configured
        if (window.EMAIL_CONFIG && window.EMAIL_CONFIG.PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
            console.log('✅ EmailJS config found:', window.EMAIL_CONFIG);
            // Send email using EmailJS (should already be initialized)
            if (typeof emailjs !== 'undefined') {
                console.log('✅ EmailJS library is loaded');
                // Add action_type for contact form submissions
                data.action_type = 'contact_form';
                sendEmailViaEmailJS(data, submitBtn, originalText, form);
            } else {
                console.log('❌ EmailJS library not loaded');
                // EmailJS library not loaded
                setTimeout(() => {
                    showNotification('Error: EmailJS library not loaded. Please refresh the page.', 'error');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            }
        } else {
            console.log('❌ EmailJS config not found or invalid');
            // EmailJS not configured properly
            setTimeout(() => {
                showNotification('Error: EmailJS not configured properly. Please check configuration.', 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        }
    });
}

// Send email using EmailJS
function sendEmailViaEmailJS(data, submitBtn, originalText, form) {
    console.log('🚀 Sending email via EmailJS...');
    
    // Use different templates based on action type
    let templateId;
    let templateParams;
    
    if (data?.action_type === 'contact_form') {
        // Use contact form template for contact submissions
        templateId = window.EMAIL_CONFIG?.TEMPLATE_ID || 'template_nakxnuh';
        templateParams = {
            from_name: data?.name || 'Contact Form User',
            from_email: data?.email || 'unknown@email.com',
            subject: data?.subject || 'Contact Form Message',
            message: data?.message || 'No message provided',
            reply_to: data?.email || 'unknown@email.com'
        };
    } else {
        // Use visitor template for page visits and resume downloads
        templateId = window.EMAIL_CONFIG?.VISITOR_TEMPLATE_ID || 'template_xvpv19h';
        templateParams = {
            // Action type (page_visit, resume_download)
            action_type: data?.action_type || 'page_visit',
            
            // Activity message for page visits and resume downloads
            activity_message: data?.activity_message || '',
            
            // Contact form fields (empty for visitor tracking)
            from_name: '',
            from_email: '',
            subject: '',
            message: '',
            
            // Visitor information fields - using simple strings
            visitor_ip: String(visitorInfo?.ip || 'Unknown'),
            visitor_city: String(visitorInfo?.city || 'Unknown'),
            visitor_region: String(visitorInfo?.region || 'Unknown'), 
            visitor_country: String(visitorInfo?.country || 'Unknown'),
            visitor_country_code: String(visitorInfo?.countryCode || 'Unknown'),
            visitor_timezone: String(visitorInfo?.timezone || 'Unknown'),
            visitor_isp: String(visitorInfo?.isp || 'Unknown'),
            visitor_postal: String(visitorInfo?.postal || 'Unknown'),
            visitor_latitude: String(visitorInfo?.latitude || 'Unknown'),
            visitor_longitude: String(visitorInfo?.longitude || 'Unknown'),
            timestamp: String(new Date().toLocaleString()),
            error_message: String(visitorInfo?.error || '')
        };
    }
    
    console.log('📧 Using template:', templateId);
    console.log('📧 Template params:', templateParams);
    
    // Use emailjs.send with the visitor template
    emailjs.send(
        window.EMAIL_CONFIG?.SERVICE_ID || 'service_y6aydpo', 
        templateId, 
        templateParams, 
        window.EMAIL_CONFIG?.PUBLIC_KEY || 'prjIZlyUwDG8noyXF'
    )
    .then(function(response) {
        console.log('✅ Email sent successfully!', response.status);
        if (submitBtn && form) {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }, function(error) {
        console.log('❌ Email sending failed:', error);
        console.log('Error details:', JSON.stringify(error));
        if (submitBtn && form) {
            showNotification('Failed to send message. Error: ' + (error.text || error.message || 'Unknown error'), 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const roles = [
        'Senior .NET Developer',
        'Full Stack Engineer',
        'Cloud Solutions Architect',
        'Software Development Lead'
    ];
    
    const roleElement = document.querySelector('.hero-role');
    if (!roleElement) return;
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeRole() {
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            roleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentCharIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at the end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before starting new word
        }
        
        setTimeout(typeRole, typeSpeed);
    }
    
    // Start typing animation after initial delay
    setTimeout(typeRole, 3000);
}

// Particle background animation
function initParticleBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    hero.style.position = 'relative';
    hero.appendChild(canvas);
    
    // Particle system
    const particles = [];
    const particleCount = 50;
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
            ctx.fill();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(102, 126, 234, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    initParticles();
    animate();
    
    window.addEventListener('resize', resizeCanvas);
}

// Scroll indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
    
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #f44336, #da190b)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Mouse follow effect for hero section
function initMouseFollowEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * 5;
        const rotateY = (centerX - x) / centerX * 5;
        
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });
    
    hero.addEventListener('mouseleave', () => {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
    });
}

// Initialize mouse follow effect
initMouseFollowEffect();

// Parallax scrolling effect
function initParallaxScrolling() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Initialize parallax scrolling
initParallaxScrolling();

// Theme toggle functionality (if needed)
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Handle scroll events here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.remove();
        }, 500);
    });
}

// Initialize preloader
initPreloader();

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
    // You can add error reporting here
});

// Project filtering functionality
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    const cardCategories = card.getAttribute('data-category');
                    if (cardCategories && cardCategories.includes(filterValue)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.6s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Enhanced skill animations
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width;
                skillBar.style.transition = 'width 2s ease-in-out';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// CTA smooth scrolling functionality
function initCTAScroll() {
    const ctaBtn = document.querySelector('.cta-section .btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
