import api from "./api";

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

export const getProducts = async () => {
    const response = await api.get("/products/");
    return response.data;
};

export const getProduct = (id: string) =>
    api.get(`/products/${id}`);

export const createProduct = (data: any) =>
    api.post("/products/", data);

export const updateProduct = (
    id: string,
    data: Partial<ProductRequest>
) =>
    api.put(`/products/${id}`, data);

export const deleteProduct = (id: string) =>
    api.delete(`/products/${id}`);