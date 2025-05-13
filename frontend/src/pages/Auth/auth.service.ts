import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UpdateProfileDto {
  name?: string;
  email?: string;
  password?: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
}

export interface ApiError {
  errorCode: string;
  message: string;
  details?: { field: string; value: string };
}

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      Cookies.get("token") || localStorage.getItem("token") || ""
    }`,
  },
});

export const postData = async <T, D>(url: string, data: D): Promise<T> => {
  try {
    const response = await api.post<T>(url, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data as ApiError;
    }
    throw { errorCode: "NETWORK_ERROR", message: "Network error occurred" };
  }
};

export const getData = async <T>(url: string): Promise<T> => {
  try {
    const response = await api.get<T>(url);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data as ApiError;
    }
    throw { errorCode: "NETWORK_ERROR", message: "Network error occurred" };
  }
};

export const patchData = async <T, D>(url: string, data: D): Promise<T> => {
  try {
    const response = await api.patch<T>(url, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data as ApiError;
    }
    throw { errorCode: "NETWORK_ERROR", message: "Network error occurred" };
  }
};

export const authService = {
  register: async (data: RegisterDto) =>
    postData<AuthResponse, RegisterDto>("/auth/register", data),

  login: async (data: LoginDto) =>
    postData<AuthResponse, LoginDto>("/auth/login", data),

  logout: () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    window.location.href = "/login";
  },

  getUserProfile: async () => getData<UserProfile>("/users/me"),

  editUserProfile: async (data: UpdateProfileDto) =>
    patchData<UserProfile, UpdateProfileDto>("/users/me", data),
};
