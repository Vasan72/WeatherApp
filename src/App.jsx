import React, { useEffect, useState } from "react";
import "./App.css";
import clearIcon from "./assets/clear.png";
import cloudsIcon from "./assets/clouds.png";
import drizzleIcon from "./assets/drizzle.png";
import humidityIcon from "./assets/humidity.png";
import mistIcon from "./assets/mist.png";
import rainIcon from "./assets/rain.png";
import searchIcon from "./assets/search.png";
import snowIcon from "./assets/snow.png";
import windIcon from "./assets/wind.png";
import PropTypes from "prop-types"

const WeatherApp = ({
  icon,
  temp,
  cityname,
  country,
  lat,
  log,
  hum,
  wspeed,
}) => {
  return (
    <>
      <div className="image">
        <img className="Image" src={icon} alt="Image" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="cityname">{cityname}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">longitude</span>
          <span>{log}</span>
        </div>
      </div>

      <div className="wind-details">
        <div className="humidity">
          <img src={humidityIcon} alt="humidity" className="icon" />
          <span className="hum-value">{hum}%</span>
          <span>Humidity</span>
        </div>
        <div className="wind-speed">
          <img src={windIcon} alt="humidity" className="icon" />
          <span className="speed-val">{wspeed}km/h</span>
          <span>Wind Speed</span>
        </div>
      </div>
    </>
  );
};
WeatherApp.PropTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  cityname: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired,
}

function App() {
  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(43);
  const [text, setText] = useState("chennai");
  const [name, setName] = useState("");
  const [countryname, setcountryname] = useState("IN");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHum] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cityNotfound, setCityNotFound] = useState(false);
  const [error, setEror] = useState(null);
  let AppKey = "b658e89394039c288dfd47e1dae42de5";
  const WeatherIconMap = {
    "01d": clearIcon,
    "01n": cloudsIcon,
    "02d": cloudsIcon,
    "02n": cloudsIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const GetResult = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text},IND&appid=${AppKey}&units=Metric`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.cod === "404") {
        console.log("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setTemp(Math.floor(data.main.temp));
      setName(data.name);
      setHum(data.main.humidity);
      setSpeed(data.wind.speed);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      setcountryname(data.sys.country);
      const weatherCode = data.weather[0].icon;
      setIcon(WeatherIconMap[weatherCode] || clearIcon);
      setCityNotFound(false);
    } catch (error) {
      console.error("Error Occurred: ", error.message);
      setEror("An error occured while fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  const SearchValue = (e) => {
    setText(e.target.value);
  };
  const EnterClick = (e) => {
    if (e.key === "Enter") {
      GetResult();
    }
  };
  useEffect(function () {
    GetResult();
  }, []);

  return (
    <div className="app-container">
      <div className="searchBar">
        <input
          type="text"
          className="cityInput"
          value={text}
          onChange={SearchValue}
          onKeyDown={EnterClick}
          placeholder="Search City"
        />
        <img
          src={searchIcon}
          alt="searchIcon"
          onClick={GetResult}
          className="search-icon"
        />
      </div>
      {loading && <div className="loading-message">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {cityNotfound && <div className="city-not-found">City not found</div>}
      {!loading && !cityNotfound && (
        <WeatherApp
          icon={icon}
          temp={temp}
          cityname={name}
          country={countryname}
          lat={lat}
          log={log}
          hum={humidity}
          wspeed={speed}
        />
      )}

      <p>
        Designed by <a className="myInfo" href="https://github.com/Vasan72">Vasanth</a>
      </p>
    </div>
  );
}

export default App
