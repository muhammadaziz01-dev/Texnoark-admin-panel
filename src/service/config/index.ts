import axios  from 'axios';
import type { AxiosInstance } from 'axios';

export const request : AxiosInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 48000,
})

