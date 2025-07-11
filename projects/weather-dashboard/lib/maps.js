     // Coordinates for Rawalpindi Savemart E-8 (default location)
     let lat = 33.6161;
     let lon = 73.0689;

     // Initialize the map with Rawalpindi default location
     const map = L.map('weatherMap').setView([lat, lon], 12); // Zoom level 12 for Rawalpindi

     // Add OpenStreetMap base layer
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; OpenStreetMap contributors'
     }).addTo(map);

     // Add a marker for the default location (Rawalpindi Savemart E-8)
     const marker = L.marker([lat, lon]).addTo(map);
     marker.bindPopup("<b>Rawalpindi Savemart E-8</b>").openPopup();

     // OpenWeatherMap API Key
     const apiKey = "3a2559d90d5164fda5aade1beea11065";

     // Function to get weather data and update the map
     function getWeatherData(lat, lon) {
         const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

         fetch(weatherUrl)
             .then(response => response.json())
             .then(data => {
                 const temp = data.main.temp; // Temperature in Celsius
                 const weather = data.weather[0].description; // Weather description
                 const humidity = data.main.humidity; // Humidity percentage

                 // Update marker with weather data
                 const weatherPopup = `<b>Weather at ${data.name}</b><br>Temperature: ${temp}°C<br>Weather: ${weather}<br>Humidity: ${humidity}%`;
                 marker.setLatLng([lat, lon]).bindPopup(weatherPopup).openPopup();
             })
             .catch(error => console.error('Error fetching weather data:', error));
     }

     // Function to get coordinates for a location from the search input
     function getLocationCoordinates(city) {
         const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;

         fetch(geocodeUrl)
             .then(response => response.json())
             .then(data => {
                 if (data && data[0]) {
                     lat = data[0].lat;
                     lon = data[0].lon;
                     map.setView([lat, lon], 12); // Zoom into the searched location
                     getWeatherData(lat, lon); // Get weather for this location
                 } else {
                     alert('Location not found!');
                 }
             })
             .catch(error => console.error('Error fetching location coordinates:', error));
     }

     // Event listener for the search button
     document.getElementById('search-button').addEventListener('click', () => {
         const city = document.getElementById('search-input').value;
         if (city) {
             getLocationCoordinates(city);
         } else {
             alert('Please enter a city name.');
         }
     });

     // Fetch weather for the default location (Rawalpindi Savemart E-8)
     getWeatherData(lat, lon);