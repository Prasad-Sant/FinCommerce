import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllProducts = async () => {
  const response = await apiClient.get("/products");
  return response.data;
};
export const getProductById = async (productId) => {
  const response = await apiClient.get(`/products/${productId}`);
  return response.data;
};
