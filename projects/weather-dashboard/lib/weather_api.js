// or via CommonJS
document.addEventListener("DOMContentLoaded", function () {
    const lat = '30.3753';
    const lon = '69.3451';
    const apiKey = "3a2559d90d5164fda5aade1beea11065"; // api key
    const cities = ["rawalpindi", "islamabad", "karachi", "lahore", "Multan"];// default cities
    const container = document.querySelector("#w_row"); // dynamic container
    // colors for based on temperature
    // Cold: Blue Shades, Cool: Green Shades, Mild: Yellow Shades, Warm: Orange Shades, Hot: Red Shades
    function getTemperatureColor(temp) {
        if (temp <= 5) return { text: "#0D6EFD", bg: "#D6E6FF" }; // Cold: Blue Shades
        if (temp > 5 && temp <= 15) return { text: "#198754", bg: "#DFF3E3" }; // Cool: Green Shades
        if (temp > 15 && temp <= 25) return { text: "#FFC107", bg: "#FFF5CC" }; // Mild: Yellow Shades
        if (temp > 25 && temp <= 35) return { text: "#FD7E14", bg: "#FFE3D6" }; // Warm: Orange Shades
        return { text: "#DC3545", bg: "#FFD1D1" }; // Hot: Red Shades
    }

    // Live Charts
    const c = 'Pakistan';

    async function fetchWeatherData_weather() {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${c}&units=metric&appid=${apiKey}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Extract hourly data for the next 8 intervals (3-hour intervals)
            const hourlyData = data.list.slice(0, 8).map(item => ({
                hour: new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                temp: item.main.temp,
                condition: item.weather[0].description,
                windSpeed: item.wind.speed + ' m/s'
            }));

            const labels = hourlyData.map(item => item.hour);
            const temperatures = hourlyData.map(item => item.temp);
            const conditions = hourlyData.map(item => item.condition);
            const windSpeeds = hourlyData.map(item => item.windSpeed);


            renderChart(labels, temperatures, conditions, windSpeeds);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    function renderChart(labels, temperatures, conditions, windSpeeds) {
        const ctx = document.getElementById('weatherChart').getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Temperature (°C)',
                    data: temperatures,
                    backgroundColor: 'rgba(0, 61, 110, 0.13)',
                    borderColor: 'rgba(0, 60, 110, 0.73)',
                    borderWidth: 1,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: value => value + '°C'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            afterBody: function (context) {
                                const index = context[0].dataIndex;
                                return `Condition: ${conditions[index]}\nWind: ${windSpeeds[index]}`;
                            }
                        }
                    }
                }
            }
        });
    }


    // Weather Search function
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

    // weekly based weather forecast
    function getWeeklyWeatherForecast(c) {
        const URL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${c}&appid=${apiKey}`;

        fetch(URL)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function displayWeatherData(data) {
        const weatherAccordion = document.getElementById('w-weatherAccordion');
        const cityName = data.city.name;
        const dailyForecasts = data.list.filter((entry, index) => index % 8 === 0).slice(0, 8);

        const header = document.createElement('h2');
        header.textContent = `8-Day Forecast for ${cityName}`;
        weatherAccordion.appendChild(header);

        dailyForecasts.forEach((forecast, index) => {
            const date = new Date(forecast.dt * 1000).toDateString();
            const tempMin = forecast.main.temp_min;
            const tempMax = forecast.main.temp_max;
            const weatherDesc = forecast.weather[0].description;

            const item = document.createElement('div');
            item.classList.add('w-accordion-item');

            const button = document.createElement('button');
            button.classList.add('w-accordion-button');
            button.textContent = `${date} - ${tempMax} / ${tempMin}°C - ${weatherDesc}`;

            const content = document.createElement('div');
            content.classList.add('w-accordion-content');
            content.innerHTML = `<p>Weather: ${weatherDesc}</p><p>Temperature: ${tempMax}°C / ${tempMin}°C</p>`;

            button.addEventListener('click', () => {
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            });

            item.appendChild(button);
            item.appendChild(content);
            weatherAccordion.appendChild(item);
        });
    }

    fetchWeatherData_weather(); // chart function call
    getWeeklyWeatherForecast('Pakistan'); // default city/Country for weekly forecast
    cities.forEach(city => fetchWeather(city)); // render default cities
    fetchWeatherData(); // search based function call
});

// loading animation
window.addEventListener("load", function() {
    setTimeout(function() {
        document.getElementById("w-loading").style.display = "none";
    }, 2000); // 1 second delay
});    