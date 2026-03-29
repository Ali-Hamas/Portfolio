/* ========================================
   MAIN.JS - Consolidated Portfolio Logic
   ======================================== */

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const hero = document.querySelector('.hero');
    
    if (preloader) preloader.style.display = 'none';
    if (hero) hero.classList.add('reveal');
});

// Magnetic Buttons
const initMagneticButtons = () => {
    const buttons = document.querySelectorAll('.magnetic');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            const content = btn.querySelector('span');
            if (content) {
                content.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            }
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            const content = btn.querySelector('span');
            if (content) {
                content.style.transform = 'translate(0, 0)';
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initParticles();
    initInteractions();
    initScrollEffects();
    initTypingEffect();
    init3DEffects();
    initMagneticButtons();
    
    // Log welcome message
    console.log('%c👋 Welcome to Ali\'s Portfolio!', 'color: #2563eb; font-size: 18px; font-weight: bold;');
    console.log('%cAI Agent Developer | Building the future with intelligent systems', 'color: #94a3b8; font-size: 14px;');
});

// ---- Utility: Throttling function for performance ----
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ---- Particle Animation ----
let particles = [];
let canvas, ctx;

function initParticles() {
    canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createParticles();
    animateParticles();

    window.addEventListener('resize', throttle(() => {
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Reposition particles relatively instead of recreating
        particles.forEach(p => {
            p.x = (p.x / oldWidth) * canvas.width;
            p.y = (p.y / oldHeight) * canvas.height;
        });
    }, 200));
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3; // Smaller particles
        this.speedX = (Math.random() * 0.4 - 0.2); // Slower
        this.speedY = (Math.random() * 0.4 - 0.2); // Slower
        this.opacity = Math.random() * 0.3 + 0.1; // More subtle
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    particles = [];
    const numberOfParticles = (canvas.width * canvas.height) / 25000; // Less dense
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    connectParticles();
    requestAnimationFrame(animateParticles);
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) { // Shorter connections
                ctx.strokeStyle = `rgba(37, 99, 235, ${0.12 - distance / 1000})`;
                ctx.lineWidth = 0.4;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// ---- General Interactions ----
function initInteractions() {
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Cursor Glow & Mouse Trail
    initCursorEffects();
}

function initCursorEffects() {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow-effect';
    cursorGlow.style.cssText = `
        position: fixed; width: 400px; height: 400px; border-radius: 50%;
        background: radial-gradient(circle, var(--accent-glow), transparent 70%);
        pointer-events: none; z-index: 9999; transform: translate(-50%, -50%);
        transition: opacity 0.3s ease; opacity: 0;
    `;
    document.body.appendChild(cursorGlow);

    // Mouse Trail
    const trail = [];
    const trailLength = 6;
    if (!window.matchMedia('(max-width: 768px)').matches) {
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'trail-particle';
            dot.style.cssText = `
                position: fixed; width: ${6 - i}px; height: ${6 - i}px; border-radius: 50%;
                background: var(--primary-gradient); pointer-events: none;
                z-index: 9999; opacity: ${0.4 - i * 0.05}; transition: transform 0.1s ease;
                transform: translate(-50%, -50%);
            `;
            document.body.appendChild(dot);
            trail.push({ element: dot, x: 0, y: 0 });
        }
    }

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    function animateTrail() {
        let x = mouseX, y = mouseY;
        trail.forEach((dot, index) => {
            dot.x += (x - dot.x) * 0.3;
            dot.y += (y - dot.y) * 0.3;
            dot.element.style.left = dot.x + 'px';
            dot.element.style.top = dot.y + 'px';
            x = dot.x; y = dot.y;
        });
        requestAnimationFrame(animateTrail);
    }
    if (trail.length) animateTrail();
}

// ---- Scroll Related Effects ----
function initScrollEffects() {
    // Scroll Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // Active Nav Highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const blobs = document.querySelectorAll('.blob');

    window.addEventListener('scroll', throttle(() => {
        const scrollY = window.scrollY;
        
        // Progress Bar
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.transform = `scaleX(${scrollY / docHeight})`;

        // Parallax Blobs
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.05;
            blob.style.transform = `translateY(${scrollY * speed}px)`;
        });

        // Active Link
        let current = '';
        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }, 50));

    // Intersection Observer for Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.about-card, .bento-card, .contact-card, .skill-item, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Reset scroll restoration
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
}

// ---- Typing Effect ----
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const phrases = [
        "AI Agent Developer",
        "Neural Workflow Architect",
        "Autonomous System Engineer",
        "LLM Integration Specialist"
    ];

    heroTitle.textContent = '';

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            heroTitle.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            heroTitle.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);
}

// ---- 3D Tilt Effects ----
function init3DEffects() {
    // Hero Card Tilt
    const heroCardContainer = document.querySelector('.hero-card-container');
    if (heroCardContainer) {
        heroCardContainer.addEventListener('mousemove', (e) => {
            const rect = heroCardContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (y - rect.height / 2) / 10;
            const rotateY = (rect.width / 2 - x) / 10;
            heroCardContainer.querySelector('.hero-card').style.transform = 
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        heroCardContainer.addEventListener('mouseleave', () => {
            heroCardContainer.querySelector('.hero-card').style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }

    // Bento Card Tilt
    document.querySelectorAll('.bento-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (y - rect.height / 2) / 15;
            const rotateY = (rect.width / 2 - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.02)`;
            card.style.background = `radial-gradient(circle at ${(x/rect.width)*100}% ${(y/rect.height)*100}%, var(--accent-glow) 0%, rgba(255, 255, 255, 0.03) 50%)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.background = '';
        });
    });
}
