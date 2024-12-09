import React, { useState } from "react";
import axios from "axios";

function Navbar() {
  const [city, setCity] = useState(""); 
  const [country, setcountry] = useState("");
  const [weatherData, setWeatherData] = useState(null); 

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/current?city=${city}&key=9a2cf60d4cc0423d8251a64de7031b08`
      );
      setWeatherData(response.data.data[0]); 
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim()) {
      fetchWeatherData(); 
    } else {
      alert("Please enter a city name!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter country name"
          value={country}
          onChange={(event) => setcountry(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {weatherData && (
        <div>
          <h2>{weatherData.city_name}</h2>
          <p>{weatherData.weather.description}</p>
          <p>Temperature: {weatherData.temp}°C</p>
        </div>
      )}
    </div>
  );
}

export default Navbar;
