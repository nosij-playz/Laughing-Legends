
class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.particles = [];
        this.maxParticles = 50;
        this.colors = [
            'particle-type-1',
            'particle-type-2', 
            'particle-type-3',
            'particle-type-4'
        ];
        
        this.init();
    }
    
    init() {
        this.createParticles();
        this.animate();
    }
    
    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = `particle ${this.colors[Math.floor(Math.random() * this.colors.length)]}`;
        
        // Random properties
        const size = Math.random() * 6 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            x: posX,
            y: posY,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: size
        });
    }
    
    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0 || particle.x > 100) particle.vx *= -1;
            if (particle.y < 0 || particle.y > 100) particle.vy *= -1;
            
            // Apply movement
            particle.element.style.left = `${particle.x}%`;
            particle.element.style.top = `${particle.y}%`;
            
            // Add floating effect
            const float = Math.sin(Date.now() * 0.001 + particle.x) * 0.5;
            particle.element.style.transform = `translateY(${float}px)`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    explode(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.createExplosionParticle(x, y);
            }, i * 50);
        }
    }
    
    createExplosionParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = `particle particle-type-${Math.floor(Math.random() * 4) + 1}`;
        
        const size = Math.random() * 8 + 4;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 2;
        const distance = Math.random() * 100 + 50;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.opacity = '1';
        
        this.container.appendChild(particle);
        
        // Animate explosion
        const startTime = Date.now();
        const duration = 1000;
        
        const animateExplosion = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                const currentDistance = distance * progress;
                const currentX = x + Math.cos(angle) * currentDistance;
                const currentY = y + Math.sin(angle) * currentDistance;
                const currentOpacity = 1 - progress;
                
                particle.style.left = `${currentX}%`;
                particle.style.top = `${currentY}%`;
                particle.style.opacity = currentOpacity;
                
                requestAnimationFrame(animateExplosion);
            } else {
                particle.remove();
            }
        };
        
        animateExplosion();
    }
}