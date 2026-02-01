// smooth scroll navigation
document.addEventListener('DOMContentLoaded', () => {
    // smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature-card, .tech-item, .workflow-step, .platform-card, .version-entry, .requirement-card, .install-step'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // observe section headings
    const headings = document.querySelectorAll('section h2, .intro');
    headings.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// animated gradient background
class GradientBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.gradients = [];
        this.animationId = null;
        this.init();
    }

    init() {
        // create canvas for background
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'gradient-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';

        document.body.insertBefore(this.canvas, document.body.firstChild);
        this.ctx = this.canvas.getContext('2d');

        this.resize();
        this.createGradients();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createGradients() {
        const colors = [
            { r: 14, g: 165, b: 233, a: 0.15 },  // primary blue
            { r: 34, g: 211, b: 238, a: 0.15 },  // secondary cyan
            { r: 59, g: 130, b: 246, a: 0.15 },  // accent blue
            { r: 6, g: 182, b: 212, a: 0.15 }    // cyan
        ];

        for (let i = 0; i < 4; i++) {
            this.gradients.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 300 + 200,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                color: colors[i]
            });
        }
    }

    animate() {
        this.ctx.fillStyle = '#0a0f1c';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.gradients.forEach(gradient => {
            // update position
            gradient.x += gradient.vx;
            gradient.y += gradient.vy;

            // bounce off edges
            if (gradient.x < 0 || gradient.x > this.canvas.width) {
                gradient.vx *= -1;
            }
            if (gradient.y < 0 || gradient.y > this.canvas.height) {
                gradient.vy *= -1;
            }

            // draw gradient
            const radialGradient = this.ctx.createRadialGradient(
                gradient.x, gradient.y, 0,
                gradient.x, gradient.y, gradient.radius
            );

            const { r, g, b, a } = gradient.color;
            radialGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`);
            radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            this.ctx.fillStyle = radialGradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// initialize gradient background
let gradientBg = null;
if (document.body.classList.contains('has-gradient-bg') || !document.body.className) {
    gradientBg = new GradientBackground();
}

// navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// cell animation for hero section
class CellAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.cells = [];
        this.connections = [];
        this.animationId = null;
        this.mouse = { x: null, y: null };

        this.init();
    }

    init() {
        this.resize();
        this.createCells();
        this.animate();

        window.addEventListener('resize', () => this.resize());

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;

        if (this.cells.length > 0) {
            this.createCells();
        }
    }

    createCells() {
        this.cells = [];
        const cellCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);

        // blue theme colors for cells
        const colors = [
            { r: 14, g: 165, b: 233 },  // primary blue
            { r: 34, g: 211, b: 238 },  // secondary cyan
            { r: 59, g: 130, b: 246 },  // accent blue
            { r: 6, g: 182, b: 212 },   // cyan
            { r: 96, g: 165, b: 250 },  // light blue
            { r: 56, g: 189, b: 248 }   // sky blue
        ];

        for (let i = 0; i < cellCount; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            this.cells.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 4 + 2,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                color: color,
                pulsePhase: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }

    drawCell(cell) {
        // pulsing effect
        const pulse = Math.sin(cell.pulsePhase) * 0.3 + 1;
        const currentRadius = cell.radius * pulse;

        // extended outer glow for blending
        const outerGradient = this.ctx.createRadialGradient(
            cell.x, cell.y, 0,
            cell.x, cell.y, currentRadius * 5
        );
        outerGradient.addColorStop(0, `rgba(${cell.color.r}, ${cell.color.g}, ${cell.color.b}, 0.15)`);
        outerGradient.addColorStop(0.3, `rgba(${cell.color.r}, ${cell.color.g}, ${cell.color.b}, 0.08)`);
        outerGradient.addColorStop(0.6, `rgba(${cell.color.r}, ${cell.color.g}, ${cell.color.b}, 0.03)`);
        outerGradient.addColorStop(1, `rgba(${cell.color.r}, ${cell.color.g}, ${cell.color.b}, 0)`);

        this.ctx.fillStyle = outerGradient;
        this.ctx.beginPath();
        this.ctx.arc(cell.x, cell.y, currentRadius * 5, 0, Math.PI * 2);
        this.ctx.fill();

        // inner cell
        const innerGradient = this.ctx.createRadialGradient(
            cell.x, cell.y, 0,
            cell.x, cell.y, currentRadius
        );
        innerGradient.addColorStop(0, `rgba(${cell.color.r}, ${cell.color.g}, ${cell.color.b}, 0.5)`);
        innerGradient.addColorStop(1, `rgba(${cell.color.r}, ${cell.color.g}, ${cell.color.b}, 0.2)`);

        this.ctx.fillStyle = innerGradient;
        this.ctx.beginPath();
        this.ctx.arc(cell.x, cell.y, currentRadius, 0, Math.PI * 2);
        this.ctx.fill();

        cell.pulsePhase += cell.pulseSpeed;
    }

    drawConnections() {
        const maxDistance = 150;

        for (let i = 0; i < this.cells.length; i++) {
            for (let j = i + 1; j < this.cells.length; j++) {
                const dx = this.cells[i].x - this.cells[j].x;
                const dy = this.cells[i].y - this.cells[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.12;

                    this.ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
                    this.ctx.lineWidth = 0.6;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.cells[i].x, this.cells[i].y);
                    this.ctx.lineTo(this.cells[j].x, this.cells[j].y);
                    this.ctx.stroke();
                }
            }
        }

        // mouse interaction
        if (this.mouse.x !== null && this.mouse.y !== null) {
            this.cells.forEach(cell => {
                const dx = cell.x - this.mouse.x;
                const dy = cell.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.3;
                    this.ctx.strokeStyle = `rgba(14, 165, 233, ${opacity})`;
                    this.ctx.lineWidth = 1.2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.mouse.x, this.mouse.y);
                    this.ctx.lineTo(cell.x, cell.y);
                    this.ctx.stroke();
                }
            });
        }
    }

    updateCells() {
        this.cells.forEach(cell => {
            cell.x += cell.vx;
            cell.y += cell.vy;

            // bounce off edges
            if (cell.x < 0 || cell.x > this.canvas.width) {
                cell.vx *= -1;
                cell.x = Math.max(0, Math.min(this.canvas.width, cell.x));
            }
            if (cell.y < 0 || cell.y > this.canvas.height) {
                cell.vy *= -1;
                cell.y = Math.max(0, Math.min(this.canvas.height, cell.y));
            }
        });
    }

    animate() {
        // semi-transparent background for trail effect
        this.ctx.fillStyle = 'rgba(10, 15, 28, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawConnections();
        this.cells.forEach(cell => this.drawCell(cell));
        this.updateCells();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// initialize cell animation if canvas exists
document.addEventListener('DOMContentLoaded', () => {
    const cellCanvas = document.getElementById('cell-animation');
    if (cellCanvas) {
        new CellAnimation('cell-animation');
    }
});
