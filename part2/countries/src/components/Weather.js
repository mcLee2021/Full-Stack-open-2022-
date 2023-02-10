import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    console.log(country);
    console.log(weather);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&exclude=hourly,daily&appid=${API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  return (
    <>
      {weather.main ? (
        <div>
          <h2>Weather in {country.capital}</h2>
          <div>Temperature {weather.main.temp} Celcius</div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <div>Wind {weather.wind.speed} m/s</div>
        </div>
      ) : null}
    </>
  );
};

export default Weather;
