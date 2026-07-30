import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface AIChatRequest {
  message: string;
}

export interface AIChatResponse {
  response: string;
}

export const sendMessage = async (
  message: string
): Promise<AIChatResponse> => {
  const { data } = await api.post<AIChatResponse>(
    "/ai/chat",
    {
      message,
    }
  );

  return data;
};

export default api;