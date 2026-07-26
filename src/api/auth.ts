import api from "./api";

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const signup = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};