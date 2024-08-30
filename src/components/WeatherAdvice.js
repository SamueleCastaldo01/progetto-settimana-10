import React from 'react';

const WeatherAdvice = (props) => {
  const getAdviceForWeather = (weather) => {
    if (!weather || !weather.weather || !weather.weather[0].icon) {
      console.log("Dati meteo non disponibili:", weather);
      return "Controlla le condizioni meteo per i consigli.";
    }

    const icon = weather.weather[0].icon;
    const temp = weather.main.temp - 273.15; // Converti in Celsius
    const humidity = weather.main.humidity;

    console.log("Icona meteo:", icon);
    console.log("Umidità:", humidity);
    console.log("Temperatura:", temp);

    // Soleggiato
    if (icon.startsWith('01')) return "Oggi è una giornata soleggiata, perfetta per uscire e godersi il sole!";
    // Parzialmente nuvoloso
    if (icon.startsWith('02')) return "Giornata parzialmente nuvolosa. Meglio portare con sé un occhiale da sole!";
    // Nuvoloso
    if (icon.startsWith('03') || icon.startsWith('04')) return "Giornata nuvolosa. Potrebbe essere un buon momento per un'attività al chiuso.";
    // Temporali
    if (icon.startsWith('09') || icon.startsWith('10')) return "Possibile pioggia o temporali. Non dimenticare l'ombrello e guida con cautela!";
    // Temporali con fulmini
    if (icon.startsWith('11')) return "Temporali intensi in arrivo. Evita attività all'aperto e cerca riparo!";
    // Neve
    if (icon.startsWith('13')) return "Nevica! Ottimo per gli amanti della neve, ma guida con cautela e copriti bene.";
    // Nebbia
    if (icon.startsWith('50')) return "Nebbia densa. Riduci la velocità e mantieni una distanza di sicurezza maggiore.";
    // Notte serena
    if (icon.startsWith('01n')) return "Notte serena. Perfetto per una passeggiata o semplicemente per rilassarsi.";
    // Notte con nuvole
    if (icon.startsWith('02n') || icon.startsWith('03n') || icon.startsWith('04n')) return "Notte nuvolosa. Ottimo per una serata tranquilla a casa.";
    // Notte con pioggia
    if (icon.startsWith('09n') || icon.startsWith('10n')) return "Pioggia notturna. Assicurati di avere finestre chiuse e preparati a una notte tranquilla.";
    // Notte con temporali
    if (icon.startsWith('11n')) return "Temporali notturni. Cerca un posto sicuro e preparati a rumori forti.";
    // Notte con neve
    if (icon.startsWith('13n')) return "Nevica di notte. Ricorda di rimanere al caldo e controlla le condizioni della strada.";
    // Vento forte
    if (icon.startsWith('50')) return "Vento forte in arrivo. Evita aree esposte e assicurati che oggetti all'aperto siano fissati!";
    // Alta umidità
    if (icon.includes('04') && humidity > 80) return "Alta umidità oggi. Mantieniti idratato e cerca luoghi ben ventilati.";
    // Caldo estremo
    if (temp > 35) return "Caldo estremo oggi. Rimani idratato e cerca ombra il più possibile.";
    // Freddo estremo
    if (temp < 0) return "Freddo estremo. Vestiti a strati e rimani al caldo.";
    // Default
    return "Condizioni meteo variabili. Controlla frequentemente il meteo per aggiornamenti!";
  };

  const advice = getAdviceForWeather(props.weather);

  return (
    <div className="weather-advice px-3 rounded-2" style={{backgroundColor: "white"}}>
      <h2>Consigli per Oggi</h2>
      <p>{advice}</p>
    </div>
  );
};

export default WeatherAdvice;
