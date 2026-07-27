import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const getProducts = () =>
    API.get("/products/");

export const getProduct = (id: string) =>
    API.get(`/products/${id}`);

export const createProduct = (data: any) =>
    API.post("/products/", data);

export const updateProduct = (id: string, data: any) =>
    API.put(`/products/${id}`, data);

export const deleteProduct = (id: string) =>
    API.delete(`/products/${id}`);