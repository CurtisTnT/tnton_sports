import axios from "axios";

const BASE_URL1 = "https://6661e83963e6a0189fec102f.mockapi.io/api/v1/";
const BASE_URL2 = "https://66703f570900b5f87249ee42.mockapi.io/api/v1/";

const apiClient1 = axios.create({
  baseURL: BASE_URL1,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiClient2 = axios.create({
  baseURL: BASE_URL2,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiClient1, apiClient2 };
