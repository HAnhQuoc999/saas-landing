// ===================================
// ADVANCED ANIMATIONS
// ===================================

‘use strict’;

// ===================================
// INITIALIZE AOS (Animate On Scroll)
// ===================================
document.addEventListener(‘DOMContentLoaded’, () => {
AOS.init({
duration: 800,
easing: ‘ease-out-cubic’,
once: true,
offset: 50,
delay: 0,
});
});

// ===================================
// PARALLAX EFFECT FOR HERO BACKGROUND
// ===================================
const heroBackground = document.querySelector(’.hero-background’);

if (heroBackground) {
window.addEventListener(‘scroll’, () => {
const scrolled = window.scrollY;
const parallaxSpeed = 0.5;
heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
});
}

// ===================================
// GRADIENT ORBS ANIMATION
// ===================================
const orbs = document.querySelectorAll(’.gradient-orb’);

orbs.forEach((orb, index) => {
const randomX = Math.random() * 100 - 50;
const randomY = Math.random() * 100 - 50;
const duration = 15 + Math.random() * 10;

```
orb.style.animation = `float ${duration}s infinite ease-in-out`;
orb.style.animationDelay = `${index * -5}s`;
```

});

// ===================================
// NUMBERS COUNTER ANIMATION
// ===================================
const counters = document.querySelectorAll(’.stat-item h3’);
const counterObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const counter = entry.target;
const target = counter.textContent;

```
        // Check if it's a number
        if (target.match(/\d+/)) {
            const finalNumber = parseInt(target.match(/\d+/)[0]);
            const suffix = target.replace(/\d+/g, '');
            let current = 0;
            const increment = finalNumber / 50;
            const duration = 2000;
            const stepTime = duration / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalNumber) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, stepTime);
        }
        
        counterObserver.unobserve(counter);
    }
});
```

}, { threshold: 0.5 });

counters.forEach(counter => {
counterObserver.observe(counter);
});

// ===================================
// STAGGERED ANIMATION FOR FEATURE CARDS
// ===================================
const featureCards = document.querySelectorAll(’.feature-card’);

const staggerObserver = new IntersectionObserver((entries) => {
entries.forEach((entry, index) => {
if (entry.isIntersecting) {
setTimeout(() => {
entry.target.style.opacity = ‘1’;
entry.target.style.transform = ‘translateY(0)’;
}, index * 100);
staggerObserver.unobserve(entry.target);
}
});
}, { threshold: 0.1 });

featureCards.forEach(card => {
card.style.opacity = ‘0’;
card.style.transform = ‘translateY(30px)’;
card.style.transition = ‘opacity 0.6s ease-out, transform 0.6s ease-out’;
staggerObserver.observe(card);
});

// ===================================
// MOCKUP WINDOW ANIMATION
// ===================================
const mockupWindow = document.querySelector(’.mockup-window’);

if (mockupWindow) {
const mockupObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
mockupWindow.style.opacity = ‘1’;
mockupWindow.style.transform = ‘perspective(1000px) rotateY(0deg)’;
mockupObserver.unobserve(mockupWindow);
}
});
}, { threshold: 0.3 });

```
mockupWindow.style.opacity = '0';
mockupWindow.style.transform = 'perspective(1000px) rotateY(-15deg)';
mockupWindow.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
mockupObserver.observe(mockupWindow);
```

}

// ===================================
// CHART ANIMATION
// ===================================
const chartSvg = document.querySelector(’.chart-svg polyline’);

if (chartSvg) {
const chartObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const length = chartSvg.getTotalLength();
chartSvg.style.strokeDasharray = length;
chartSvg.style.strokeDashoffset = length;
chartSvg.style.animation = ‘drawChart 2s ease-out forwards’;
chartObserver.unobserve(chartSvg);
}
});
}, { threshold: 0.5 });

```
chartObserver.observe(chartSvg);
```

}

// Add keyframes for chart animation
const style = document.createElement(‘style’);
style.textContent = `@keyframes drawChart { to { stroke-dashoffset: 0; } }`;
document.head.appendChild(style);

// ===================================
// FLOATING CARDS ANIMATION
// ===================================
const floatingCards = document.querySelectorAll(’.floating-card’);

floatingCards.forEach((card, index) => {
const floatObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
setTimeout(() => {
card.style.opacity = ‘1’;
card.style.transform = ‘translateY(0) scale(1)’;
}, index * 200);
floatObserver.unobserve(card);
}
});
}, { threshold: 0.5 });

```
card.style.opacity = '0';
card.style.transform = 'translateY(30px) scale(0.8)';
card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
floatObserver.observe(card);
```

});

// ===================================
// PRICING CARDS HOVER EFFECT
// ===================================
const pricingCards = document.querySelectorAll(’.pricing-card’);

pricingCards.forEach(card => {
card.addEventListener(‘mousemove’, (e) => {
const rect = card.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

```
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
});

card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
});
```

});

// ===================================
// TESTIMONIAL CARDS FADE IN
// ===================================
const testimonialCards = document.querySelectorAll(’.testimonial-card’);

const testimonialObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = ‘1’;
entry.target.style.transform = ‘translateX(0)’;
testimonialObserver.unobserve(entry.target);
}
});
}, { threshold: 0.1 });

testimonialCards.forEach(card => {
card.style.opacity = ‘0’;
card.style.transform = ‘translateX(50px)’;
card.style.transition = ‘opacity 0.6s ease-out, transform 0.6s ease-out’;
testimonialObserver.observe(card);
});

// ===================================
// FORM INPUTS FOCUS ANIMATION
// ===================================
const formInputs = document.querySelectorAll(’.form-group input, .form-group textarea’);

formInputs.forEach(input => {
input.addEventListener(‘focus’, function() {
this.parentElement.classList.add(‘focused’);
});

```
input.addEventListener('blur', function() {
    if (!this.value) {
        this.parentElement.classList.remove('focused');
    }
});

// Check if input has value on load
if (input.value) {
    input.parentElement.classList.add('focused');
}
```

});

// ===================================
// BUTTON HOVER GLOW EFFECT
// ===================================
const primaryButtons = document.querySelectorAll(’.btn-primary’);

primaryButtons.forEach(button => {
button.addEventListener(‘mousemove’, (e) => {
const rect = button.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

```
    button.style.setProperty('--x', x + 'px');
    button.style.setProperty('--y', y + 'px');
});
```

});

// Add glow effect CSS
const glowStyle = document.createElement(‘style’);
glowStyle.textContent = `
.btn-primary {
position: relative;
overflow: hidden;
}

```
.btn-primary::after {
    content: '';
    position: absolute;
    top: var(--y, 50%);
    left: var(--x, 50%);
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
    pointer-events: none;
}

.btn-primary:hover::after {
    width: 300px;
    height: 300px;
}
```

`;
document.head.appendChild(glowStyle);

// ===================================
// SCROLL-TRIGGERED SECTION ANIMATIONS
// ===================================
const sections = document.querySelectorAll(‘section’);

const sectionObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add(‘section-visible’);
}
});
}, { threshold: 0.15 });

sections.forEach(section => {
sectionObserver.observe(section);
});

// Add section animation CSS
const sectionStyle = document.createElement(‘style’);
sectionStyle.textContent = `
section {
opacity: 0;
transform: translateY(30px);
transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

```
section.section-visible {
    opacity: 1;
    transform: translateY(0);
}

/* Keep hero always visible */
.hero {
    opacity: 1;
    transform: translateY(0);
}
```

`;
document.head.appendChild(sectionStyle);

// ===================================
// MOUSE TRAIL EFFECT (Optional)
// ===================================
let mouseTrailEnabled = false; // Set to true to enable

if (mouseTrailEnabled) {
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(’.circle’);

```
circles.forEach((circle, index) => {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    
    circles.forEach((circle, index) => {
        circle.style.left = x - 12 + 'px';
        circle.style.top = y - 12 + 'px';
        circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
        
        circle.x = x;
        circle.y = y;
        
        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });
    
    requestAnimationFrame(animateCircles);
}

if (circles.length > 0) {
    animateCircles();
}
```

}

// ===================================
// TEXT TYPING EFFECT (Optional)
// ===================================
function typeWriter(element, text, speed = 50) {
let i = 0;
element.textContent = ‘’;

```
function type() {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
    }
}

type();
```

}

// Example usage (uncomment to enable):
// const heroTitle = document.querySelector(’.hero-title’);
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 30);
// }

// ===================================
// SMOOTH REVEAL ON SCROLL
// ===================================
const revealElements = document.querySelectorAll(’[data-reveal]’);

const revealObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add(‘revealed’);
revealObserver.unobserve(entry.target);
}
});
}, { threshold: 0.15 });

revealElements.forEach(element => {
revealObserver.observe(element);
});

// ===================================
// PERFORMANCE MONITORING
// ===================================
if (window.performance && window.performance.timing) {
window.addEventListener(‘load’, () => {
setTimeout(() => {
const perfData = window.performance.timing;
const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
console.log(`⚡ Page Load Time: ${pageLoadTime}ms`);
}, 0);
});
}

// ===================================
// REDUCE MOTION FOR ACCESSIBILITY
// ===================================
const prefersReducedMotion = window.matchMedia(’(prefers-reduced-motion: reduce)’);

if (prefersReducedMotion.matches) {
// Disable animations for users who prefer reduced motion
document.querySelectorAll(’*’).forEach(element => {
element.style.animation = ‘none’;
element.style.transition = ‘none’;
});

```
console.log('♿ Reduced motion enabled for accessibility');
```

}

console.log(‘✨ Animations initialized successfully’);
