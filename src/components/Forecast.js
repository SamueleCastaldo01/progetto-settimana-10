function Forecast(props) {

    return(
        <>
    <div style={{width: "60%"}}>
        <h2>Previsioni Oggi: {props.forecast.city.name}</h2>
        <div className="row d-flex fw-bold mb-3">
          <div className="col-1">Orario</div>
          <div className="col-3">Icona</div>
          <div className="col-1">Temp</div>
          <div className="col-2">Min Temp</div>
          <div className="col-2">Max Temp</div>
          <div className="col-1">Umidità</div>
          <div className="col-2">Vento</div>
        </div>
        <div className="row weather-row d-flex align-items-center">
              <div className="col-1">Attuale</div>
              <div className="col-3">
                <img
                className="weather-img"
                src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}.png`}
                alt={props.weather.weather[0].description}
                />
                {props.weather.weather[0].description}
              </div>
              <div className="col-1">{Math.round(props.weather.main.temp - 273.15)}°C</div>
              <div className="col-2">{Math.round(props.weather.main.feels_like - 273.15)}°C</div>
              <div className="col-2">{Math.round(props.weather.main.temp_min - 273.15)}°C</div>
              <div className="col-1">{props.weather.main.humidity}%</div>
              <div className="col-2">{props.weather.wind.speed} m/s</div>
            </div>
        {props.forecast.list.map((item, index) => {
          const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return (
            <div className="row weather-row d-flex align-items-center" key={index}>
              <div className="col-1">{time}</div>
              <div className="col-3">
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                />
                {item.weather[0].description}
              </div>
              <div className="col-1">{Math.round(item.main.temp - 273.15)}°C</div>
              <div className="col-2">{Math.round(item.main.temp_min - 273.15)}°C</div>
              <div className="col-2">{Math.round(item.main.temp_max - 273.15)}°C</div>
              <div className="col-1">{item.main.humidity}%</div>
              <div className="col-2">{item.wind.speed} m/s</div>
            </div>
          );
        })}

        </div>
        </>
    )
}
export default Forecast;