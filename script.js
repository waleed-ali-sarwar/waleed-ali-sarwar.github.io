// disable any developer tools and right-click context menu
// script.js
// waleed-ali-sarwar.github.io
// can make changes to this file

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('Right-click is disabled on this page.');
});

document.addEventListener('keydown', function(e) {
    // Disable F12
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'U')
    ) {
        e.preventDefault();
        alert('This action is disabled on this page.');
    }
});