import React from "react";
import "./App.css";
const axios = require("axios");
const citiesAPIUrl =
  "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=";
const CitiesAPIKey = "1dedf7be31mshb303f15044e564bp16f812jsn338599e4d210";
const WeatherAPIKey = "12975cb5d84452a454240c06140fbbc9";
class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      city: "",
      citiesListVisible: false,
      citiesList: [],
      forecast: [],
    };
  }
  removeCity = () => {
    this.setState({
      city: "",
    });
  };
  chooseCity = (e) => {
    this.setState(
      {
        inputValue: e.target.textContent,
        city: e.target.textContent,
        citiesListVisible: false,
      },
      () => {
        let that = this;
        let cityEncoded = encodeURIComponent(this.state.city.trim());
        axios
          .get(
            "http://api.openweathermap.org/data/2.5/forecast?q=" +
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
                      "http://openweathermap.org/img/w/" +
                      forecastObj[key]["icon"] +
                      ".png"
                    }
                  />
                  <div className="forecast-card__entries">{hoursArr}</div>
                </div>
              );
            }
            that.setState({
              forecast: forecastArr,
            });
          });
      }
    );
  };
  updateInputValue = (e) => {
    this.setState(
      {
        inputValue: e.target.value,
      },
      () => {
        if (this.state.inputValue.length > 3) {
          let that = this;
          fetch(
            "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=" +
              this.state.inputValue,
            {
              method: "GET",
              headers: {
                "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
                "x-rapidapi-key":
                  "f202dd4a8amshb8b0d1941d03711p164c3ejsn9de325b5ae5d",
              },
            }
          ).then((response) => {
            console.log(response);
            if (response.data.data.length > 0) {
              that.setState({
                citiesList: response.data.data.map((city, index) => (
                  <li
                    key={index}
                    onClick={that.chooseCity}
                    className="weather-app-cities-list__item"
                  >
                    {city.name + ", " + city.country}
                  </li>
                )),
                citiesListVisible: true,
              });
            }
          });
        } else {
          this.setState({
            citiesListVisible: false,
          });
        }
      }
    );
  };

  render() {
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
            value={this.state.city || this.state.inputValue}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                this.removeCity();
              }
            }}
            onChange={(e) => this.updateInputValue(e, e.key)}
            className="weather-app__input"
            type="text"
            placeholder="enter city name"
          />
          <ul
            className={
              "weather-app__cities-list weather-app-cities-list " +
              (this.state.citiesListVisible ? "active" : "")
            }
          >
            {this.state.citiesList}
          </ul>
        </header>
        <div className="forecast-cards">{this.state.forecast}</div>
      </form>
    );
  }
}

export default Forecast;
