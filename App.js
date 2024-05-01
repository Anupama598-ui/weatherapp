// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get('/api/weather');
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/weather?city=${city}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error searching weather data:', error.message);
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/013/826/094/original/set-vertical-background-of-weather-forecast-app-widgets-sunny-day-thunderstorm-rain-night-and-winter-snow-illustration-free-vector.jpg')` }}>
      <h1 className="app-title">Weather Forecast App</h1>
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      <div className="weather-container">
        {weatherData.map((data, index) => (
          <div key={index} className="weather-card">
            <h2>{data.city}</h2>
            <p>Temperature: {data.temperature}°C</p>
            <p>Weather: {data.weather}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
