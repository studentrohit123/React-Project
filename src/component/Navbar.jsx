import React, { useState, useEffect } from "react";
import './Navbar.css';
import axios from "axios";

function Navbar() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [twoWordCountries, setTwoWordCountries] = useState([]);
  const [weeklyWeather, setWeeklyWeather] = useState([]);
  const [currentDayTemp, setCurrentDayTemp] = useState(null);
  const [searchDate, setSearchDate] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const filteredCountries = response.data
          .map((country) => country.name.common)
          .filter((name) => name.split(" ").length == 1);
        console.log(response.data);
        setTwoWordCountries(filteredCountries);
      } catch (error) {
        console.error("Error fetching country names:", error);
      }
    };
    fetchCountries();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=${country}&key=9a2cf60d4cc0423d8251a64de7031b08`
      );

      const sevenDayData = response.data.data.slice(0, 7);
      setWeeklyWeather(sevenDayData);
      
      if (sevenDayData.length > 0) {
        setCurrentDayTemp(sevenDayData[0].temp);
      }

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
      <div className="weather-center">
        <form onSubmit={handleSubmit}>
          <select
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          >
            <option value="">Select Country</option>
            {twoWordCountries.map((countryName) => (
              <option key={countryName} value={countryName}>
                {countryName}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {searchDate && (
        <p>
          {searchDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}

      {currentDayTemp !== null && (
        <div className="weather-temp">
          <p>{currentDayTemp}°C</p>
        </div>
      )}

      {weeklyWeather.length > 1 && (
        <div>
          <div className="weather-row">
            {weeklyWeather.map((day, index) => (
              <div key={index}>
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
