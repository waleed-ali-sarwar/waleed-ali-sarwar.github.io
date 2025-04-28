
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}

const links = document.querySelectorAll(".ajax-link");
const main = document.getElementById("main");
const loadingOverlay = document.getElementById("loading");

function loadPage(url) {
    // Show loading animation
    loadingOverlay.classList.add("show");

    // Use Fetch API to load content
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(data => {
            // Replace main content with fetched content
            main.innerHTML = data;
        })
        .catch(error => {
            console.error("Error fetching the page:", error);
            main.innerHTML = `<p>Error loading content. Please try again.</p>`;
        })
        .finally(() => {
            // Hide loading animation after fetching
            setTimeout(() => {
                loadingOverlay.classList.remove("show");
            }, 500); // Optional delay for smooth transition
        });
}

// Load default page (e.g., page1.html) on initial page load
loadPage("home.html");

// Set up event listeners for AJAX links
links.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior
        const url = this.getAttribute("href"); // Get link's href
        loadPage(url); // Load the page dynamically
    });
});