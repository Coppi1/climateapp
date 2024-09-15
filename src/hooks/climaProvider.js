// import axios from "axios";
// import express from "express";
// import { Clima } from "../models/Clima.js";

// const app = express();
// app.use(express.json());

// const apiKey = "6eb16bb9d145066ea79ce5157c4a38e9";
// const baseUrl = "https://api.openweathermap.org/data/2.5/forecast/daily";

// const fetchWeatherData = async (lat, lon) => {
//   const url = `${baseUrl}?lat=${lat}&lon=${lon}&cnt=14&appid=${apiKey}&units=metric`;
//   const response = await axios.get(url);
//   return response.data;
// };

// app.post("/save-weather", async (req, res) => {
//   try {
//     const { lat, lon } = req.body;
//     const data = await fetchWeatherData(lat, lon);

//     const weatherPromises = data.list.map(async (day) => {
//       return await Clima.create({
//         dataHora: new Date(day.dt * 1000),
//         temperature: day.temp.day,
//         umidade: day.humidity,
//         clima: day.weather[0].description,
//         aqi: day.weather[0].main,
//         velocidadeVento: day.speed,
//         previsao: true,
//       });
//     });

//     await Promise.all(weatherPromises);

//     res.status(200).send("Dados de clima e previsão salvos com sucesso");
//   } catch (error) {
//     console.error("Erro ao salvar os dados:", error);
//     res.status(500).send("Erro ao salvar os dados");
//   }
// });

// app.get("/get-weather", async (req, res) => {
//   try {
//     const data = await Clima.findAll({
//       where: {
//         previsao: false,
//       },
//     });

//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Erro ao buscar os dados:", error);
//     res.status(500).send("Erro ao buscar os dados");
//   }
// });

// app.listen(3000, () => {
//   console.log("Servidor rodando na porta 3000");
// });
