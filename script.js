document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typewriter effect for the header text
let i = 0;
const txt = 'Welcome to my portfolio';
const speed = 100;

function typeWriter() {
    if (i < txt.length) {
        document.querySelector('#home span').textContent += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

// Start animation when page loads
window.onload = typeWriter;

// Add fade-in effect for portfolio items
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
});

document.querySelectorAll('.portfolio-item').forEach((item) => {
    observer.observe(item);
});
    // DOM is fully loaded, but not including resources like images
    console.log('DOM fully loaded');
});
