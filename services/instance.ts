import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

//? папка services используется для работы с axios и типизаций для запросов