// Global variables
let currentPage = 'home';
let musicPlaying = false;
let confettiAnimation = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setCurrentDate();
});

// Initialize the application
function initializeApp() {
    // Set initial page
    showPage('home');
    
    // Initialize confetti canvas
    initializeConfetti();
}

// Setup all event listeners
function setupEventListeners() {
    // Navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });

    // Close modal when clicking outside
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('image-modal');
        if (event.target === modal) {
            closeImageModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeImageModal();
        }
    });
}

// Page navigation
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-page') === pageName) {
            button.classList.add('active');
        }
    });

    currentPage = pageName;
}

// Image modal functions
function openImageModal(imageUrl, caption, description) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const modalDescription = document.getElementById('modal-description');

    modalImage.src = imageUrl;
    modalImage.alt = caption;
    modalCaption.textContent = caption;
    modalDescription.textContent = description;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Music toggle functionality
function toggleMusic() {
    musicPlaying = !musicPlaying;
    const musicIcon = document.getElementById('music-icon');
    const musicText = document.getElementById('music-text');

    if (musicPlaying) {
        musicIcon.textContent = '⏸️';
        musicText.textContent = 'Pause Music';
        // Here you can add actual audio functionality
        console.log('Music started');
    } else {
        musicIcon.textContent = '🎵';
        musicText.textContent = 'Play Music';
        console.log('Music paused');
    }
}

// Confetti functionality
function initializeConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

function triggerConfetti() {
    if (confettiAnimation) {
        clearInterval(confettiAnimation);
    }

    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    
    // Resize canvas to current window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const duration = 3000; // 3 seconds
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60 };

    const randomInRange = (min, max) => {
        return Math.random() * (max - min) + min;
    };

    confettiAnimation = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            clearInterval(confettiAnimation);
            return;
        }

        const particleCount = 50 * (timeLeft / duration);

        // Create confetti particles
        createConfettiParticles(ctx, {
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#EC4899', '#F472B6', '#FBCFE8', '#FDE68A', '#FCD34D']
        });

        createConfettiParticles(ctx, {
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#A855F7', '#C084FC', '#E9D5FF', '#FDE68A', '#FCD34D']
        });
    }, 250);
}

function createConfettiParticles(ctx, options) {
    const { particleCount, origin, colors } = options;
    
    for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = origin.x * ctx.canvas.width;
        const y = origin.y * ctx.canvas.height;
        
        drawConfettiPiece(ctx, x, y, color);
    }
}

function drawConfettiPiece(ctx, x, y, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.random() * Math.PI * 2);
    
    ctx.fillStyle = color;
    ctx.fillRect(-2, -2, 4, 4);
    
    ctx.restore();
}

// Set current date in letter
function setCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}

// Random wish functionality (if needed)
function randomWish() {
    const wishes = [
        'May all your dreams come true!',
        'Happiness always surround you!',
        'You brighten every room you enter.',
        'Wishing you endless joy and love!',
        'May this year be your best yet!',
        'You are an amazing person!'
    ];
    
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    
    // Create a temporary wish display
    const wishElement = document.createElement('div');
    wishElement.className = 'wish-display';
    wishElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #EC4899, #A855F7);
        color: white;
        padding: 1rem 2rem;
        border-radius: 1rem;
        font-size: 1.2rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 10px 40px -10px rgba(236, 72, 153, 0.3);
        animation: wishAppear 0.5s ease-out;
    `;
    
    wishElement.textContent = `✨ ${randomWish}`;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes wishAppear {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(wishElement);
    
    // Remove after 3 seconds
    setTimeout(() => {
        wishElement.style.animation = 'wishAppear 0.5s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(wishElement);
            document.head.removeChild(style);
        }, 500);
    }, 3000);
}

// Blow candles functionality
function blowCandles() {
    alert('Make a wish and blow the candles! 🕯️✨');
    
    // Add some visual effect
    const cake = document.querySelector('.cake');
    if (cake) {
        cake.style.animation = 'shake 0.5s ease-in-out';
        
        // Add shake animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            cake.style.animation = '';
            document.head.removeChild(style);
        }, 500);
    }
}

// Smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Handle window resize for confetti canvas
window.addEventListener('resize', function() {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to navigation cards
    const navCards = document.querySelectorAll('.nav-card');
    navCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add some fun Easter eggs
let clickCount = 0;
document.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 10) {
        // Secret celebration after 10 clicks
        triggerConfetti();
        setTimeout(() => {
            alert('🎉 You found the secret celebration! 🎉');
        }, 1000);
        clickCount = 0;
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'C' for confetti
    if (e.key.toLowerCase() === 'c' && e.ctrlKey) {
        e.preventDefault();
        triggerConfetti();
    }
    
    // Press 'H' to go home
    if (e.key.toLowerCase() === 'h' && e.ctrlKey) {
        e.preventDefault();
        showPage('home');
    }
    
    // Press 'G' for gallery
    if (e.key.toLowerCase() === 'g' && e.ctrlKey) {
        e.preventDefault();
        showPage('gallery');
    }
    
    // Press 'S' for songs
    if (e.key.toLowerCase() === 's' && e.ctrlKey) {
        e.preventDefault();
        showPage('songs');
    }
    
    // Press 'L' for letter
    if (e.key.toLowerCase() === 'l' && e.ctrlKey) {
        e.preventDefault();
        showPage('letter');
    }
});

console.log('🎉 Sibling Joy Website Loaded Successfully! 🎉');
console.log('💡 Try these keyboard shortcuts:');
console.log('   Ctrl + C: Trigger confetti');
console.log('   Ctrl + H: Go to home');
console.log('   Ctrl + G: Go to gallery');
console.log('   Ctrl + S: Go to songs');
console.log('   Ctrl + L: Go to letter');
console.log('   Click 10 times anywhere for a surprise! 🎁');
