can my react js code be simplified to begginer friendly: import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState({});
    const [dailyForecast, setDailyForecast] = useState([]);
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [savedLocations, setSavedLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const api = {
        key: "895284fb2d2c50a520ea537456963d9c",
        base: "https://api.openweathermap.org/data/2.5"
    };

    const fetchWeatherByLocation = (lat, lon) => {
        // Fetch weather data
        Axios.get(${api.base}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key})
            .then(response => {
                const { coord } = response.data;
                setWeatherData({
                    description: response.data.weather[0].description,
                    temp: response.data.main.temp,
                    temp_min: response.data.main.temp_min,
                    temp_max: response.data.main.temp_max,
                    humidity: response.data.main.humidity,
                    wind_speed: response.data.wind.speed,
                    country: response.data.sys.country,
                    image: response.data.weather[0].icon
                });

                // Fetch daily and hourly forecasts using One Call API
                Axios.get(${api.base}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&units=metric&appid=${api.key})
                    .then(response => {
                        console.log(response.data);
                        setDailyForecast(response.data.daily);
                        setHourlyForecast(response.data.hourly.slice(0, 24)); // Assuming we need the first 24 hours
                    })
                    .catch(error => {
                        console.error("Error fetching forecasts:", error);
                    });
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    };

    useEffect(() => {
        // Get geolocation on component mount
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                fetchWeatherByLocation(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.error("Error getting geolocation:", error);
            }
        );
    }, []);

    useEffect(() => {
        if (selectedLocation) {
            const { lat, lon } = selectedLocation;
            fetchWeatherByLocation(lat, lon);
        }
    }, [selectedLocation]);

    const handleSearch = () => {
        Axios.get(${api.base}/weather?q=${city}&units=metric&appid=${api.key})
            .then(response => {
                const { coord } = response.data;
                setWeatherData({
                    description: response.data.weather[0].description,
                    temp: response.data.main.temp,
                    temp_min: response.data.main.temp_min,
                    temp_max: response.data.main.temp_max,
                    humidity: response.data.main.humidity,
                    wind_speed: response.data.wind.speed,
                    country: response.data.sys.country,
                    image: response.data.weather[0].icon
                });

                // Fetch daily and hourly forecasts using One Call API
                Axios.get(${api.base}/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=current,minutely,alerts&units=metric&appid=${api.key})
                    .then(response => {
                        console.log(response.data);
                        setDailyForecast(response.data.daily);
                        setHourlyForecast(response.data.hourly.slice(0, 24)); // Assuming we need the first 24 hours
                    })
                    .catch(error => {
                        console.error("Error fetching forecasts:", error);
                    });
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    };

    const handleSaveLocation = () => {
        if (city && !savedLocations.find(loc => loc.city === city)) {
            setSavedLocations([...savedLocations, { city, lat: latitude, lon: longitude }]);
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
        <div className={container ${isDarkMode ? 'dark-mode' : ''}}>
            <div className='input'>
                <h1>Current Weather</h1>
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
                    <h2>Other Locations</h2>
                    <ul>
                        {savedLocations.map((location, index) => (
                            <li key={index} onClick={() => handleLocationClick(location)}>
                                {location.city}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='displayData'>
                    {weatherData.description && (
                        <>
                            <h3>Description: {weatherData.description}</h3>
                            <h3>Temperature: {weatherData.temp}°C</h3>
                            <h3>Wind Speed: {weatherData.wind_speed} m/s</h3>
                            <h3>Humidity: {weatherData.humidity}%</h3>
                            <h3>Country: {weatherData.country}</h3>
                            <div className='weather-icon'>
                                <img src={https://openweathermap.org/img/wn/${weatherData.image}.png} alt="Current weather icon" />
                            </div>
                        </>
                    )}
                </div>

                <div className='forecast-container'>
                    <div className='hourly-forecast'>
                        <h2>Hourly Forecast</h2>
                        <div className='hourly-list'>
                            {hourlyForecast.map((hour, index) => (
                                <div key={index} className='hour'>
                                    <p>Time: {new Date(hour.dt * 1000).toLocaleTimeString()}</p>
                                    <p>Temp: {hour.temp}°C</p>
                                    <p>Description: {hour.weather[0].description}</p>
                                    <img src={https://openweathermap.org/img/wn/${hour.weather[0].icon}.png} alt="hourly weather icon" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='daily-forecast'>
                        <h2>Daily Forecast</h2>
                        <div className='daily-list'>
                            {dailyForecast.map((day, index) => (
                                <div key={index} className='day'>
                                    <p>Date: {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p>Min Temp: {day.temp.min}°C</p>
                                    <p>Max Temp: {day.temp.max}°C</p>
                                    <p>Humidity: {day.humidity}%</p>
                                    <img src={https://openweathermap.org/img/wn/${day.weather[0].icon}.png} alt="daily weather icon" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
