
const CORRECT_PASSWORD = 'oh my darling I love you';

// DOM Elements
const passwordForm = document.getElementById('passwordForm');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');
const envelopeContainer = document.getElementById('envelope');
const letterContainer = document.getElementById('letter');
const romanticSong = document.getElementById('romanticSong');
const sparklesContainer = document.getElementById('sparkles');
const floatingHeartsContainer = document.getElementById('floatingHearts');
const fallingHeartsContainer = document.getElementById('fallingHearts');

// Initialize sparkles
function createSparkles() {
    for (let i = 0; i < 50; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = `
            <svg width="${Math.random() * 10 + 5}" height="${Math.random() * 10 + 5}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20M2 12h20M6 6l12 12M6 18L18 6"/>
            </svg>
        `;
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        sparkle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        sparklesContainer.appendChild(sparkle);
    }
}

// Initialize floating hearts
function createFloatingHearts() {
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = `
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        `;
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 15 + 15}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.transform = `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 360}deg)`;
        floatingHeartsContainer.appendChild(heart);
    }
}

// Create falling hearts (when letter is shown)
function createFallingHearts() {
    const colors = [
        '#fb7185', // rose-400
        '#f472b6', // pink-400
        '#f87171', // red-400
        '#f43f5e', // rose-500
        '#ec4899', // pink-500
        '#e879f9', // fuchsia-400
    ];

    for (let i = 0; i < 60; i++) {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        const size = Math.random() * 25 + 20;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        heart.innerHTML = `
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        `;
        
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 4 + 4}s`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        heart.style.transform = `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 360}deg)`;
        
        fallingHeartsContainer.appendChild(heart);
    }
}

// Handle form submission
passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const enteredPassword = passwordInput.value.trim().toLowerCase();
    
    if (enteredPassword === CORRECT_PASSWORD.toLowerCase()) {
        // Correct password - show letter
        errorMessage.textContent = '';
        
        // Hide envelope with animation
        envelopeContainer.classList.add('hide');
        
        // Wait for envelope animation to complete, then show letter
        setTimeout(() => {
            envelopeContainer.style.display = 'none';
            letterContainer.style.display = 'block';
            
            // Create falling hearts
            createFallingHearts();
            
            // Play romantic song
            romanticSong.play().catch(err => {
                console.log('Audio playback failed:', err);
            });
        }, 800);
        
    } else {
        // Wrong password
        errorMessage.textContent = 'Not quite right... listen to your heart 💕';
        
        // Clear error after 2 seconds
        setTimeout(() => {
            errorMessage.textContent = '';
        }, 2000);
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createSparkles();
    createFloatingHearts();
});

// Optional: Allow audio to play on user interaction (some browsers require this)
document.addEventListener('click', () => {
    if (romanticSong.paused && letterContainer.style.display === 'block') {
        romanticSong.play().catch(err => {
            console.log('Audio playback failed:', err);
        });
    }
}, { once: true });
