import axios from "axios";

const BASE_URL = "https://6661e83963e6a0189fec102f.mockapi.io/api/v1/";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export default apiClient;
