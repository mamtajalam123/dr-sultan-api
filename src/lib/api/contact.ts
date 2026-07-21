import axios from "axios";
import { Contact } from "@/types/contact";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

// ==========================================
// Axios Instance
// ==========================================

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================
// Attach JWT Token
// ==========================================

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// ==========================================
// Contact API
// ==========================================

export const contactAPI = {
  // ==========================
  // Public Contact Form
  // POST /api/contact
  // ==========================
  create: async (data: Contact) => {
    const response = await api.post(
      "/contact",
      data
    );

    return response.data;
  },

  // ==========================
  // GET ALL CONTACTS
  // ==========================
  getAll: async () => {
    const response = await api.get(
      "/contact"
    );

    return response.data;
  },

  // ==========================
  // GET CONTACT BY ID
  // ==========================
  getById: async (
    id: number
  ) => {
    const response = await api.get(
      `/contact/${id}`
    );

    return response.data;
  },

  // ==========================
  // UPDATE CONTACT
  // ==========================
  update: async (
    id: number,
    data: Contact
  ) => {
    const response = await api.put(
      `/contact/${id}`,
      data
    );

    return response.data;
  },

  // ==========================
  // UPDATE STATUS
  // ==========================
  updateStatus: async (
    id: number,
    status: "New" | "Replied" | "Archived"
  ) => {
    const response = await api.patch(
      `/contact/${id}/status`,
      {
        status,
      }
    );

    return response.data;
  },

  // ==========================
  // DELETE CONTACT
  // ==========================
  remove: async (
    id: number
  ) => {
    const response = await api.delete(
      `/contact/${id}`
    );

    return response.data;
  },
};

export default contactAPI;