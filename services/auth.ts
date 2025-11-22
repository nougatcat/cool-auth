import { axiosInstance } from './instance';

interface UserSafe {
    name: string,
    id: number,
    role: 'ADMIN' | 'USER'
}

export const getMe = async () => {
    const { data } = await axiosInstance.get<UserSafe>('/auth/me');

    return data;
};
