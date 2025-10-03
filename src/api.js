import axios from "axios";

const API = axios.create({
  baseURL: "/api", // uses proxy in package.json
});

export const fetchProducts = () => API.get("/products");
export const addProduct = (product) => API.post("/products", product);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const updateProduct = (id, product) => API.put(`/products/${id}`, product);
