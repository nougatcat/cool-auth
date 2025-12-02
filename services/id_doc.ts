import { Document } from "@prisma/client"
import { axiosInstance } from "./instance"

export interface DocumentApi extends Document {
    author: {name: string}
}

export const getDocByIdFromUrl = async (id: number): Promise<DocumentApi> => {
    return (await axiosInstance.get<DocumentApi>('/doc/' + id)).data
}

export const updateDocument = async (id: number, title: string, content: string): Promise<Document> => {
    return (await axiosInstance.patch<Document>('/doc/' + id, { title, content})).data
}

export const deleteDocument = async (id: number): Promise<Document> => {
    return (await axiosInstance.delete<Document>('/doc/' + id)).data
}