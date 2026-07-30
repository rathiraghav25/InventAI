import api from "./api";

export interface Invoice {
    id: string;
    order_id: string;
    customer_id: string;
    total_amount: number;
    payment_status: string;
    invoice_date: string;
}

export interface CreateInvoiceRequest {
    order_id: string;
    customer_id: string;
    total_amount: number;
}

export interface UpdateInvoiceRequest {
    payment_status: string;
}

export const getInvoices = async (): Promise<Invoice[]> => {
    const response = await api.get("/invoices/");
    return response.data;
};

export const getInvoice = async (id: string): Promise<Invoice> => {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
};

export const createInvoice = async (
    data: CreateInvoiceRequest
): Promise<Invoice> => {
    const response = await api.post("/invoices/", data);
    return response.data;
};

export const updateInvoice = async (
    id: string,
    data: UpdateInvoiceRequest
): Promise<Invoice> => {
    const response = await api.put(`/invoices/${id}`, data);
    return response.data;
};

export const deleteInvoice = async (id: string) => {
    await api.delete(`/invoices/${id}`);
};