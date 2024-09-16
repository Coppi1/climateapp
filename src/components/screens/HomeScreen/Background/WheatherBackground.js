import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const weatherBackgrounds = {
  Clear: require("../assets/clear.png"),
  Clouds: require("../assets/cloudy.png"),
  Rain: require("../assets/rain.png"),
  Thunderstorm: require("../assets/thunderstorm.png"),
  Snow: require("../assets/snow.png"),
  Drizzle: require("../assets/drizzle.png"),
  Mist: require("../assets/mist.png"),
  Default: require("../assets/default.png"),
};

const WeatherBackground = ({ weatherCondition, children }) => {
  const backgroundImage =
    weatherBackgrounds[weatherCondition] || weatherBackgrounds.Default;

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default WeatherBackground;
