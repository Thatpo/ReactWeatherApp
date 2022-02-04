import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [city, setCity] = useState('');
  const [back, setback] = useState(false);
  const apiKey = '4b1acf63eac42ed5d5cedd7c8a07b041';

  const getweather = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    const information = await response.json()
    changeback(information.main.temp)
    setData(information)

  };
  const changeback = (e) => {
    if (e >= 13) {
      setback(true)
    }
    if (e < 13) {
      setback(false)
    }
  }

  const updateSearch = (event) => {
    setCity(event.target.value)
    console.log(city)
  }
  return (
    <div className={back ? "weather-Container Hot" : "weather-Container Cold"}>

      <div className="weather-Top">

        <h1>{data.name}</h1>
        {data.main ? <h2>Temperature: {data.main.temp}°C | Feels like: {Math.ceil(data.main.feels_like)}°C </h2> : null}
      </div>
      <div className="weather-Middle">
        <input onChange={updateSearch} placeholder=' Search Cities' />
        <button onClick={() => { getweather() }}>Search</button>
      </div>
      <div className="weather-Bottom">
        {data.main ? <h2>Humidity: {data.main.humidity}% |</h2> : null}
        {data.weather ? <h2 style={{ textIndent: "5px " }}> Weather: {data.weather[0].description} |</h2> : null}
        {data.wind ? <h2 style={{ textIndent: "5px " }}> Wind Speed: {data.wind.speed}MPS</h2> : null}
      </div>
    </div>

  );
}

export default App;
