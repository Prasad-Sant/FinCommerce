import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createOrder = async (orderRequest) => {
  const response = await apiClient.post("/orders", orderRequest);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await apiClient.get("/orders");
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await apiClient.get(`/orders/${orderId}`);
  return response.data;
};
