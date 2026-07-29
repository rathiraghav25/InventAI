import axios from "axios";

export interface ProductRequest {
    name: string;
    sku: string;
    category: string;
    description: string;
    purchase_price: number;
    selling_price: number;
    stock_quantity: number;
    reorder_threshold: number;
}

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const getProducts = async () => {
    const response = await API.get("/products/");
    return response.data;
};

export const getProduct = (id: string) =>
    API.get(`/products/${id}`);

export const createProduct = (data: any) =>
    API.post("/products/", data);

export const updateProduct = (
    id: string,
    data: Partial<ProductRequest>
) =>
    API.put(`/products/${id}`, data);

export const deleteProduct = (id: string) =>
    API.delete(`/products/${id}`);