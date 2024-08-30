import moment from "moment";
import "moment/locale/it"; // Importa la localizzazione italiana

function DaysWeather(props) {
  return (
    <>
      <div
        className="text-white tabForecast rounded-2 pb-2 mt-4"
        style={{ width: "90%", backgroundColor: "#1A4899" }}
      >
        <h2>Previsioni per i Prossimi Giorni: {props.city}</h2>
        <div className="row d-flex fw-bold">
          <div className="col-2">Giorno</div>
          <div className="col-2">Descrizione</div>
          <div className="col-2">Temp Min</div>
          <div className="col-2">Temp Max</div>
          <div className="col-2">Umidità</div>
          <div className="col-2">Vento</div>
        </div>
        {props.daysWeather.map((item, index) => {
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
    </>
  );
}
export default DaysWeather;
