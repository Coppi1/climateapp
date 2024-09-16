import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import WeatherBackground from "../HomeScreen/Background/WheatherBackground";

const weatherBackgrounds = {
  Clear: require("./assets/clear.png"),
  Clouds: require("./assets/cloudy.png"),
  Rain: require("./assets/rain.png"),
  Thunderstorm: require("./assets/thunderstorm.png"),
  Snow: require("./assets/snow.png"),
  Drizzle: require("./assets/drizzle.png"),
  Mist: require("./assets/mist.png"),
  Default: require("./assets/default.png"),
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherAndAirQuality = async () => {
      try {
        const apiKey = "6eb16bb9d145066ea79ce5157c4a38e9";
        const city = "Shenzhen";

        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const weatherCondition = weatherResponse.data.weather[0].main;
        setWeatherData(weatherResponse.data);

        if (weatherBackgrounds[weatherCondition]) {
          setBackgroundImage(weatherBackgrounds[weatherCondition]);
        } else {
          setBackgroundImage(weatherBackgrounds.Default);
        }

        const { coord } = weatherResponse.data;
        const airQualityResponse = await axios.get(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`
        );
        setAirQuality(airQualityResponse.data.list[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchWeatherAndAirQuality();
  }, []);

  const handleLogin = () => {
    navigation.navigate("WeatherScreen", { weatherData, airQuality });
  };

  const getAQIQuality = (aqi) => {
    if (aqi === 1) return "Good";
    if (aqi === 2) return "Fair";
    if (aqi === 3) return "Moderate";
    if (aqi === 4) return "Poor";
    if (aqi === 5) return "Very Poor";
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <WeatherBackground weatherCondition={weatherData.weather[0].main}>
      <View style={styles.container}>
        <Text style={styles.weatherText}>
          Current Temperature: {Math.round(weatherData.main.temp)}°C
        </Text>
        <Text style={styles.weatherText}>
          Weather: {weatherData.weather[0].description}
        </Text>
        <Text style={styles.weatherText}>
          AQI: {airQuality.main.aqi} - {getAQIQuality(airQuality.main.aqi)}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Accounts"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Log In" onPress={handleLogin} color="#4A90E2" />
      </View>
    </WeatherBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    width: "80%",
  },
  weatherText: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
});
