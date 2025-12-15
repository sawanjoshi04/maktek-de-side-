// 3D Antigravity Background Animation (Stars)
// NOTE: The 3D Core is now pure CSS in style.css

const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Resize Canvas
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Particle Class
    class Star {
        constructor() {
            this.reset();
            this.y = Math.random() * height;
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;
            this.z = Math.random() * 2 + 0.5;
            this.size = Math.random() * 1.5;
            this.color = Math.random() > 0.8 ? '#00f3ff' : 'rgba(255,255,255,0.3)';
            this.speed = (Math.random() * 0.5 + 0.2) * this.z;
        }

        update() {
            this.y -= this.speed;
            if (this.y < -10) {
                this.reset();
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = Math.min(1, (this.y / 100));
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * this.z, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function initStars() {
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Star());
        }
    }

    function animateStars() {
        ctx.fillStyle = 'rgba(5, 5, 8, 0.2)';
        ctx.fillRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateStars);
    }

    initStars();
    animateStars();
}



// -------------------------------------------------------------------
// Intersection Observer for Cinematic Reveals
// -------------------------------------------------------------------
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom');
    revealElements.forEach(el => observer.observe(el));
});


// -------------------------------------------------------------------
// Mobile Menu & Navbar
// -------------------------------------------------------------------
const menuToggle = document.querySelector('.navbar-toggle');
const navMenu = document.querySelector('.navbar-menu');
const navbar = document.querySelector('.navbar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            Object.assign(navMenu.style, {
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                top: '90px',
                left: '0',
                width: '100vw',
                height: 'calc(100vh - 90px)',
                background: '#050508',
                padding: '40px',
                zIndex: '999'
            });
        } else {
            navMenu.style.display = 'none';
        }
    });
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
