import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Forecast from "../components/Forecast";

function HomePage() {
  const [forecast, setForecast] = useState(null);
  const [weather, setWeather] = useState(null);
  const color = "#1A4899";
  const [inpSearch, setInpSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

//-----------------------------------------------------------------------------------
  const fetchForecast = (city) => {
    const apiKey = '7ea4fef49e63c77f69aecc239adf4b1b';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}`;

    setIsLoading(true);
    setIsError(false);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("La chiamata non è andata a buon fine");
        }
      })
      .then((data) => {
        // Filtra le previsioni per la giornata odierna
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0); // Imposta l'ora a mezzanotte

        const filteredForecast = data.list.filter(item => {
          const itemDate = new Date(item.dt * 1000);
          return itemDate < midnight;
        });

        setForecast({
          ...data,
          list: filteredForecast,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("ERRORE NEL RECUPERO DATI (internet)?", err);
        setIsLoading(false);
        setIsError(true);
      });
  };

//----------------------------------------------------------------------------------------------
const fetchWeather = (city) => {
    const apiKey = '7ea4fef49e63c77f69aecc239adf4b1b';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;

    setIsLoading(true);
    setIsError(false);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("La chiamata non è andata a buon fine");
        }
      })
      .then((data) => {
        setWeather(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("ERRORE NEL RECUPERO DATI (internet)?", err);
        setIsLoading(false);
        setIsError(true);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (inpSearch.trim()) {
      fetchWeather(inpSearch.trim())
      fetchForecast(inpSearch.trim());
    }
  }

  return (
    <>
    <div className="px-5">
      <form
        className="d-flex justify-content-center mt-4"
        onSubmit={handleSubmit}
      >
        <TextField
          className="w-25"
          id="outlined-basic"
          label="Cerca località"
          variant="outlined"
          onChange={(event) => setInpSearch(event.target.value)}
          value={inpSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button style={{ backgroundColor: color }} type="submit" variant="contained">
          Invia
        </Button>
      </form>

      {isLoading && <p>Caricamento...</p>}
      {isError && <p>Errore nel recupero dei dati</p>}
      {weather && (
        <div>
          <h2>Previsioni Meteo Ora: {weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>Temp: {Math.round(weather.main.temp - 273.15)}°C</p>
          <p>Feels like: {Math.round(weather.main.feels_like - 273.15)}°C</p>
          <p>Min Temp: {Math.round(weather.main.temp_min - 273.15)}°C</p>
          <p>Max Temp: {Math.round(weather.main.temp_max - 273.15)}°C</p>
        </div>
      )}
  {forecast && (
    <Forecast forecast={forecast}/>
      )}
      </div>
    </>
  );
}

export default HomePage;
