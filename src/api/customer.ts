import api from "./api";

export const getCustomers = async () => {
    const response = await api.get("/customers/");
    return response.data;
};

export const getCustomer = (id: string) =>
    api.get(`/customers/${id}`);

export const createCustomer = (data: any) =>
    api.post("/customers/", data);

export const updateCustomer = (id: string, data: any) =>
    api.put(`/customers/${id}`, data);

export const deleteCustomer = (id: string) =>
    api.delete(`/customers/${id}`);