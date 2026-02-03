
import axios from "axios";

const api = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
    baseURL : api,
    withCredentials : true,
})

export default apiClient;