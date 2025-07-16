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
