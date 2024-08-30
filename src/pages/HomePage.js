import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import Forecast from "../components/Forecast";
import Weather from "../components/Weather";
import moment from "moment";
import "moment/locale/it"; // Importa la localizzazione italiana

function HomePage() {
  const [forecast, setForecast] = useState(null);
  const [weather, setWeather] = useState(null);
  const [daysWeather, setDaysWeather] = useState(null);
  const color = "#1A4899";
  const [inpSearch, setInpSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
        // Filtra le previsioni per la giornata odierna
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0); // Imposta l'ora a mezzanotte

        const filteredForecast = data.list.filter((item) => {
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
      <div className="px-5 d-flex flex-column align-items-center">
        <form
          className="d-flex justify-content-center mt-4 w-100"
          onSubmit={handleSubmit}
        >
          <TextField
            className="w-25"
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
          <div
            className="text-white tabForecast rounded-2 pb-2 mt-4"
            style={{ width: "90%", backgroundColor: "#1A4899" }}
          >
            <h2>Previsioni per i Prossimi Giorni</h2>
            <div className="row d-flex fw-bold">
              <div className="col-2">Giorno</div>
              <div className="col-2">Descrizione</div>
              <div className="col-2">Temp Min</div>
              <div className="col-2">Temp Max</div>
              <div className="col-2">Umidità</div>
              <div className="col-2">Vento</div>
            </div>
            {daysWeather.map((item, index) => {
              // Usa moment per formattare la data
              const date = moment.unix(item.dt).format("dddd D");
              return (
                <div className="row d-flex align-items-center" key={index}>
                  <div className="col-2">{date}</div>
                  <div className="col-2">
                    <div className="row d-flex align-items-center">
                      <div className="col-6 pe-0 text-end">
                        <img
                          src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                          alt={item.weather[0].description}
                          className="weather-img"
                        />
                      </div>
                      <div className="col-6 ps-0 text-start">
                        {item.weather[0].description}
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    {Math.round(item.main.temp_min - 273.15)}°C
                  </div>
                  <div className="col-2">
                    {Math.round(item.main.temp_max - 273.15)}°C
                  </div>
                  <div className="col-2">{item.main.humidity}%</div>
                  <div className="col-2">{item.wind.speed} m/s</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;
