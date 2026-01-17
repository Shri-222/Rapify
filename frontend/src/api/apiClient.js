
import axios from "axios";

const apiClient = axios.create({
    baseURL : 'https://never-subintegumental-gavyn.ngrok-free.dev',
    withCredentials : true,
})

export default apiClient;