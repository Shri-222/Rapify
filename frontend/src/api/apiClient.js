
import axios from "axios";

// const api = import.meta.env.VITE_BACKEND_URL;
const test = import.meta.env.VITE_TEST_URL;

const apiClient = axios.create({
    baseURL : test,
    withCredentials : true,
})

export default apiClient;