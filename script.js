/**
 * Typewriter Effect matching Knuford's dynamic subtitle
 */
const words = ["Developer.", "Designer.", "Freelancer.", "Creator."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterElement = null;

function type() {
    typewriterElement = document.getElementById("typewriter-text");
    if(!typewriterElement) return;

    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Variable typing speeds for realism
    let typeSpeed = isDeleting ? 40 : 120 - Math.random() * 50;

    if (!isDeleting && charIndex === currentWord.length) {
        // Pause at the end of the word
        typeSpeed = 2500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 600; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
}

/**
 * Real-time Clock Implementation
 */
function updateTime() {
    const now = new Date();
    
    // Format Time
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    
    document.getElementById("hours").textContent = h;
    document.getElementById("minutes").textContent = m;
    document.getElementById("seconds").textContent = s;

    // Format Date
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    document.getElementById("day").textContent = days[now.getDay()];
    
    // Helper for ordinal suffix (st, nd, rd, th)
    const getOrdinalNum = (n) => {
        return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
    };
    
    document.getElementById("date").textContent = `${months[now.getMonth()]} ${getOrdinalNum(now.getDate())}, ${now.getFullYear()}`;
}

// Initialize and setup intervals when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    type();
    updateTime();
    // Start the clock at the next precise second for better accuracy
    setTimeout(() => {
        updateTime();
        setInterval(updateTime, 1000);
    }, 1000 - new Date().getMilliseconds());
});
