// Smooth scrolling for better user experience
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

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', function () {
    const emailLink = document.querySelector('.email-link');
    if (emailLink) {
        emailLink.addEventListener('focus', function () {
            this.style.transform = 'translateY(-2px)';
        });
        emailLink.addEventListener('blur', function () {
            this.style.transform = 'translateY(0)';
        });
    }
});

// Simple analytics (privacy-friendly)
if ('performance' in window) {
    window.addEventListener('load', function () {
        // Log page load time for optimization (no personal data)
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Privacy Policy page loaded in:', loadTime + 'ms');
    });
}

// Password for developer mode
const DEV_PASSWORD = "Happy@963";
const REDIRECT_URL = "https://waleed-ali-sarwar.github.io";

// Detect DevTools open (basic detection)
let devtoolsOpen = false;

function checkDevTools() {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    if (widthThreshold || heightThreshold) {
        if (!devtoolsOpen) {
            devtoolsOpen = true;
            promptPassword();
        }
    } else {
        devtoolsOpen = false;
    }
}

function promptPassword() {
    const pwd = prompt("Enter password to access developer mode:");
    if (pwd !== DEV_PASSWORD) {
        alert("Incorrect password! Redirecting...");
        window.location.href = REDIRECT_URL;
    }
}

// Listen for F12, Ctrl+Shift+I/J/C, or right-click "Inspect"
window.addEventListener('keydown', function (e) {
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C"))
    ) {
        e.preventDefault();
        promptPassword();
    }else{
        devtoolsOpen = true; 
    }
});

// Detect DevTools open by resizing
setInterval(checkDevTools, 1000);

// Prevent right-click context menu 
window.addEventListener('contextmenu', function (e) {
    alert("Right-click is disabled.");
    e.preventDefault();
});