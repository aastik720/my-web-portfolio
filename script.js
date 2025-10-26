/* ================== CONFIGURATION & CONSTANTS ================== */
const CONFIG = {
  typingSpeed: 100,
  deletingSpeed: 50,
  typingDelay: 2000,
  particleCount: 100,
  scrollThreshold: 300,
  observerThreshold: 0.15,
  animationDuration: 800
};

/* ================== UTILITY FUNCTIONS ================== */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/* ================== PRELOADER ================== */
window.addEventListener('load', () => {
  const preloader = $('#preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = 'visible';
      
      // Trigger entrance animations
      setTimeout(() => {
        $$('.fade-in, .fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3')
          .forEach(el => el.style.opacity = '1');
      }, 300);
    }, 1000);
  }
});

/* ================== SCROLL PROGRESS BAR ================== */
const updateScrollProgress = () => {
  const scrollProgress = $('#scrollProgress');
  if (!scrollProgress) return;
  
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollProgress.style.width = `${scrolled}%`;
};

window.addEventListener('scroll', throttle(updateScrollProgress, 10));

/* ================== PARTICLES.JS INITIALIZATION ================== */
if (typeof particlesJS !== 'undefined') {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#667eea' },
      shape: { type: 'circle' },
      opacity: {
        value: 0.5,
        random: false,
        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#667eea',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: { distance: 400, size: 40, duration: 2, opacity: 8 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 }
      }
    },
    retina_detect: true
  });
}

/* ================== NAVBAR FUNCTIONALITY ================== */
const navbar = $('.navbar');
const menuToggle = $('#menuToggle');
const navLinks = $('#navLinks');
const navLinkItems = $$('.nav-link');

// Navbar scroll effect
const handleNavbarScroll = () => {
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', throttle(handleNavbarScroll, 100));

// Mobile menu toggle
menuToggle?.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks?.classList.toggle('active');
  document.body.style.overflow = navLinks?.classList.contains('active') ? 'hidden' : 'visible';
});

// Close mobile menu on link click
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle?.classList.remove('active');
    navLinks?.classList.remove('active');
    document.body.style.overflow = 'visible';
  });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar?.contains(e.target) && navLinks?.classList.contains('active')) {
    menuToggle?.classList.remove('active');
    navLinks?.classList.remove('active');
    document.body.style.overflow = 'visible';
  }
});

/* ================== ACTIVE NAVIGATION LINK ================== */
const sections = $$('section[id]');

const highlightNavigation = () => {
  const scrollY = window.scrollY;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      $$('.nav-link').forEach(link => link.classList.remove('active'));
      $(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
    }
  });
};

window.addEventListener('scroll', throttle(highlightNavigation, 100));

/* ================== THEME TOGGLE ================== */
const themeToggle = $('#themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
  document.body.classList.add('light-mode');
  if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  
  // Update icon
  if (document.body.classList.contains('light-mode')) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'light');
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'dark');
  }
  
  // Add animation
  themeToggle.style.transform = 'rotate(360deg)';
  setTimeout(() => themeToggle.style.transform = 'rotate(0deg)', 300);
});

/* ================== TYPED.JS INITIALIZATION ================== */
if (typeof Typed !== 'undefined') {
  // Hero title typing
  const typedElement = $('#typed');
  if (typedElement) {
    new Typed('#typed', {
      strings: ['Aastik Rawat', 'a Developer', 'a Designer', 'an AI Enthusiast'],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      autoInsertCss: true
    });
  }

  // Subtitle typing
  const typedSubtitle = $('#typedSubtitle');
  if (typedSubtitle) {
    new Typed('#typedSubtitle', {
      strings: [
        'Developer | Designer | AI Enthusiast',
        'Building Intelligent Systems',
        'Creating Beautiful Experiences',
        'Solving Complex Problems'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 3000,
      startDelay: 1500,
      loop: true,
      showCursor: false
    });
  }
}

/* ================== SMOOTH SCROLL ================== */
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = $(targetId);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

/* ================== CV DOWNLOAD BUTTON ================== */
const cvBtn = $('#cvBtn');
cvBtn?.addEventListener('click', function() {
  const originalText = this.innerHTML;
  this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
  this.disabled = true;
  
  // Simulate download (replace with actual CV link)
  setTimeout(() => {
    // window.open('path/to/your/cv.pdf', '_blank');
    alert('CV download will be available soon!\nPlease add your CV link in the JavaScript file.');
    this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
    
    setTimeout(() => {
      this.innerHTML = originalText;
      this.disabled = false;
    }, 2000);
  }, 1500);
});

/* ================== STATS COUNTER ANIMATION ================== */
const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
};

const counters = $$('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

/* ================== SKILLS BAR ANIMATION ================== */
const skillCards = $$('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target.querySelector('.skill-progress');
      if (progressBar) {
        const width = progressBar.getAttribute('data-width');
        setTimeout(() => {
          progressBar.style.width = width;
        }, 200);
      }
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillCards.forEach(card => {
  const progressBar = card.querySelector('.skill-progress');
  if (progressBar) {
    progressBar.style.width = '0';
  }
  skillObserver.observe(card);
});

/* ================== AOS (ANIMATE ON SCROLL) INITIALIZATION ================== */
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
    delay: 100
  });
}

/* ================== VANILLA TILT INITIALIZATION ================== */
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init($$('[data-tilt]'), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.2,
    scale: 1.05
  });
}

/* ================== PROJECT FILTERS ================== */
const filterBtns = $$('.filter-btn');
const projectCards = $$('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    const filterValue = this.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      
      if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

/* ================== CONTACT FORM HANDLING ================== */
const contactForm = $('#contactForm');

contactForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  // Get form data
  const formData = {
    name: $('#name')?.value,
    email: $('#email')?.value,
    subject: $('#subject')?.value,
    message: $('#message')?.value
  };
  
  // Basic validation
  if (!formData.name || !formData.email || !formData.message) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }
  
  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
  submitBtn.disabled = true;
  
  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    console.log('Form Data:', formData);
    
    // Show success message
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    
    // Reset form
    this.reset();
    
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

/* ================== NOTIFICATION SYSTEM ================== */
const showNotification = (message, type = 'info') => {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  
  // Add styles
  Object.assign(notification.style, {
    position: 'fixed',
    top: '100px',
    right: '20px',
    padding: '1rem 1.5rem',
    background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
    color: '#fff',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    zIndex: '10000',
    animation: 'slideInRight 0.3s ease',
    fontSize: '0.95rem',
    fontWeight: '500'
  });
  
  document.body.appendChild(notification);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
};

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);

/* ================== BACK TO TOP BUTTON ================== */
const backToTop = $('#backToTop');

const toggleBackToTop = () => {
  if (window.scrollY > CONFIG.scrollThreshold) {
    backToTop?.classList.add('visible');
  } else {
    backToTop?.classList.remove('visible');
  }
};

window.addEventListener('scroll', throttle(toggleBackToTop, 100));

backToTop?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/* ================== FLOATING ACTION BUTTON (FAB) ================== */
const fabContainer = $('.fab-container');
const mainFab = $('#mainFab');

mainFab?.addEventListener('click', (e) => {
  e.stopPropagation();
  fabContainer?.classList.toggle('active');
});

// Close FAB on outside click
document.addEventListener('click', (e) => {
  if (!fabContainer?.contains(e.target)) {
    fabContainer?.classList.remove('active');
  }
});

/* ================== PARALLAX EFFECT ================== */
const parallaxElements = $$('[data-parallax]');

const handleParallax = () => {
  const scrolled = window.scrollY;
  
  parallaxElements.forEach(element => {
    const speed = element.getAttribute('data-parallax') || 0.5;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
};

if (parallaxElements.length > 0) {
  window.addEventListener('scroll', throttle(handleParallax, 10));
}

/* ================== IMAGE LAZY LOADING ================== */
const lazyImages = $$('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
      img.classList.add('loaded');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));

/* ================== CURSOR FOLLOW EFFECT (OPTIONAL) ================== */
const createCustomCursor = () => {
  const cursor = document.createElement('div');
  const cursorDot = document.createElement('div');
  
  cursor.className = 'custom-cursor';
  cursorDot.className = 'custom-cursor-dot';
  
  Object.assign(cursor.style, {
    position: 'fixed',
    width: '40px',
    height: '40px',
    border: '2px solid #667eea',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: '9999',
    transition: 'transform 0.15s ease',
    opacity: '0'
  });
  
  Object.assign(cursorDot.style, {
    position: 'fixed',
    width: '8px',
    height: '8px',
    background: '#667eea',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: '9999',
    transition: 'transform 0.05s ease',
    opacity: '0'
  });
  
  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let dotX = 0, dotY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });
  
  const animateCursor = () => {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    dotX += (mouseX - dotX) * 0.15;
    dotY += (mouseY - dotY) * 0.15;
    
    cursor.style.left = cursorX - 20 + 'px';
    cursor.style.top = cursorY - 20 + 'px';
    cursorDot.style.left = dotX - 4 + 'px';
    cursorDot.style.top = dotY - 4 + 'px';
    
    requestAnimationFrame(animateCursor);
  };
  
  animateCursor();
  
  // Cursor hover effects
  const hoverElements = $$('a, button, .skill-card, .project-card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
      cursor.style.borderColor = '#f093fb';
      cursorDot.style.transform = 'scale(1.5)';
      cursorDot.style.background = '#f093fb';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.borderColor = '#667eea';
      cursorDot.style.transform = 'scale(1)';
      cursorDot.style.background = '#667eea';
    });
  });
};

// Only enable custom cursor on desktop
if (window.innerWidth > 768 && matchMedia('(hover: hover)').matches) {
  createCustomCursor();
}

/* ================== KEYBOARD NAVIGATION ================== */
document.addEventListener('keydown', (e) => {
  // ESC key - Close mobile menu and FAB
  if (e.key === 'Escape') {
    menuToggle?.classList.remove('active');
    navLinks?.classList.remove('active');
    fabContainer?.classList.remove('active');
    document.body.style.overflow = 'visible';
  }
  
  // Home key - Scroll to top
  if (e.key === 'Home' && e.ctrlKey) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // End key - Scroll to bottom
  if (e.key === 'End' && e.ctrlKey) {
    e.preventDefault();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
});

/* ================== PERFORMANCE MONITORING ================== */
const logPerformance = () => {
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log(`%c⚡ Page loaded in ${loadTime}ms`, 'color: #10b981; font-size: 14px; font-weight: bold;');
  }
};

window.addEventListener('load', logPerformance);

/* ================== EASTER EGG - KONAMI CODE ================== */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

const activateEasterEgg = () => {
  showNotification('🎉 Konami Code Activated! You found the secret!', 'success');
  
  // Add rainbow animation to body
  document.body.style.animation = 'rainbow 2s linear infinite';
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  setTimeout(() => {
    document.body.style.animation = '';
  }, 5000);
};

/* ================== CONSOLE MESSAGES ================== */
console.log(
  '%c👋 Welcome to Aastik\'s Portfolio!',
  'color: #667eea; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
);

console.log(
  '%c🚀 Built with Modern Web Technologies',
  'color: #764ba2; font-size: 16px; font-weight: bold;'
);

console.log(
  '%c💡 Tech Stack: HTML5, CSS3, JavaScript ES6+, Particles.js, AOS, Typed.js, Vanilla Tilt',
  'color: #f093fb; font-size: 14px;'
);

console.log(
  '%c🎨 Features: Responsive Design, Dark/Light Mode, Animations, Interactive Elements',
  'color: #4facfe; font-size: 14px;'
);

console.log(
  '%c📧 Want to hire me? Contact: aastik@example.com',
  'color: #10b981; font-size: 14px; font-weight: bold;'
);

console.log(
  '%c🎮 Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A',
  'color: #fbbf24; font-size: 12px; font-style: italic;'
);

/* ================== ERROR HANDLING ================== */
window.addEventListener('error', (e) => {
  console.error('An error occurred:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

/* ================== SERVICE WORKER (OPTIONAL - FOR PWA) ================== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('/sw.js')
    //   .then(reg => console.log('Service Worker registered'))
    //   .catch(err => console.log('Service Worker registration failed'));
  });
}

/* ================== INITIALIZE EVERYTHING ================== */
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c✅ Portfolio Initialized Successfully!', 'color: #10b981; font-size: 16px; font-weight: bold;');
  
  // Additional initialization code here
  updateScrollProgress();
  handleNavbarScroll();
  highlightNavigation();
  toggleBackToTop();
});

/* ================== END OF JAVASCRIPT ================== */