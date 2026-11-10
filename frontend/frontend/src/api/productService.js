import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT to API requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getAllProducts = async () => {
  const response = await apiClient.get("/products");
  return response.data;
};

export const getProductById = async (productId) => {
  const response = await apiClient.get(`/products/${productId}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await apiClient.post("/products", product);
  return response.data;
};

export const updateProduct = async (productId, product) => {
  const response = await apiClient.put(`/products/${productId}`, product);
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await apiClient.delete(`/products/${productId}`);
  return response.data;
};
