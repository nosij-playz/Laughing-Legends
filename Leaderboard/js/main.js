// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all systems
    const textAnimations = new TextAnimations();
    const gameTransitions = new GameTransitions();
    
    // This page is used as an animated background. Disable interactive effects.
    // Keep preloading/logging if needed but avoid adding hover/click handlers.
    preloadAssets();
});

function initInteractiveEffects() {
    // Intentionally left blank to keep background non-interactive.
}

function preloadAssets() {
    // In a real game, you would preload images, sounds, etc.
    console.log('Preloading game assets...');
    
    // Simulate asset loading
    const loadingStates = [
        'Loading character models...',
        'Loading question database...',
        'Initializing game engine...',
        'Preparing legendary journey...'
    ];
    
    let currentState = 0;
    const progressText = document.querySelector('.progress-text');
    
    const loadingInterval = setInterval(() => {
        if (currentState < loadingStates.length) {
            progressText.textContent = loadingStates[currentState];
            currentState++;
        } else {
            clearInterval(loadingInterval);
        }
    }, 800);
}

// Utility functions
function getRandomColor() {
    const colors = ['#667eea', '#f093fb', '#4facfe', '#FFD700', '#f5576c', '#00f2fe'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('div');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = 'ripple-effect';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}
// Ripple and button interactions removed for background usage.
// Guard: if other scripts expect startButton, do not throw errors.
const startBtn = document.getElementById && document.getElementById('startButton');
if (startBtn) {
    // Hide button if present to ensure it's not interactive
    startBtn.style.display = 'none';
}

// Animate to leaderboard page after a short delay
setTimeout(() => {
    document.body.style.transition = 'opacity 1.2s cubic-bezier(.2,.9,.2,1)';
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = 'leaderboard';
    }, 1200);
}, 20000); // 60000 ms = 1 minute

// Dynamic background & glass activation controller
;(function dynamicBackgroundController() {
    const root = document.documentElement;
    const glassLeft = document.getElementById('glassLeft');
    const glassRight = document.getElementById('glassRight');
    const orbs = document.querySelectorAll('.orb');

    function randRGB() {
        return `${Math.floor(Math.random()*180)+40}, ${Math.floor(Math.random()*180)+40}, ${Math.floor(Math.random()*180)+40}`;
    }

    function applyRandomPalette() {
        const a = randRGB();
        const b = randRGB();
        const c = randRGB();
        root.style.setProperty('--rand1', a);
        root.style.setProperty('--rand2', b);
        root.style.setProperty('--rand3', c);

        // animate orb speeds and positions subtly
        orbs.forEach((orb, i) => {
            const dur = 22 + Math.floor(Math.random()*18);
            orb.style.animationDuration = `${dur}s`;
            orb.style.opacity = (0.25 + Math.random()*0.35).toFixed(2);
        });
    }

    // initial apply
    applyRandomPalette();

    // Show/hide glass blocks on a timer
    function showGlassBlocks() {
        if (glassLeft) glassLeft.style.opacity = '0.92';
        if (glassRight) glassRight.style.opacity = '0.92';
    }
    function hideGlassBlocks() {
        if (glassLeft) glassLeft.style.opacity = '0';
        if (glassRight) glassRight.style.opacity = '0';
    }

    // Start with visible, then toggle every few seconds
    showGlassBlocks();
    let visible = true;
    setInterval(() => {
        if (visible) {
            hideGlassBlocks();
        } else {
            showGlassBlocks();
        }
        visible = !visible;
    }, 4000);

    // Still update palette and orb speeds for background
    setInterval(() => {
        applyRandomPalette();
    }, 4500);

})();