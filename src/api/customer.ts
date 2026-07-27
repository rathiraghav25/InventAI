import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const getCustomers = () =>
    API.get("/customers/");

export const getCustomer = (id: string) =>
    API.get(`/customers/${id}`);

export const createCustomer = (data: any) =>
    API.post("/customers/", data);

export const updateCustomer = (id: string, data: any) =>
    API.put(`/customers/${id}`, data);

export const deleteCustomer = (id: string) =>
    API.delete(`/customers/${id}`);