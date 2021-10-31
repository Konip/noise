import { AxiosResponse } from 'axios';
import $api from "../http";

export default class AuthService {
    static async delete(id: string, password: string): Promise<AxiosResponse> {
        return $api.post('/delete', { id, password })
    }

    static async changeData(email: string, firstName: string, lastName: string, username: string, id: string): Promise<AxiosResponse> {
        return $api.post('/change', { email, firstName, lastName, username, id })
    }

    static async changePassword(currentPassword: string, newPassword: string, id: string): Promise<AxiosResponse> {
        return $api.post('/password', { currentPassword, newPassword, id })
    }

    static async resetPassword(email: string): Promise<AxiosResponse> {
        return $api.post('/reset', { email })
    }

    static async savePlaylist(playlist: object, id: string): Promise<AxiosResponse> {
        return $api.post('/set', { playlist, id })
    }

    static async getPlaylist(id: string): Promise<AxiosResponse> {
        return $api.post('/get', { id })
    }

    static async changeNamePlaylist(id: string, currentName: string, newName: string): Promise<AxiosResponse> {
        return $api.post('/name', { id, currentName, newName })
    }

    static async deletePlaylist(id: string, name: string): Promise<AxiosResponse> {
        return $api.post('/delPlaylist', { id, name })
    }
}
