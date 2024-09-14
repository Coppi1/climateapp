import { useForm } from "react-hook-form";
import LoginPage from "../LoginScreen/LoginScreen";

export default function HomeScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    alert(`Email: ${data.email}\nSenha: ${data.senha}`);
  }

  return (
    <LoginPage
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
}
