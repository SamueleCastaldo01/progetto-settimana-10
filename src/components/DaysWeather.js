import moment from "moment";
import "moment/locale/it"; // Importa la localizzazione italiana

function DaysWeather(props) {
  return (
    <>
      <div
        className="text-white tabForecast rounded-2 pb-2 mt-4 px-3"
        style={{backgroundColor: "#1A4899" }}
      >
        <h2>Previsioni per i Prossimi Giorni: {props.city}</h2>
        <div className="row justify-content-between d-flex fw-bold">
          <div className="col-lg-2 col-4">Giorno</div>
          <div className="col-lg-2 col-4">Descrizione</div>
          <div className="col-2 d-md-block d-none">Temp Min</div>
          <div className="col-2 d-md-block d-none">Temp Max</div>
          <div className="col-lg-2 col-4">Umidità</div>
          <div className="col-2 d-lg-block d-none">Vento</div>
        </div>
        {props.daysWeather.map((item, index) => {
          // Usa moment per formattare la data
          const date = moment.unix(item.dt).format("dddd D");
          return (
            <div className="row justify-content-between d-flex align-items-center" key={index}>
              <div className="col-lg-2 col-4">{date}</div>
              <div className="col-lg-2 col-4">
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
              <div className="col-2 d-md-block d-none">
                {Math.round(item.main.temp_min - 273.15)}°C
              </div>
              <div className="col-2 d-md-block d-none">
                {Math.round(item.main.temp_max - 273.15)}°C
              </div>
              <div className="col-lg-2 col-4">{item.main.humidity}%</div>
              <div className="col-2 d-lg-block d-none">{item.wind.speed} m/s</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default DaysWeather;
