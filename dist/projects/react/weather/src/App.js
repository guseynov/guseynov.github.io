import React, { useEffect, useState } from "react";
import "./App.css";
const axios = require("axios");
const WeatherAPIKey = "12975cb5d84452a454240c06140fbbc9";

let cachedScripts = [];

function useScript(src) {
  // Keeping track of script loaded and error state

  const [state, setState] = useState({
    loaded: false,
    error: false,
  });

  useEffect(
    () => {
      // If cachedScripts array already includes src that means another instance ...
      // ... of this hook already loaded this script, so no need to load again.
      if (cachedScripts.includes(src)) {
        setState({
          loaded: true,

          error: false,
        });
      } else {
        cachedScripts.push(src);
        // Create script
        let script = document.createElement("script");
        script.src = src;
        script.async = true;
        // Script event listener callbacks for load and error
        const onScriptLoad = () => {
          setState({
            loaded: true,
            error: false,
          });
        };

        const onScriptError = () => {
          // Remove from cachedScripts we can try loading again
          const index = cachedScripts.indexOf(src);
          if (index >= 0) cachedScripts.splice(index, 1);
          script.remove();
          setState({
            loaded: true,
            error: true,
          });
        };
        script.addEventListener("load", onScriptLoad);
        script.addEventListener("error", onScriptError);
        // Add script to document body
        document.body.appendChild(script);
        // Remove event listeners on cleanup
        return () => {
          script.removeEventListener("load", onScriptLoad);
          script.removeEventListener("error", onScriptError);
        };
      }
    },
    [src] // Only re-run effect if script src changes
  );
  return [state.loaded, state.error];
}

export const Forecast = () => {
  const [loaded, error] = useScript(
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyD6LXWmuCKyJpkTSxleL7oTRIh1qpFdXWA&libraries=places"
  );
  const [inputValue, setInputValue] = useState("");
  const [city, setCity] = useState("");
  const [citiesListVisible, setCitiesListVisible] = useState(false);
  const [citiesList, setCitiesList] = useState([]);
  const [forecast, setForecast] = useState([]);

  const chooseCity = (e) => {
    setInputValue(e.target.textContent);
    setCity(e.target.textContent);
    setCitiesListVisible(false);
    let cityEncoded = encodeURIComponent(e.target.textContent);
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          cityEncoded +
          "&mode=json&appid=" +
          WeatherAPIKey
      )
      .then(function(response) {
        let forecastObj = {
          Sunday: {
            hours: {},
            icon: "",
          },
          Monday: {
            hours: {},
            icon: "",
          },
          Tuesday: {
            hours: {},
            icon: "",
          },
          Wednesday: {
            hours: {},
            icon: "",
          },
          Thursday: {
            hours: {},
            icon: "",
          },
          Friday: {
            hours: {},
            icon: "",
          },
          Saturday: {
            hours: {},
            icon: "",
          },
        };
        for (let i = 0; i < response.data.list.length; i++) {
          let time = new Date(response.data.list[i].dt * 1000);
          let icon = response.data.list[i].weather[0].icon;
          let temp = Number(response.data.list[i].main.temp) - 273.15;

          switch (time.getDay()) {
            case 0:
              forecastObj["Sunday"]["hours"][time.getHours()] = {
                temp: temp,
              };
              forecastObj["Sunday"]["icon"] = icon;
              break;
            case 1:
              forecastObj["Monday"]["hours"][time.getHours()] = {
                temp: temp,
              };
              forecastObj["Monday"]["icon"] = icon;
              break;
            case 2:
              forecastObj["Tuesday"]["hours"][time.getHours()] = {
                temp: temp,
              };
              forecastObj["Tuesday"]["icon"] = icon;
              break;
            case 3:
              forecastObj["Wednesday"]["hours"][time.getHours()] = {
                temp: temp,
              };
              forecastObj["Wednesday"]["icon"] = icon;
              break;
            case 4:
              forecastObj["Thursday"]["hours"][time.getHours()] = {
                temp: temp,
              };
              forecastObj["Thursday"]["icon"] = icon;
              break;
            case 5:
              forecastObj["Friday"]["hours"][time.getHours()] = {
                temp: temp,
              };
              forecastObj["Friday"]["icon"] = icon;
              break;
            case 6:
              forecastObj["Saturday"]["hours"][time.getHours()] = {
                temp: temp,
              };
              forecastObj["Saturday"]["icon"] = icon;
              break;
            default:
              break;
          }
        }
        let forecastArr = [];
        for (let key in forecastObj) {
          if (Object.entries(forecastObj[key]["hours"]).length === 0) {
            continue;
          }
          let hoursArr = [];
          for (let hour in forecastObj[key]["hours"]) {
            hoursArr.push(
              <div key={hour} className="forecast-card__entry">
                <span className="forecast-card__hour">{hour}:00</span>
                <span className="forecast-card__temperature">
                  {Math.round(forecastObj[key]["hours"][hour]["temp"])}
                  °C
                </span>
              </div>
            );
          }
          forecastArr.push(
            <div key={key} className="forecast-card">
              <p className="forecast-card__day">{key}</p>
              <img
                className="forecast-card__image"
                alt=""
                src={
                  "https://openweathermap.org/img/w/" +
                  forecastObj[key]["icon"] +
                  ".png"
                }
              />
              <div className="forecast-card__entries">{hoursArr}</div>
            </div>
          );
        }
        setForecast(forecastArr);
      });
  };

  const updateInputValue = (e) => {
    setInputValue(e.target.value);
    if (inputValue.length > 3) {
      if (loaded) {
        const options = {
          types: ["(cities)"],
          input: inputValue,
        };

        const service = new window.google.maps.places.AutocompleteService();
        service.getQueryPredictions({ input: inputValue }, (response) => {
          if (response && response.length > 0) {
            setCitiesList(
              response.map((city, index) => (
                <li
                  key={index}
                  onClick={chooseCity}
                  className="weather-app-cities-list__item"
                >
                  {city.description}
                </li>
              ))
            );
            setCitiesListVisible(true);
          } else {
            setCitiesListVisible(false);
          }
        });
      }
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="weather-app"
    >
      <header className="weather-app__header">
        <h1 className="weather-app__title">Weather forecast for</h1>
        <input
          value={city || inputValue}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              setCity("");
            }
          }}
          onChange={(e) => updateInputValue(e)}
          className="weather-app__input"
          type="text"
          placeholder="enter city name"
        />
        <ul
          className={
            "weather-app__cities-list weather-app-cities-list " +
            (citiesListVisible ? "active" : "")
          }
        >
          {citiesList}
        </ul>
      </header>
      <div className="forecast-cards">{forecast}</div>
    </form>
  );
};
