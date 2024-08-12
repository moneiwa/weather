import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {


  const [city, setCity] = useState("");
const [weatherData,setWeatherData]=useState({})

  const searchWeather = () => {
    

    const api = 
{
  key: "895284fb2d2c50a520ea537456963d9c",
  base: "https://api.openweathermap.org/data/2.5"
}




    Axios.get(`${api.base}/weather?q=${city}&appid=${api.key}`)
      .then(response => {
        console.log(response.data);

        setWeatherData ({description: response.data.weather[0].description,

           temp:response.data.main.temp,
           temp_min:response.data.main.temp_min, 
           temp_max:response.data.main.temp_max,
           humidity:response.data.main.humidity, humidity:response.data.main.humidity,
           wind_speed:response.data.wind.speed,
           country: response.data.sys.country,
           image : response.data.weather.at(0).icon
          });
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
  };

  return (
    <div className="container">
      <div className='input'>
      <h1>Current Weather</h1>
      <input 
        type="text"
        onChange={(e) =>
          setCity(e.target.value)}
      />
      <button onClick={searchWeather}>Search</button>
      <div className='displayData'>
        <h3>Description: {weatherData.description}</h3>
        <h3>Temperature: {weatherData.temp}</h3>
        <h3>wind speed: {weatherData.wind_speed}</h3>
        <h3>humidity: {weatherData.humidity}</h3>
        <h3>country: {weatherData.country}</h3>
        {weatherData.Description}</div>
        <div className='weather-icon'>
          <img src={`https://openweathermap.org/img/wn/${weatherData.image}.png`}
          
          
          
          />
        </div>
        {/* <div className='value'>
          <div className='real'>{temperature} </div>
         
        </div>
        <div className='summary'>{description}</div> */}
    </div>
    </div>
  );
}

export default App;
