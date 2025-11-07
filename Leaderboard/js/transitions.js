class GameTransitions {
    constructor() {
        this.startButton = document.getElementById ? document.getElementById('startButton') : null;
        this.particleSystem = null;
        this.init();
    }
    
    init() {
        // Only attach interaction if button exists and this module is used interactively
        if (this.startButton) {
            // hide and disable the button for background usage
            try { this.startButton.style.display = 'none'; } catch (e) {}
            // If you want to re-enable click behavior in the future, uncomment below
            // this.startButton.addEventListener('click', () => this.startGame());
        }
        this.initParticleSystem();
    }
    
    initParticleSystem() {
        this.particleSystem = new ParticleSystem('particles');
    }
    
    startGame() {
        // Create explosion effect
        this.particleSystem.explode(50, 50, 20);
        
        // Add visual feedback
        if (this.startButton) {
            try { this.startButton.style.transform = 'scale(0.95)'; } catch (e) {}
        }
        
        // Animate out all elements
        this.animateOutElements();
        
        // Transition to game after animation
        setTimeout(() => {
            this.transitionToGame();
        }, 1500);
    }
    
    animateOutElements() {
        const elements = [
            '.game-title',
            '.acronym-reveal',
            '.characters-preview',
            '.game-description',
            '.progress-indicator'
        ];
        
        elements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                setTimeout(() => {
                    element.style.transition = 'all 0.8s ease-out';
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(-50px)';
                }, index * 100);
            }
        });
        
        // Special animation for start button
        setTimeout(() => {
            if (this.startButton) {
                try {
                    this.startButton.style.transition = 'all 0.8s ease-out';
                    this.startButton.style.opacity = '0';
                    this.startButton.style.transform = 'translateY(50px) scale(0.8)';
                } catch (e) {}
            }
        }, 500);
    }
    
    transitionToGame() {
        // Create full screen explosion
        document.body.style.background = 'radial-gradient(circle, #FFD700 0%, #FFA500 100%)';
        document.body.style.transition = 'background 1s ease-out';
        
        // Add transition message
        const transitionMessage = document.createElement('div');
        transitionMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 3rem;
                font-weight: 900;
                color: #000;
                text-align: center;
                z-index: 1000;
                opacity: 0;
                animation: fadeIn 1s ease-out forwards;
            ">
                LEVEL 1<br>
                <span style="font-size: 1.5rem;">Starting Your Legendary Journey!</span>
            </div>
        `;
        
        document.body.appendChild(transitionMessage);
        
        // In a real game, you would redirect to the actual game
        setTimeout(() => {
            alert("🎮 Game Starting! This would load Level 1 in the full version.");
            // window.location.href = "game-level1.html";
        }, 3000);
    }
}