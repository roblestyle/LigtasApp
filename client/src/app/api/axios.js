import axios from "axios";

const api = axios.create({
  baseURL: "https://steerhub.batstateu.edu.ph/ligtas-app-backend", // Replace with your backend URL if needed
  // baseURL: "http://localhost:5000", // Replace with your backend URL if needed
  timeout: 30000, // Increased timeout to 30 seconds
  headers: { "Content-Type": "application/json" },
});

export default api;
