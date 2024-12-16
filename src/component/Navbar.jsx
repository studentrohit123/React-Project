import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await axios.get('http://localhost:3000/weather/forecast', {
        params: {
          city: city,
          country: country
        }
      });

      setWeather({
        temperature: response.data.temperature,
        date: response.data.date,
      });
      console.log(response.data.temperature);
      console.log(response.data.date);

      setForecast(response.data.next_seven_days.slice(0, 7));
      console.log(response.data.next_seven_days.slice(0, 7));
      
      setError('');
    } catch (err) {
      setWeather(null);
      setError('Unable to fetch weather data.');
    }
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
      />
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Country"
      />
      <button onClick={fetchWeather}>Search</button>

      {weather && (
        <div>
          <h2>Weather Information</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Date: {weather.date}</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div>
          <h2>7-Day Weather Forecast</h2>
          <ul>
            {forecast.map((day, index) => (
              <li key={index}>
                <p>Date: {day.days}</p>
                <p>Temperature: {day.temperature}°C</p>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default WeatherApp;
