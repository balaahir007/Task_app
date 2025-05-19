// src/zustand/authStore.js
import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,

  registerUser: async (formData) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      localStorage.setItem("user", JSON.stringify(response.data));
      set({ user: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ isLoading: false });
      throw new Error(error?.response?.data?.message || "Registration failed.");
    }
  },

  loginUser: async (formData) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      localStorage.setItem("user", JSON.stringify(response.data));
      set({ user: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ isLoading: false });
      throw new Error(error?.response?.data?.message || "Login failed.");
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/auth/check-auth");
      localStorage.setItem("user", JSON.stringify(response.data));
      set({ user: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        set({ user: JSON.parse(storedUser), isLoading: false });
        return JSON.parse(storedUser);
      }
      set({ user: null, isLoading: false });
      return null;
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      set({ user: null });
      localStorage.removeItem("user"); // Optional if you're using it
      window.location.href = "/login"; // ✅ Force reload after logout
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "An error occurred during logout.";
      throw new Error(message);
    }
  },
}));

export default useAuthStore;
