import axios from "axios";

const api = axios.create({
  baseURL: "http://atlas.batstate-u.edu.ph:5123", // Replace with your backend URL if needed
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default api;
