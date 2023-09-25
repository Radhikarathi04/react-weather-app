 import React, { useState } from 'react';
 import './WeatherApp.css';
 import axios from 'axios';
 import {CirclesWithBar} from 'react-loader-spinner';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faSearch } from '@fortawesome/free-solid-svg-icons';
 
 
function WeatherApp () {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  const [buttonText, setButtonText] = useState('Click Me');

  
  // search function with event handler
  const search = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setQuery('');
      setWeather({...weather, loading: true});
      const url = 'https://api.openweathermap.org/data/2.5/weather';
      const appid = '3363286118df075d08c71f6a681eeab0';
      
      await axios.get(url, {
        params: {
          q: query,
          units: 'metric',
          appid: appid,
        }
      })
      .then((res) => {
        console.log('res', res);
        setWeather({ data: res.data, loading: false, error: false});
      })
      .catch((error) => {
        setWeather({...weather, data: {}, error: true });
        setQuery('');
        console.log('error', error);
      })
    }
  }

 
    const dateBuilder = (d) => {

    // Create an array of month names for formatting
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Create an array of days for formatting
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


    const date = `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    
    return date;
    }

    const changeText = (text)=> {
      setButtonText(text);
    }

   return (
     <div className='app'>
        <main>
        {/* Search bar */}
        <div className='search-bar'> 
            <input
                type='text'
                className='cityInput' 
                placeholder='Enter city name'

                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyPress={search} 
            /> 
            <FontAwesomeIcon icon={faSearch} className='search-icon' />
        </div>

        {/* <button onClick={() => changeText(weather.data.name)}>{buttonText}</button> */}
        

        {weather && weather.data && weather.data.main && (
        <div>
          <div className="location-box">
            <div className="location">{weather.data.name}, {weather.data.sys.country}</div>  
            <div className="date">{dateBuilder(new Date())}</div>
        </div>

        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.data.main.temp)}°C 
          </div>

          <div className="weather">{weather.data.weather[0].main}</div>
        </div>
        </div>
        )}

        </main>
     </div>
   )
 }
 
 export default WeatherApp;
 