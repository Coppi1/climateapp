// import { useEffect, useState } from "react";
// import { Clima } from '../models/Clima.js';

// const useWeatherData = (apiKey, city) => {
//   const [Clima, setClima] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `http://api.airvisual.com/v2/city?city=${city}&key=${apiKey}`
//         );
//         const data = await response.json();

//         const currentWeather = new Clima(
//           data.data.current.weather.tp,
//           data.data.current.weather.ts,
//           data.data.current.weather.hu,
//           data.data.current.weather.ic,
//           data.data.current.weather.ws,
//           data.data.current.pollution.aqius,
//         );

//         setWeatherData(currentWeather);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching weather data:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [apiKey, city]);

//   return { weatherData, loading };
// };
