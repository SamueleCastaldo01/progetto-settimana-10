function Forecast(props) {
  return (
    <>
      <div className="tabForecast rounded-2 pb-2 mt-4 bg-white" style={{ width: "90%" }}>
        <h2>Previsioni Oggi: {props.forecast.city.name}</h2>
        <div className="mt-3 row justify-content-center d-flex fw-bold">
          <div className="col-1">Orario</div>
          <div className="col-2">Descrizione</div>
          <div className="col-2">Temp</div>
          <div className="col-2">Min Temp</div>
          <div className="col-2">Max Temp</div>
          <div className="col-2">Umidità</div>
          <div className="col-1">Vento</div>
        </div>
        <div className="forecastTabInt">
          <div className="row weather-row d-flex justify-content-center align-items-center">
            <div className="col-1">Attuale</div>
            <div className="col-2">
              <img
                className="weather-img"
                src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}.png`}
                alt={props.weather.weather[0].description}
              />
              {props.weather.weather[0].description}
            </div>
            <div className="col-2">
              {Math.round(props.weather.main.temp - 273.15)}°C
            </div>
            <div className="col-2">
              {Math.round(props.weather.main.temp_min - 273.15)}°C
            </div>
            <div className="col-2">
              {Math.round(props.weather.main.temp_max - 273.15)}°C
            </div>
            <div className="col-2">{props.weather.main.humidity}%</div>
            <div className="col-1">{props.weather.wind.speed} m/s</div>
          </div>
          {props.forecast.list.map((item, index) => {
            const time = new Date(item.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div
                className="row weather-row d-flex justify-content-center align-items-center"
                key={index}
              >
                <div className="col-1">{time}</div>
                <div className="col-2">
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                  />
                  {item.weather[0].description}
                </div>
                <div className="col-2">
                  {Math.round(item.main.temp - 273.15)}°C
                </div>
                <div className="col-2">
                  {Math.round(item.main.temp_min - 273.15)}°C
                </div>
                <div className="col-2">
                  {Math.round(item.main.temp_max - 273.15)}°C
                </div>
                <div className="col-2">{item.main.humidity}%</div>
                <div className="col-1">{item.wind.speed} m/s</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Forecast;
