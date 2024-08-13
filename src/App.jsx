import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const api = {
    key: "895284fb2d2c50a520ea537456963d9c",
    base: "https://api.openweathermap.org/data/2.5"
  };

  const fetchWeatherData = (lat, lon, city) => {
    const currentWeatherEndpoint = city 
      ? `${api.base}/weather?q=${city}&appid=${api.key}` 
      : `${api.base}/weather?lat=${lat}&lon=${lon}&appid=${api.key}`;

    Axios.get(currentWeatherEndpoint)
      .then(response => {
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

        const dailyForecastEndpoint = city 
          ? `${api.base}/forecast/daily?q=${city}&cnt=7&appid=${api.key}` 
          : `${api.base}/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${api.key}`;

        const hourlyForecastEndpoint = city 
          ? `${api.base}/forecast?q=${city}&appid=${api.key}` 
          : `${api.base}/forecast?lat=${lat}&lon=${lon}&appid=${api.key}`;

        Axios.get(dailyForecastEndpoint)
          .then(dailyResponse => {
            setDailyForecast(dailyResponse.data.list);
          })
          .catch(error => {
            console.error("Error fetching daily forecast:", error);
          });

        Axios.get(hourlyForecastEndpoint)
          .then(hourlyResponse => {
            setHourlyForecast(hourlyResponse.data.list.slice(0, 24));
          })
          .catch(error => {
            console.error("Error fetching hourly forecast:", error);
          });
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
  };

  useEffect(() => {
    if (selectedLocation) {
      fetchWeatherData(selectedLocation.lat, selectedLocation.lon, "");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          fetchWeatherData(position.coords.latitude, position.coords.longitude, "");
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  }, [selectedLocation]);

  const searchWeather = () => {
    fetchWeatherData(null, null, city);
  };

  const addLocation = () => {
    if (city && !locations.some(loc => loc.city === city)) {
      setLocations([...locations, { city, lat: null, lon: null }]);
    }
  };

  const deleteLocation = (cityToDelete) => {
    setLocations(locations.filter(loc => loc.city !== cityToDelete));
    if (selectedLocation?.city === cityToDelete) {
      setSelectedLocation(null);
    }
  };

  const handleLocationSelect = (city, lat, lon) => {
    setSelectedLocation({ city, lat, lon });
  };

  return (
    <div className="container">
      <div className='input'>
        <h1>Current Weather</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={searchWeather}>Search</button>
        <button onClick={addLocation}>Add Location</button>
        <div className='locations-list'>
          <h2>Saved Locations</h2>
          <ul>
            {locations.map((loc, index) => (
              <li key={index}>
                <button onClick={() => handleLocationSelect(loc.city, loc.lat, loc.lon)}>
                  {loc.city}
                </button>
                <button onClick={() => deleteLocation(loc.city)}>Delete</button>
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
                <img src={`https://openweathermap.org/img/wn/${weatherData.image}.png`} alt="Current weather icon" />
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
                  <p>Temp: {hour.main.temp}°C</p>
                  <p>Description: {hour.weather[0].description}</p>
                  <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="hourly weather icon" />
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
                  <p>Description: {day.weather[0].description}</p>
                  <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="daily weather icon" />
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
