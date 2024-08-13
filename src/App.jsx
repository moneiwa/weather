// import { useState } from 'react';
// import './App.css';
// import Axios from 'axios';
// import React from 'react';

// function App() {

//   const [city, setCity] = useState("");
//   const [weatherData, setWeatherData] = useState({});
//   const [dailyForecast, setDailyForecast] = useState([]);
//   const [hourlyForecast, setHourlyForecast] = useState([]);
// const [latitude,setLatitude]=React.useState('');
// const [longitude, setLongitude]=React.useState('');
// const searchWeather = () => {

//     const api = {
//       key: "895284fb2d2c50a520ea537456963d9c",
//       base: "https://api.openweathermap.org/data/2.5"
//     };

//     // Fetch current weather data
//     Axios.get(`${api.base}/weather?q=${city}&appid=${api.key}`)
//       .then(response => {
//         console.log(response.data);
//         setWeatherData({
//           description: response.data.weather[0].description,
//           temp: response.data.main.temp,
//           temp_min: response.data.main.temp_min,
//           temp_max: response.data.main.temp_max,
//           humidity: response.data.main.humidity,
//           wind_speed: response.data.wind.speed,
//           country: response.data.sys.country,
//           image: response.data.weather.at(0).icon
//         });

      
//         Axios.get(`${api.base}/forecast/daily?q=${city}&cnt=7&appid=${api.key}`)
//           .then(dailyResponse => {
//             console.log(dailyResponse.data);
//             setDailyForecast(dailyResponse.data.list);
//           })
//           .catch(error => {
//             console.error("Error fetching daily forecast:", error);
//           });

//         Axios.get(`${api.base}/forecast?q=${city}&appid=${api.key}`)
//           .then(hourlyResponse => {
//             console.log(hourlyResponse.data);
//             setHourlyForecast(hourlyResponse.data.list.slice(0, 24));
//           })
//           .catch(error => {
//             console.error("Error fetching hourly forecast:", error);
//           });

//       })
//       .catch(error => {
//         console.error("Error fetching weather data:", error);
//       });
//   };

// React.useEffect(()=>{
//   navigator.geolocation.getCurrentPosition((position) =>{
//     setLatitude(position.coords.latitude);
//     setLongitude(position.coords.longitude)
//   })

// let finalAPIEndPoint = `${API_endpoint}lat=${latitude}&lon=${longitute}&exclude=hourly,daily&appid=${API_key}`
// axios.get(finalAPIEndPoint)
// // (`${API_endpoint}lat=${latitude}&lon=${longitute}&exclude=hourly,daily&appid=${API_key}`)
// .then((response)=>{
//   console.log(response.data)
// })


// },[]
// )

//   return (
//     <div className="container">
//       <div className='input'>
//         <h1>Current Weather</h1>
//         <input
//           type="text"
//           onChange={(e) =>
//             setCity(e.target.value)}
//         />
//         <button onClick={searchWeather}>Search</button>
//         <div className='displayData'>
//           <h3>Description: {weatherData.description}</h3>
//           <h3>Temperature: {weatherData.temp}</h3>
//           <h3>Wind Speed: {weatherData.wind_speed}</h3>
//           <h3>Humidity: {weatherData.humidity}</h3>
//           <h3>Country: {weatherData.country}</h3>
//           {weatherData.Description}</div>
//         <div className='weather-icon'>
//           <img src={`https://openweathermap.org/img/wn/${weatherData.image}.png`} alt="Current weather icon" />
//         </div>

        
//         <div className='forecast-container'>
//           <div className='hourly-forecast'>
//             <h2>Hourly Forecast</h2>
//             <div className='hourly-list'>
//               {hourlyForecast.map((hour, index) => (
//                 <div key={index} className='hour'>
//                   <p>Time: {new Date(hour.dt * 1000).toLocaleTimeString()}</p>
//                   <p>Temp: {hour.main.temp}°C</p>
//                   <p>Description: {hour.weather[0].description}</p>
//                   <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="hourly weather icon" />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className='daily-forecast'>
//             <h2>Daily Forecast</h2>
//             <div className='daily-list'>
//               {dailyForecast.map((day, index) => (
//                 <div key={index} className='day'>
//                   <p>Date: {new Date(day.dt * 1000).toLocaleDateString()}</p>
//                   <p>Min Temp: {day.temp.min}°C</p>
//                   <p>Max Temp: {day.temp.max}°C</p>
//                   <p>Description: {day.weather[0].description}</p>
//                   <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="daily weather icon" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;





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

  const api = {
    key: "895284fb2d2c50a520ea537456963d9c",
    base: "https://api.openweathermap.org/data/2.5"
  };

  const searchWeather = () => {
    // Fetch current weather data
    Axios.get(`${api.base}/weather?q=${city}&appid=${api.key}`)
      .then(response => {
        console.log(response.data);
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

        // Fetch daily forecast
        Axios.get(`${api.base}/forecast/daily?q=${city}&cnt=7&appid=${api.key}`)
          .then(dailyResponse => {
            console.log(dailyResponse.data);
            setDailyForecast(dailyResponse.data.list);
          })
          .catch(error => {
            console.error("Error fetching daily forecast:", error);
          });

        // Fetch hourly forecast
        Axios.get(`${api.base}/forecast?q=${city}&appid=${api.key}`)
          .then(hourlyResponse => {
            console.log(hourlyResponse.data);
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
    // Get geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const finalAPIEndPoint = `${api.base}/weather?lat=${latitude}&lon=${longitude}&appid=${api.key}`;
      Axios.get(finalAPIEndPoint)
        .then((response) => {
          console.log(response.data);
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
        })
        .catch((error) => {
          console.error("Error fetching weather data by geolocation:", error);
        });
    }
  }, [latitude, longitude]);

  return (
    <div className="container">
      <div className='input'>
        <h1>Current Weather</h1>
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={searchWeather}>Search</button>
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
   
  );
}

export default App;
