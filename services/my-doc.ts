import { Document } from "@prisma/client"
import { axiosInstance } from "./instance"

export const getMyDocuments = async () => {
    const { data } = await axiosInstance.get<Document>('/doc/my')
    return data;
}

export const updateDocumentPerms = async (id_doc: number, adminPerms: string, userPerms: string): Promise<Document> => {
    return (await axiosInstance.patch<Document>('/doc/my', { id_doc, adminPerms, userPerms})).data
}