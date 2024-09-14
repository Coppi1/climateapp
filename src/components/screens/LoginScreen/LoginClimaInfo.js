import { BlurView } from "expo-blur";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

const apiKeyWeather = "SUA_API_KEY_OPENWEATHERMAP";
const apiKeyAirVisual = "SUA_API_KEY_AIRVISUAL";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherAndAirQuality();
  }, []);

  async function fetchWeatherAndAirQuality() {
    try {
      // Pedir permissão de localização ao usuário
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permissão de localização não concedida.");
        return;
      }

      // Obter localização atual
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Buscar dados do clima (OpenWeatherMap)
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKeyWeather}&lang=pt_br`
      );
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);

      // Buscar dados da qualidade do ar (AirVisual)
      const airQualityResponse = await fetch(
        `https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${apiKeyAirVisual}`
      );
      const airQualityData = await airQualityResponse.json();
      setAirQuality(airQualityData.data.current.pollution);

      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setLoading(false);
    }
  }

  function getBackgroundColor(weatherCondition) {
    switch (weatherCondition) {
      case "Clear":
        return "#FDB813";
      case "Clouds":
        return "#B0C4DE";
      case "Rain":
        return "#A4BCC5";
      case "Snow":
        return "#E3E4E6";
      case "Thunderstorm":
        return "#717D7E";
      default:
        return "#D3D3D3";
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <ImageBackground
          style={[
            styles.background,
            { backgroundColor: getBackgroundColor(weather.weather[0].main) },
          ]}
          source={{ uri: "https://example.com/path/to/your/image.jpg" }} // Troque pela URL da imagem de fundo.
          resizeMode="cover"
        >
          <BlurView intensity={100} style={styles.blurContainer}>
            {weather && airQuality ? (
              <>
                <Text style={styles.city}>{weather.name}</Text>
                <Text
                  style={styles.weatherInfo}
                >{`Temperatura: ${weather.main.temp}°C`}</Text>
                <Text
                  style={styles.weatherInfo}
                >{`Clima: ${weather.weather[0].description}`}</Text>
                <Text
                  style={styles.weatherInfo}
                >{`Qualidade do Ar (AQI): ${airQuality.aqius}`}</Text>
              </>
            ) : (
              <Text style={styles.error}>
                Não foi possível carregar os dados.
              </Text>
            )}
          </BlurView>
        </ImageBackground>
      )}
    </View>
  );
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF",
    },
    background: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    blurContainer: {
      width: "90%",
      padding: 20,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    city: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#fff",
      marginBottom: 10,
    },
    weatherInfo: {
      fontSize: 18,
      color: "#fff",
      marginBottom: 5,
    },
    error: {
      fontSize: 16,
      color: "#ff3333",
    },
  });
}
