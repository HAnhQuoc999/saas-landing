// ===================================
// MAIN JAVASCRIPT
// ===================================

‘use strict’;

// ===================================
// LOADING SCREEN
// ===================================
window.addEventListener(‘load’, () => {
const loadingScreen = document.getElementById(‘loading-screen’);
setTimeout(() => {
loadingScreen.classList.add(‘hidden’);
}, 800);
});

// ===================================
// SCROLL PROGRESS BAR
// ===================================
function updateScrollProgress() {
const scrollProgress = document.getElementById(‘scroll-progress’);
const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
const scrolled = (window.scrollY / windowHeight) * 100;
scrollProgress.style.width = scrolled + ‘%’;
}

window.addEventListener(‘scroll’, updateScrollProgress);

// ===================================
// NAVBAR SCROLL BEHAVIOR
// ===================================
const navbar = document.getElementById(‘navbar’);
let lastScrollY = window.scrollY;

window.addEventListener(‘scroll’, () => {
const currentScrollY = window.scrollY;

```
if (currentScrollY > 100) {
    navbar.classList.add('scrolled');
} else {
    navbar.classList.remove('scrolled');
}

lastScrollY = currentScrollY;
```

});

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================
const sections = document.querySelectorAll(‘section[id]’);
const navLinks = document.querySelectorAll(’.nav-link’);

function updateActiveNavLink() {
const scrollY = window.scrollY;

```
sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
});
```

}

window.addEventListener(‘scroll’, updateActiveNavLink);

// ===================================
// SMOOTH SCROLL FOR NAV LINKS
// ===================================
document.querySelectorAll(‘a[href^=”#”]’).forEach(anchor => {
anchor.addEventListener(‘click’, function(e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute(‘href’));

```
    if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }
});
```

});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const mobileMenuToggle = document.getElementById(‘mobile-menu-toggle’);
const mobileMenu = document.getElementById(‘mobile-menu’);

mobileMenuToggle.addEventListener(‘click’, () => {
mobileMenuToggle.classList.toggle(‘active’);
mobileMenu.classList.toggle(‘active’);

```
// Prevent body scroll when menu is open
if (mobileMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
} else {
    document.body.style.overflow = '';
}
```

});

// Close mobile menu when clicking outside
document.addEventListener(‘click’, (e) => {
if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
if (mobileMenu.classList.contains(‘active’)) {
mobileMenu.classList.remove(‘active’);
mobileMenuToggle.classList.remove(‘active’);
document.body.style.overflow = ‘’;
}
}
});

// ===================================
// THEME TOGGLE (DARK/LIGHT MODE)
// ===================================
const themeToggle = document.getElementById(‘theme-toggle’);
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem(‘theme’) || ‘dark’;
body.classList.toggle(‘dark-mode’, currentTheme === ‘dark’);

themeToggle.addEventListener(‘click’, () => {
body.classList.toggle(‘dark-mode’);

```
// Save theme preference
const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
localStorage.setItem('theme', theme);

// Add ripple effect
createRipple(themeToggle, event);
```

});

// ===================================
// RIPPLE EFFECT FOR BUTTONS
// ===================================
function createRipple(button, event) {
const ripple = document.createElement(‘span’);
const rect = button.getBoundingClientRect();
const size = Math.max(rect.width, rect.height);
const x = event.clientX - rect.left - size / 2;
const y = event.clientY - rect.top - size / 2;

```
ripple.style.width = ripple.style.height = size + 'px';
ripple.style.left = x + 'px';
ripple.style.top = y + 'px';
ripple.classList.add('ripple');

button.appendChild(ripple);

setTimeout(() => {
    ripple.remove();
}, 600);
```

}

document.querySelectorAll(’.btn’).forEach(button => {
button.addEventListener(‘click’, function(e) {
if (!this.querySelector(’.ripple’)) {
createRipple(this, e);
}
});
});

// ===================================
// TESTIMONIALS CAROUSEL
// ===================================
const testimonialTrack = document.getElementById(‘testimonial-track’);
const prevBtn = document.getElementById(‘prev-btn’);
const nextBtn = document.getElementById(‘next-btn’);
const testimonialCards = document.querySelectorAll(’.testimonial-card’);

let currentTestimonialIndex = 0;
const maxTestimonialIndex = testimonialCards.length - 2; // Show 2 cards at a time

function updateCarousel() {
const cardWidth = testimonialCards[0].offsetWidth;
const gap = 32; // 2rem gap
const offset = currentTestimonialIndex * (cardWidth + gap);
testimonialTrack.style.transform = `translateX(-${offset}px)`;
}

nextBtn.addEventListener(‘click’, () => {
if (currentTestimonialIndex < maxTestimonialIndex) {
currentTestimonialIndex++;
updateCarousel();
}
});

prevBtn.addEventListener(‘click’, () => {
if (currentTestimonialIndex > 0) {
currentTestimonialIndex–;
updateCarousel();
}
});

// Auto-slide carousel
let autoSlideInterval = setInterval(() => {
if (currentTestimonialIndex < maxTestimonialIndex) {
currentTestimonialIndex++;
} else {
currentTestimonialIndex = 0;
}
updateCarousel();
}, 5000);

// Pause auto-slide on hover
const testimonialCarousel = document.querySelector(’.testimonials-carousel’);
testimonialCarousel.addEventListener(‘mouseenter’, () => {
clearInterval(autoSlideInterval);
});

testimonialCarousel.addEventListener(‘mouseleave’, () => {
autoSlideInterval = setInterval(() => {
if (currentTestimonialIndex < maxTestimonialIndex) {
currentTestimonialIndex++;
} else {
currentTestimonialIndex = 0;
}
updateCarousel();
}, 5000);
});

// Update carousel on window resize
window.addEventListener(‘resize’, () => {
updateCarousel();
});

// ===================================
// CONTACT FORM VALIDATION & SUBMISSION
// ===================================
const contactForm = document.getElementById(‘contact-form’);
const successMessage = document.getElementById(‘success-message’);

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

// Form validation functions
function validateName(name) {
return name.trim().length >= 2;
}

function validateEmail(email) {
return emailRegex.test(email);
}

function validateMessage(message) {
return message.trim().length >= 10;
}

// Show error message
function showError(inputId, message) {
const errorElement = document.getElementById(`${inputId}-error`);
const inputElement = document.getElementById(inputId);

```
errorElement.textContent = message;
inputElement.style.borderColor = 'var(--error)';
```

}

// Clear error message
function clearError(inputId) {
const errorElement = document.getElementById(`${inputId}-error`);
const inputElement = document.getElementById(inputId);

```
errorElement.textContent = '';
inputElement.style.borderColor = 'var(--border-color)';
```

}

// Real-time validation
document.getElementById(‘name’).addEventListener(‘input’, function() {
if (this.value.length > 0) {
if (validateName(this.value)) {
clearError(‘name’);
} else {
showError(‘name’, ‘Tên phải có ít nhất 2 ký tự’);
}
} else {
clearError(‘name’);
}
});

document.getElementById(‘email’).addEventListener(‘input’, function() {
if (this.value.length > 0) {
if (validateEmail(this.value)) {
clearError(‘email’);
} else {
showError(‘email’, ‘Email không hợp lệ’);
}
} else {
clearError(‘email’);
}
});

document.getElementById(‘message’).addEventListener(‘input’, function() {
if (this.value.length > 0) {
if (validateMessage(this.value)) {
clearError(‘message’);
} else {
showError(‘message’, ‘Nội dung phải có ít nhất 10 ký tự’);
}
} else {
clearError(‘message’);
}
});

// Form submission
contactForm.addEventListener(‘submit’, function(e) {
e.preventDefault();

```
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const phone = document.getElementById('phone').value;
const message = document.getElementById('message').value;

let isValid = true;

// Validate all fields
if (!validateName(name)) {
    showError('name', 'Vui lòng nhập họ tên hợp lệ (ít nhất 2 ký tự)');
    isValid = false;
}

if (!validateEmail(email)) {
    showError('email', 'Vui lòng nhập email hợp lệ');
    isValid = false;
}

if (!validateMessage(message)) {
    showError('message', 'Vui lòng nhập nội dung (ít nhất 10 ký tự)');
    isValid = false;
}

// If form is valid, show success message
if (isValid) {
    // In a real application, you would send the data to a server here
    console.log('Form submitted:', { name, email, phone, message });
    
    // Show success message
    contactForm.style.display = 'none';
    successMessage.classList.add('show');
    
    // Reset form
    contactForm.reset();
}
```

});

// Reset form function
function resetForm() {
contactForm.style.display = ‘block’;
successMessage.classList.remove(‘show’);
}

// Make resetForm globally accessible
window.resetForm = resetForm;

// ===================================
// BACK TO TOP BUTTON
// ===================================
const backToTopBtn = document.getElementById(‘back-to-top’);

window.addEventListener(‘scroll’, () => {
if (window.scrollY > 300) {
backToTopBtn.classList.add(‘show’);
} else {
backToTopBtn.classList.remove(‘show’);
}
});

backToTopBtn.addEventListener(‘click’, () => {
window.scrollTo({
top: 0,
behavior: ‘smooth’
});
});

// ===================================
// LAZY LOADING IMAGES (if any)
// ===================================
if (‘IntersectionObserver’ in window) {
const imageObserver = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const img = entry.target;
img.src = img.dataset.src;
img.classList.add(‘loaded’);
observer.unobserve(img);
}
});
});

```
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});
```

}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll and resize events
function debounce(func, wait) {
let timeout;
return function executedFunction(…args) {
const later = () => {
clearTimeout(timeout);
func(…args);
};
clearTimeout(timeout);
timeout = setTimeout(later, wait);
};
}

// Apply debounce to resize events
window.addEventListener(‘resize’, debounce(() => {
updateCarousel();
}, 250));

// ===================================
// KEYBOARD NAVIGATION
// ===================================
document.addEventListener(‘keydown’, (e) => {
// ESC key to close mobile menu
if (e.key === ‘Escape’) {
if (mobileMenu.classList.contains(‘active’)) {
mobileMenu.classList.remove(‘active’);
mobileMenuToggle.classList.remove(‘active’);
document.body.style.overflow = ‘’;
}
}
});

// ===================================
// ACCESSIBILITY IMPROVEMENTS
// ===================================

// Add focus visible for keyboard navigation
document.addEventListener(‘keydown’, (e) => {
if (e.key === ‘Tab’) {
document.body.classList.add(‘keyboard-nav’);
}
});

document.addEventListener(‘mousedown’, () => {
document.body.classList.remove(‘keyboard-nav’);
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log(’%c🚀 TechFlow - Built with ❤️’, ‘color: #4F46E5; font-size: 16px; font-weight: bold;’);
console.log(’%cWebsite Performance Optimized’, ‘color: #06B6D4; font-size: 12px;’);

// ===================================
// ANALYTICS PLACEHOLDER
// ===================================
// Add your analytics code here (Google Analytics, etc.)
// Example:
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag(‘js’, new Date());
// gtag(‘config’, ‘GA_MEASUREMENT_ID’);
