document.addEventListener("DOMContentLoaded", () => {
  const apiKey = `8496a87bbf0a7b89b61cf223ee71ff31`;
  const searchButton = document.querySelector(".search button");
  const searchInput = document.querySelector(".search input");
  const weatherContainer = document.querySelector(".weather-container");
  const temperatureElement = weatherContainer.querySelector("p:nth-of-type(1)");
  const cityElement = weatherContainer.querySelector("p:nth-of-type(2)");
  const weatherImg = document.getElementById("weather-img");
  const humidityElement = weatherContainer.querySelector(
    ".humidity-text p:nth-of-type(1)"
  );
  const windElement = weatherContainer.querySelector(
    ".wind-text p:nth-of-type(1)"
  );

  async function getWeatherData(city) {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        document.querySelector(".main").style.display = "block";
        const temperature = data.main.temp;
        const cityName = data.name;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        // Update the HTML elements with the fetched data
        temperatureElement.textContent = `${temperature}°C`;
        cityElement.textContent = cityName;
        humidityElement.textContent = `${humidity}%`;
        windElement.textContent = `${windSpeed} km/h`;

        if (data.weather[0].main === "Clouds") {
          weatherImg.src = "images/clouds.png";
        } else if (data.weather[0].main === "Rain") {
          weatherImg.src = "images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
          weatherImg.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Snow") {
          weatherImg.src = "images/snow.png";
        } else if (data.weather[0].main === "Clear") {
          weatherImg.src = "images/clear.png";
        } else if (data.weather[0].main === "Mist") {
          weatherImg.src = "images/mist.png";
        }
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("Error retrieving weather data.");
    }
  }

  searchButton.addEventListener("click", () => {
    const city = searchInput.value.trim();

    if (city) {
      getWeatherData(city);
    } else {
      alert("Please enter a city name.");
    }
    searchInput.value = "";
  });
});
