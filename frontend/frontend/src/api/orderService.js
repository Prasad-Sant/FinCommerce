import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const createOrder = async (orderRequest) => {
  const response = await apiClient.post("/orders", orderRequest);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await apiClient.get("/orders/my-orders");
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await apiClient.get(`/orders/${orderId}`);
  return response.data;
};
