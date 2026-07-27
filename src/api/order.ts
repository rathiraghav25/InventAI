import api from "./api";

export interface Order {
  id: string;
  customer_id: string;
  product_id: string;
  quantity: number;
  total_amount: number;
  status: string;
  order_date: string;
}

export interface CreateOrderRequest {
  customer_id: string;
  product_id: string;
  quantity: number;
}

export interface UpdateOrderRequest {
  status: string;
}

export const getOrders = async () => {
  const response = await api.get("/orders/");
  return response.data;
};

export const getOrder = async (id: string) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const createOrder = async (data: CreateOrderRequest) => {
  const response = await api.post("/orders/", data);
  return response.data;
};

export const updateOrder = async (
  id: string,
  data: UpdateOrderRequest
) => {
  const response = await api.put(`/orders/${id}`, data);
  return response.data;
};

export const deleteOrder = async (id: string) => {
  const response = await api.delete(`/orders/${id}`);
  return response.data;
};