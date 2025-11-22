import { axiosInstance } from './instance';

interface UserNames {
    name: string,
    id: number
}

export const getUsers = async () => {
    const { data } = await axiosInstance.get<UserNames>('/users');

    return data;
};


// ! возможно, мне вообще нигде не нужно будет получать список пользователей, поэтому это и api/users можно будет удалить