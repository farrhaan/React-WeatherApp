// import { getAllByPlaceholderText } from '@testing-library/dom';
import { useState } from 'react';
import './index.css';
const apikey= "ba60b64762fc6680b6a35ee6c8d2dc47";

function App() {

  const[query, setQuery] = useState('');
  const[weather, setWeather] = useState('');

const search = evt => {

  if(evt.key==="Enter")
  {   
   // setQuery(value);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apikey}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result)
      setQuery('');
      console.log(result);
    });
  }
}

  const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className="wrap">
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className = "search-box">
          <input
            type ="text"
            className = "search-bar"
            placeholder = "Search City..."
            onChange = {e=> setQuery(e.target.value)}
            value = {query}
            onKeyPress = {search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
    </div>
  );
} 

export default App;
