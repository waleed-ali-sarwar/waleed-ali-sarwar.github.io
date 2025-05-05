document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "3a2559d90d5164fda5aade1beea11065";
    const searchedContainer = document.getElementById("searched-weather-container");
    const clockDisplay = document.getElementById("digital-clock");

    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
    
        const clockDisplay = document.getElementById("digital-clock");
        clockDisplay.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    }
    
    setInterval(updateClock, 1000);
    updateClock();
    
    // Function to fetch searched weather
    function fetchWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const temp = data.main.temp;
                const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

                searchedContainer.innerHTML = `
                    <div class="w-card" style="background-color:#f9f9f9; padding: 16px; text-align: center; border-radius: 8px;">
                        <h3>${data.name}</h3>
                        <img src="${iconUrl}" alt="${data.weather[0].description}">
                        <p style="font-weight: bold;">Temperature: ${temp}°C</p>
                        <p>Condition: ${data.weather[0].description}</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Wind Speed: ${data.wind.speed} m/s</p>
                    </div>
                `;
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                searchedContainer.innerHTML = "<p>Error fetching weather data.</p>";
            });
    }

    document.getElementById("search-button").addEventListener("click", function () {
        const cityInput = document.getElementById("search-input");
        const city = cityInput.value.trim();

        if (!city) {
            Swal.fire({
                title: "Error!",
                text: "Please enter a city name.",
                icon: "error"
            });
            return;
        }

        fetchWeather(city);
        cityInput.value = "";
    });
});
