import { AxiosResponse } from 'axios';
import $api from "../http";

export default class UserService {
    static async deleteUser(id: string, password: string): Promise<AxiosResponse> {
        return $api.post('/delete', { id, password })
    }

    static async changeData(email: string, firstName: string, lastName: string, username: string, id: string): Promise<AxiosResponse> {
        return $api.post('/change', { email, firstName, lastName, username, id })
    }

    static async changePassword(currentPassword: string, newPassword: string, id: string): Promise<AxiosResponse> {
        return $api.post('/password', { currentPassword, newPassword, id })
    }

    static async resetPassword(email: string): Promise<AxiosResponse> {
        return $api.put('/reset', { email })
    }
}
