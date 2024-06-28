import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // Replace with your backend URL if needed
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export default instance;
