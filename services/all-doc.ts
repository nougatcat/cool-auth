import { Document } from "@prisma/client"
import { axiosInstance } from "./instance"

export interface DocumentApi extends Document {
    author: {name: string}
}

export const getAllDocuments = async () => {
    const { data } = await axiosInstance.get<DocumentApi>('/doc')
    return data;
}