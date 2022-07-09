import { AxiosResponse } from 'axios';
import $api from "../http";
import { AuthResponse } from '../models/AuthResponse';
import { API_URL } from './../http/index';

export default class AuthService {
    static async checkAuth() {
        return $api.get(`${API_URL}/refresh`, { withCredentials: true })
    }

    static async login(email: string, password: string, toggle: boolean): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', { email, password, toggle })
    }

    static async registration(email: string, password: string): Promise<AxiosResponse> {
        return $api.post('/registration', { email, password })
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }
}