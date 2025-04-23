document.addEventListener("DOMContentLoaded", function () {
    console.log(`Waleed Ali Sarwar - Weather Dashboard Application using HTML,CSS,JS.`); // Log the author name
    const weatherForm = document.getElementById("weather-form");
    const cityInput = document.getElementById("city-input");
    const weatherDetail = document.querySelector(".weather-detail"); // Target the weather section

    // Hide weather details initially
    weatherDetail.style.display = "none";

    weatherForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent page reload

        const apiKey = "3a2559d90d5164fda5aade1beea11065"; // ✅ Securely set your API key
        const city = cityInput.value.trim();

        if (!city) {
            alert("Please enter a city name.");
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod !== 200) {
                alert("City not found! Please enter a valid city name.");
                return;
            }

            // Show weather details after successful search
            weatherDetail.style.display = "block";

            // Update the DOM with weather data
            document.getElementById("city-name").innerText = data.name;
            document.getElementById("temperature").innerHTML = `${data.main.temp}&deg;C`;
            document.getElementById("description").innerText = data.weather[0].description;
            document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
            document.getElementById("wind-speed").innerText = `Wind Speed: ${data.wind.speed} m/s`;
            document.getElementById("icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" width="80">`;

            console.log(`Weather data for ${data.name}:`, data); // Log the weather data for debugging
            console.log(`Waleed Ali Sarwar - Weather Dashboard Application using HTML,CSS,JS.`); // Log the author name
        } catch (error) {
            alert("An error occurred while fetching data. Please try again later.");
        }
    });
});
 