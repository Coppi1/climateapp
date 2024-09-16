import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import WeatherBackground from "../HomeScreen/Background/WheatherBackground";

export default function MenuScreen({ route }) {
  const { weatherData, airQuality } = route.params;
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const apiKey = "6eb16bb9d145066ea79ce5157c4a38e9";
        const { coord } = weatherData;

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coord.lat}&lon=${coord.lon}&cnt=7&appid=${apiKey}&units=metric`
        );
        setForecastData(forecastResponse.data);
      } catch (error) {
        console.error("Error fetching forecast:", error);
      }
      setLoading(false);
    };

    fetchForecast();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <WeatherBackground condition={weatherData.weather[0].main}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.cityName}>{weatherData.name}</Text>
        <Text style={styles.temperature}>
          {Math.round(weatherData.main.temp)}°C
        </Text>
        <Text style={styles.weatherDescription}>
          {weatherData.weather[0].description}
        </Text>
        <Text style={styles.aqiText}>
          Air Quality Index: {airQuality.main.aqi} -{" "}
          {getAQIQuality(airQuality.main.aqi)}
        </Text>

        <Text style={styles.forecastTitle}>7-Day Forecast</Text>
        {forecastData.list.map((day, index) => (
          <View key={index} style={styles.forecastContainer}>
            <Text>{new Date(day.dt * 1000).toLocaleDateString()}</Text>
            <Text>Temp: {day.temp.day}°C</Text>
            <Text>Weather: {day.weather[0].description}</Text>
          </View>
        ))}
      </ScrollView>
    </WeatherBackground>
  );
}

const getAQIQuality = (aqi) => {
  if (aqi === 1) return "Good";
  if (aqi === 2) return "Fair";
  if (aqi === 3) return "Moderate";
  if (aqi === 4) return "Poor";
  if (aqi === 5) return "Very Poor";
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  temperature: {
    fontSize: 60,
    fontWeight: "bold",
    color: "white",
  },
  weatherDescription: {
    fontSize: 20,
    color: "white",
  },
  aqiText: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
  },
  forecastTitle: {
    fontSize: 22,
    color: "white",
    marginTop: 20,
  },
  forecastContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
  },
});
