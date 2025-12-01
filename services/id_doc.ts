import { Document } from "@prisma/client"
import { axiosInstance } from "./instance"

export interface DocumentApi extends Document {
    author: {name: string}
}

export const getDocByIdFromUrl = async (id: number): Promise<DocumentApi> => {
    return (await axiosInstance.get<DocumentApi>('/doc/' + id)).data
}
