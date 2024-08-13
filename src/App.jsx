import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [dailyForecast, setDailyForecast] = useState([]);
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [savedLocations, setSavedLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const api = {
        key: "895284fb2d2c50a520ea537456963d9c",
        base: "https://api.openweathermap.org/data/2.5"
    };

    const fetchWeather = async (lat, lon) => {
        try {
            const weatherResponse = await Axios.get(`${api.base}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`);
            const { coord } = weatherResponse.data;
            setWeatherData({
                description: weatherResponse.data.weather[0].description,
                temp: weatherResponse.data.main.temp,
                temp_min: weatherResponse.data.main.temp_min,
                temp_max: weatherResponse.data.main.temp_max,
                humidity: weatherResponse.data.main.humidity,
                wind_speed: weatherResponse.data.wind.speed,
                country: weatherResponse.data.sys.country,
                image: weatherResponse.data.weather[0].icon
            });

            const forecastResponse = await Axios.get(`${api.base}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&units=metric&appid=${api.key}`);
            setDailyForecast(forecastResponse.data.daily);
            setHourlyForecast(forecastResponse.data.hourly.slice(0, 24));
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.error("Error getting geolocation:", error);
            }
        );
    }, []);

    useEffect(() => {
        if (selectedLocation) {
            fetchWeather(selectedLocation.lat, selectedLocation.lon);
        }
    }, [selectedLocation]);

    const handleSearch = async () => {
        try {
            const response = await Axios.get(`${api.base}/weather?q=${city}&units=metric&appid=${api.key}`);
            const { coord } = response.data;
            fetchWeather(coord.lat, coord.lon);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const handleSaveLocation = () => {
        if (city && !savedLocations.find(loc => loc.city === city)) {
            setSavedLocations([...savedLocations, { city, lat: null, lon: null }]);
            setCity(""); // Clear the input field
        }
    };

    const handleLocationClick = (location) => {
        setSelectedLocation(location);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className='input'>
                <h1>Weather App</h1>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleSaveLocation}>Save</button>
                <button onClick={toggleDarkMode}>
                    {isDarkMode ? 'Switch to Day Mode' : 'Switch to Dark Mode'}
                </button>
                <div className='Other-locations'>
                    <h2>Saved Locations</h2>
                    <ul>
                        {savedLocations.map((location, index) => (
                            <li key={index} onClick={() => handleLocationClick(location)}>
                                {location.city}
                            </li>
                        ))}
                    </ul>
                </div>
                {weatherData && (
                    <div className='displayData'>
                        <h3>Description: {weatherData.description}</h3>
                        <h3>Temperature: {weatherData.temp}°C</h3>
                        <h3>Wind Speed: {weatherData.wind_speed} m/s</h3>
                        <h3>Humidity: {weatherData.humidity}%</h3>
                        <h3>Country: {weatherData.country}</h3>
                        <div className='weather-icon'>
                            <img src={`https://openweathermap.org/img/wn/${weatherData.image}.png`} alt="Weather icon" />
                        </div>
                    </div>
                )}
                <div className='hourly-forecast'>
                    <h2>Hourly Forecast</h2>
                    <div className='hourly-list'>
                        {hourlyForecast.map((hour, index) => (
                            <div key={index} className='hour'>
                                <p>Time: {new Date(hour.dt * 1000).toLocaleTimeString()}</p>
                                <p>Temp: {hour.temp}°C</p>
                                <p>Description: {hour.weather[0].description}</p>
                                <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="Hourly weather icon" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='daily-forecast'>
                    <h2>Daily Forecast</h2>
                    <div className='daily-list'>
                        {dailyForecast.map((day, index) => (
                            <div key={index} className='day'>
                                <p>Date: {new Date(day.dt * 1000).toLocaleDateString()}</p>
                                <p>Min Temp: {day.temp.min}°C</p>
                                <p>Max Temp: {day.temp.max}°C</p>
                                <p>Humidity: {day.humidity}%</p>
                                <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="Daily weather icon" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
