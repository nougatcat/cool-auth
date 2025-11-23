import { Document } from "@prisma/client"
import { axiosInstance } from "./instance"

export const getMyDocuments = async () => {
    const { data } = await axiosInstance.get<Document>('/doc/my')
    return data;
}