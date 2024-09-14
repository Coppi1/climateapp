import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginButton from "./LoginButton";
import LoginInputField from "./LoginInputField";
import RegisterButton from "./LoginRegisterButton";

export default function LoginPage({ control, handleSubmit, onSubmit, errors }) {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //..
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça login ou cadastre-se no ClimateAPP</Text>

      <Text style={styles.label}>Email</Text>
      <LoginInputField
        control={control}
        name="email"
        rules={{ required: "Email é obrigatório" }}
        placeholder="Digite seu email"
        keyboardType="email-address"
        errors={errors.email}
        secureTextEntry={undefined}
      />

      <Text style={styles.label}>Senha</Text>
      <LoginInputField
        control={control}
        name="senha"
        rules={{ required: "Senha é obrigatória" }}
        placeholder="Digite sua senha"
        secureTextEntry
        errors={errors.senha}
      />

      <LoginButton onPress={handleSubmit(onSubmit)} />

      <RegisterButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  weatherContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  city: {
    fontSize: 20,
    fontWeight: "bold",
  },
  weatherInfo: {
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});
