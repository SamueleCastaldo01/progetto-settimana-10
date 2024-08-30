import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import Forecast from "../components/Forecast";
import Weather from "../components/Weather";
import DaysWeather from "../components/DaysWeather";

function HomePage() {
  const [forecast, setForecast] = useState(null);
  const [weather, setWeather] = useState(null);
  const [background, setBackground] = useState("background1");
  const [daysWeather, setDaysWeather] = useState(null);
  const color = "#1A4899";
  const [inpSearch, setInpSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getBackgroundForIcon = (icon) => {
    if (icon.includes("d")) {
      // Giorno
      if (icon.startsWith("01")) {
        return "soleggiato"; // Soleggiato
      } else if (
        icon.startsWith("02") ||
        icon.startsWith("03") ||
        icon.startsWith("04")
      ) {
        return "nuvoloso"; // Nuvoloso
      } else if (
        icon.startsWith("09") ||
        icon.startsWith("10") ||
        icon.startsWith("11")
      ) {
        return "temporali"; // Temporali
      }
    } else if (icon.includes("n")) {
      // Notte
      return "notte"; // Notte
    }
    return "background1"; // Default: Nuvoloso
  };

  //-----------------------------------------------------------------------------------
  const fetchForecast = (city) => {
    const apiKey = "7ea4fef49e63c77f69aecc239adf4b1b";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

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
        // Prendi solo i primi 10 elementi della previsione
        const limitedData = {
          ...data,
          list: data.list.slice(0, 10),
        };

        setForecast(limitedData);
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
    const apiKey = "7ea4fef49e63c77f69aecc239adf4b1b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

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
        const icon = data.weather[0].icon;
        const newBackground = getBackgroundForIcon(icon);
        setBackground(newBackground);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("ERRORE NEL RECUPERO DATI (internet)?", err);
        setIsLoading(false);
        setIsError(true);
      });
  };

  //----------------------------------------------------------------------------------------------
  const fetchDays = (city) => {
    const apiKey = "7ea4fef49e63c77f69aecc239adf4b1b";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

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
        // Filtra i dati per ottenere solo le previsioni giornaliere
        const dailyForecast = data.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );
        setDaysWeather(dailyForecast.slice(0, 5)); // Prendi solo i primi 5 giorni
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("ERRORE NEL RECUPERO DATI (internet)?", err);
        setIsLoading(false);
        setIsError(true);
      });
  };

  //-------------------------------------------------
  //submit si attiva quando premo il pulsante di ricerca
  function handleSubmit(e) {
    e.preventDefault();
    if (inpSearch.trim()) {
      fetchWeather(inpSearch.trim());
      fetchForecast(inpSearch.trim());
      fetchDays(inpSearch.trim());
    }
  }

  return (
    <>
      <div className={`d-flex flex-column align-items-center ${background}`}>
        <form
          className="d-flex justify-content-center mt-4 w-100"
          onSubmit={handleSubmit}
        >
          <TextField
            className="inp"
            id="outlined-basic"
            label="Cerca località"
            variant="outlined"
            onChange={(event) => setInpSearch(event.target.value)}
            value={inpSearch}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            style={{ backgroundColor: color }}
            type="submit"
            variant="contained"
          >
            Invia
          </Button>
        </form>

        {isLoading && <CircularProgress />}
        {isError && <p>Errore nel recupero dei dati</p>}
        {weather && <Weather weather={weather} />}
        {forecast && weather && (
          <Forecast forecast={forecast} weather={weather} />
        )}
        {daysWeather && (
          <DaysWeather daysWeather={daysWeather} city={weather.name} />
        )}
      </div>
    </>
  );
}

export default HomePage;
