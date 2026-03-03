// ==========================================
// Main JavaScript File
// ==========================================

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// ==========================================
// Dark Mode Toggle
// ==========================================

function toggleTheme() {
    const body = document.body;
    const btn = event.target.closest('.btn-theme');
    
    body.classList.toggle('dark-theme');
    
    // Save preference to localStorage
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        btn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'light');
        btn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const themeBtn = document.querySelector('.btn-theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// ==========================================
// Smooth Scrolling for Navigation Links
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// Active Navigation Link
// ==========================================

function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ==========================================
// Navbar Collapse on Link Click
// ==========================================

const navbarCollapse = document.querySelector('.navbar-collapse');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            const toggle = document.querySelector('.navbar-toggler');
            toggle.click();
        }
    });
});

// ==========================================
// Scroll Effect for Navbar
// ==========================================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==========================================
// Counter Animation
// ==========================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-card h3');
    
    const observerOptions = {
        threshold: 0.7
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                
                const increment = finalValue / 50;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue + '+';
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(currentValue) + '+';
                    }
                }, 30);
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', animateCounters);

// ==========================================
// Progress Bars Animation
// ==========================================

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observerOptions = {
        threshold: 0.7
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => observer.observe(bar));
}

document.addEventListener('DOMContentLoaded', animateProgressBars);

// ==========================================
// Back to Top Button
// ==========================================

const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'btn-back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    z-index: 1000;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
        backToTopBtn.style.alignItems = 'center';
        backToTopBtn.style.justifyContent = 'center';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopBtn.addEventListener('mouseover', () => {
    backToTopBtn.style.transform = 'translateY(-5px)';
});

backToTopBtn.addEventListener('mouseout', () => {
    backToTopBtn.style.transform = 'translateY(0)';
});

// ==========================================
// Intersection Observer for Lazy Loading
// ==========================================

const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                entry.target.removeAttribute('loading');
                imageObserver.unobserve(entry.target);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==========================================
// Performance Optimization
// ==========================================

// Reduce animation intensity on low-end devices
if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    document.documentElement.style.setProperty('--transition', 'all 0.1s ease');
}

// ==========================================
// Utility Functions
// ==========================================

// Debounce function for scroll events
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// Project Filter (Projects Page)
// ==========================================

if (typeof filterProjects === 'undefined') {
    window.filterProjects = function(category) {
        const items = document.querySelectorAll('.project-item');
        const buttons = document.querySelectorAll('.btn-group .btn');
        
        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = '';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    };
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

console.log('Portfolio loaded successfully! 🚀');
