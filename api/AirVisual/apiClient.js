import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://example.com/api", // Substitua pelo URL da API real
  timeout: 1000,
});

export default apiClient;
