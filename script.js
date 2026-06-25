// Typewriter Effect
const words = ["Developer.", "Designer.", "Freelancer.", "Creator."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const el = document.getElementById("typewriter-text");
    if (!el) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
        el.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        el.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 120 - Math.random() * 50;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 2500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 600;
    }

    setTimeout(type, speed);
}

// Real-time Clock
function updateTime() {
    const now = new Date();
    const pad = n => n < 10 ? '0' + n : String(n);

    document.getElementById("hours").textContent   = pad(now.getHours());
    document.getElementById("minutes").textContent = pad(now.getMinutes());
    document.getElementById("seconds").textContent = pad(now.getSeconds());

    const days   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const getOrdinal = n => {
        const s = ["th","st","nd","rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    document.getElementById("day").textContent  = days[now.getDay()];
    document.getElementById("date").textContent = `${months[now.getMonth()]} ${getOrdinal(now.getDate())}, ${now.getFullYear()}`;
}

// Scroll Reveal
function revealOnScroll() {
    const windowHeight = window.innerHeight;
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < windowHeight - 60) {
            el.classList.add('visible');
        }
    });
}

// Nav opacity on scroll
function handleNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    if (window.scrollY > 10) {
        nav.style.background = 'rgba(255,255,255,0.92)';
    } else {
        nav.style.background = 'rgba(255,255,255,0.72)';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    type();
    updateTime();

    // Align clock tick to exact second boundary
    setTimeout(() => {
        updateTime();
        setInterval(updateTime, 1000);
    }, 1000 - new Date().getMilliseconds());

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    window.addEventListener('scroll', handleNavScroll, { passive: true });
});
