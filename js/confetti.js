// Confetti animation
class Confetti {
    constructor() {
        this.container = document.getElementById('confetti-container');
        this.confettiColors = ['#f8c8dc', '#e5b5b5', '#ffffff', '#d4af37', '#f9d5e5'];
        this.confettiCount = 100;
        this.confettiElements = [];
        
        this.init();
    }
    
    init() {
        // Create confetti elements
        for (let i = 0; i < this.confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.position = 'absolute';
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 6 + 3}px`;
            confetti.style.background = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
            confetti.style.opacity = Math.random();
            confetti.style.borderRadius = `${Math.random() > 0.5 ? '50%' : '0'}`;
            confetti.style.top = '-10px';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            this.container.appendChild(confetti);
            this.confettiElements.push({
                element: confetti,
                x: parseFloat(confetti.style.left),
                y: parseFloat(confetti.style.top) || -10,
                rotation: Math.random() * 360,
                speed: Math.random() * 2 + 1,
                rotationSpeed: Math.random() * 2 - 1,
                oscillationSpeed: Math.random() * 2 + 1,
                oscillationDistance: Math.random() * 40 + 20,
                isFluttering: Math.random() > 0.5
            });
        }
        
        // Start animation
        this.animateConfetti();
    }
    
    animateConfetti() {
        const containerHeight = this.container.offsetHeight;
        const containerWidth = this.container.offsetWidth;
        
        const animate = () => {
            this.confettiElements.forEach((confetti, index) => {
                confetti.y += confetti.speed;
                confetti.rotation += confetti.rotationSpeed;
                
                if (confetti.isFluttering) {
                    confetti.x += Math.sin(confetti.y * 0.01) * confetti.oscillationDistance / 100;
                }
                
                // Update position and rotation
                confetti.element.style.top = `${confetti.y}px`;
                confetti.element.style.left = `${confetti.x}%`;
                confetti.element.style.transform = `rotate(${confetti.rotation}deg)`;
                
                // Remove confetti when it's out of view and create a new one
                if (confetti.y > containerHeight) {
                    confetti.y = -10;
                    confetti.x = Math.random() * 100;
                    confetti.speed = Math.random() * 2 + 1;
                }
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Create confetti when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new Confetti();
    }, 1000); // Delay start by 1 second
});
