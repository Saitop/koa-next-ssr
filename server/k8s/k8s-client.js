const axios = require("axios");

const K_URL = process.env.K_URL || "someport";

const k8sClient = axios.create({
  baseURL: K_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

module.exports = k8sClient;
