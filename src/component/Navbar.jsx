import React, { useState } from "react";
import'./Navbar.css'
import axios from "axios";

function Navbar() {
  const [city, setCity] = useState(""); 
  const [country, setCountry] = useState(""); 
  const [weeklyWeather, setWeeklyWeather] = useState([]); 
  const [currentDayTemp, setCurrentDayTemp] = useState(null);
  const [searchDate, setSearchDate] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=${country}&key=9a2cf60d4cc0423d8251a64de7031b08`
      );
    
      const sevenDayData = response.data.data.slice(0, 7);
      setWeeklyWeather(sevenDayData);
      console.log(response.data.data.slice(0, 7));
      
      if (sevenDayData.length > 0) {
        setCurrentDayTemp(sevenDayData[0].temp);
      }
      console.log(response.data);
      console.log(response.data.data);

      setSearchDate(new Date());

    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Could not fetch weather data. Please check the city and country names.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim() && country.trim()) {
      fetchWeatherData();
    } else {
      alert("Please enter both city and country names!");
    }
  };

  return (
    <div className="Navbar-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter country name"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      
      {searchDate && (
        <h2>
          {searchDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
      )}
    
      {currentDayTemp !== null && (
        <div>
          <p>{city}, {country.toUpperCase()}</p>
          <p> {currentDayTemp}°C</p>
        </div>
      )}

      {weeklyWeather.length > 1 && (
        <div>
          <div className="weather-row">
            {weeklyWeather.map((day, index) => (
              <div>
                <h3>{new Date(day.valid_date).toLocaleDateString("en-US", { weekday: "long" })}</h3>
                <p>{day.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
