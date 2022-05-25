import { axios } from "@/utils/axios";
import { UserResponse } from './types';

export type LoginCredentialsDTO = {
    email: string;
    password: string;
};

export const loginWidthEmailAndPassword = (data: LoginCredentialsDTO): Promise<UserResponse> => {
    return axios.post('/auth/login', data);
}
