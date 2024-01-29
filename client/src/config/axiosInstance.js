import axios from "axios"

// const BASE_URL = "https://ecommerce-backend-production-366f.up.railway.app/api/v1";
const BASE_URL = "https://ecommerce-backend-rztl.onrender.com/";
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.timeout = 10000;
axiosInstance.defaults.withCredentials = true

export default axiosInstance