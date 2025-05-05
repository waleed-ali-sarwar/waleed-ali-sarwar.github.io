// or via CommonJS
document.addEventListener("DOMContentLoaded", function () {

    const apiKey = "3a2559d90d5164fda5aade1beea11065";
    const cities = ["rawalpindi", "islamabad", "karachi"," lahore"];
    const container = document.querySelector(".w-row");
    function getTemperatureColor(temp) {
        if (temp <= 5) return { text: "#0D6EFD", bg: "#D6E6FF" }; // Cold: Blue Shades
        if (temp > 5 && temp <= 15) return { text: "#198754", bg: "#DFF3E3" }; // Cool: Green Shades
        if (temp > 15 && temp <= 25) return { text: "#FFC107", bg: "#FFF5CC" }; // Mild: Yellow Shades
        if (temp > 25 && temp <= 35) return { text: "#FD7E14", bg: "#FFE3D6" }; // Warm: Orange Shades
        return { text: "#DC3545", bg: "#FFD1D1" }; // Hot: Red Shades
    }
    function fetchWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const temp = data.main.temp;
                const colors = getTemperatureColor(temp);

                const weatherCard = document.createElement("div");
                weatherCard.classList.add("w-card");
                weatherCard.style.backgroundColor = colors.bg;

                const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

                weatherCard.innerHTML = `
                    <div class="w-card-container">
                        <h3>${data.name}</h3>
                        <img src="${iconUrl}" alt="${data.weather[0].description}">
                        <p style="color: ${colors.text}; font-weight: bold;">Temperature: ${temp}°C</p>
                        <p>Condition: ${data.weather[0].description}</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Wind Speed: ${data.wind.speed} m/s</p>
                    </div>
                `;

                container.appendChild(weatherCard);
            })
            .catch(error => {
                console.error(":", error);
            });
    }
    cities.forEach(city => fetchWeather(city));

});
