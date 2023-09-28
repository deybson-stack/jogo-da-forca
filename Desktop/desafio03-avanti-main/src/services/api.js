import axios from "axios";

const API_URL = `https://api.themoviedb.org/3/`;

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ENV_API_TOKEN_AUTH}`,
        api_key: import.meta.env.API_KEY
    }
});