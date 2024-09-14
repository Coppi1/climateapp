import { Pressable, StyleSheet, Text, View } from "react-native";

export default function LoginButton({ onPress }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B1FF3CFF",
  },
  buttonLabel: {
    color: "#050505",
    fontSize: 20,
  },
});
