class TextAnimations {
    constructor() {
        this.letters = document.querySelectorAll('.letter');
        this.acronymLines = document.querySelectorAll('.acronym-line');
        this.init();
    }
    
    init() {
        this.animateTitle();
        setTimeout(() => this.animateAcronym(), 1500);
        setTimeout(() => this.animateCharacters(), 3000);
        setTimeout(() => this.animateDescription(), 4500);
        setTimeout(() => this.animateProgress(), 5000);
        // Skip animateButton for background-only use; keep in place but guarded
        setTimeout(() => this.animateButton(), 6000);
    }
    
    animateTitle() {
        this.letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.animation = 'letterPopIn 0.6s ease-out forwards';
                letter.style.color = this.getLetterColor(letter.dataset.letter);
            }, index * 100);
        });
    }
    
    getLetterColor(letter) {
        const colors = {
            'L': '#667eea',
            'A': '#f093fb',
            'U': '#4facfe',
            'G': '#FFD700',
            'H': '#f5576c',
            'I': '#00f2fe',
            'N': '#667eea',
            'E': '#f093fb',
            'D': '#4facfe',
            'S': '#FFD700'
        };
        return colors[letter] || '#ffffff';
    }
    
    animateAcronym() {
        const acronymReveal = document.getElementById('acronymReveal');
        acronymReveal.style.opacity = '1';
        
        this.acronymLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.animation = 'acronymSlideIn 0.8s ease-out forwards';
            }, index * 200);
        });
    }
    
    animateCharacters() {
        const charactersPreview = document.querySelector('.characters-preview');
        charactersPreview.style.opacity = '1';
        
        const characters = document.querySelectorAll('.character-card');
        characters.forEach((character, index) => {
            setTimeout(() => {
                character.style.animation = `characterFloat 3s ease-in-out infinite ${index * 0.2}s`;
            }, index * 150);
        });
    }
    
    animateDescription() {
        const description = document.getElementById('gameDescription');
        description.style.animation = 'fadeInUp 1s ease-out forwards';
    }
    
    animateProgress() {
        const progressIndicator = document.querySelector('.progress-indicator');
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        progressIndicator.style.animation = 'fadeInUp 1s ease-out forwards';
        
        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                progressText.textContent = 'Ready to Play!';
            }
            progressFill.style.width = `${progress}%`;
        }, 200);
    }
    
    animateButton() {
        const button = document.getElementById ? document.getElementById('startButton') : null;
        if (!button) return; // nothing to do for background

        // hide the button visually for background usage
        try { button.style.display = 'none'; } catch (e) {}
        
        // If interactive mode is needed, the code below can be re-enabled
        // button.style.animation = 'fadeInUp 0.8s ease-out forwards';
        // this.addButtonSparkles(button);
    }
    
    addButtonSparkles(button) {
        for (let i = 0; i < 3; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = `button-sparkle sparkle-${i + 1}`;
            button.appendChild(sparkle);
        }
    }
}