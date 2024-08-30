function Weather(props) {
  return (
    <>
      <div
        className="text-white rounded-3 row w-25 d-flex align-items-center"
        style={{ backgroundColor: "#1A4899" }}
      >
        <div className="col-4">
          <img
            className="weather-img"
            src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}.png`}
            alt={props.weather.weather[0].description}
          />
        </div>
        <div className="col-4">{props.weather.name}</div>
        <div className="col-4">{Math.round(props.weather.main.temp - 273.15)}°C</div>
      </div>
    </>
  );
}
export default Weather;
