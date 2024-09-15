import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const apiKey = "6eb16bb9d145066ea79ce5157c4a38e9";
  const baseUrl = "https://api.openweathermap.org/data/2.5/forecast/daily";

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            setLoading(false);

            try {
              const url = `${baseUrl}?lat=${latitude}&lon=${longitude}&cnt=7&appid=${apiKey}&units=metric`;
              const weatherResponse = await axios.get(url);

              if (
                weatherResponse.data &&
                Array.isArray(weatherResponse.data.list)
              ) {
                setWeatherData(weatherResponse.data.list);
              } else {
                console.error(
                  "Formato de dados inesperado:",
                  weatherResponse.data
                );
              }
            } catch (error) {
              console.error("Erro ao buscar clima:", error);
            }
          },
          (error) => {
            console.error("Erro ao obter a localização:", error);
            setLoading(false);
          }
        );
      } else {
        console.error("Geolocalização não suportada pelo navegador");
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const handleLogin = () => {
    console.log(`Email: ${email}, Senha: ${password}`);
    setShowLoginModal(false);
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      {weatherData.length > 0 ? (
        weatherData.map((data, index) => (
          <View key={index} style={styles.weatherContainer}>
            <Text>Data: {new Date(data.dt * 1000).toLocaleDateString()}</Text>
            <Text>Temperatura: {data.temp.day} °C</Text>
            <Text>Clima: {data.weather[0].description}</Text>
            <Text>Umidade: {data.humidity} %</Text>
            <Text>Velocidade do Vento: {data.speed} km/h</Text>
          </View>
        ))
      ) : (
        <Text>Carregando dados de clima...</Text>
      )}

      <Button title="Efetuar Login" onPress={() => setShowLoginModal(true)} />

      <Modal
        visible={showLoginModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLoginModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button
              title="Cancelar"
              onPress={() => setShowLoginModal(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  weatherContainer: {
    marginBottom: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
});
