import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput } from "react-native";

export default function LoginInputField({
  control,
  name,
  rules,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
  errors,
}) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
            // @ts-ignore
            keyboardType={keyboardType}
          />
        )}
      />
      {errors && <Text style={styles.error}>{errors.message}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
