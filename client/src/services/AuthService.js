import $api from "../http";

export default class AuthService {
    static async login(email, password, toggle) {
        return $api.post('/login', { email, password, toggle })
    }

    static async registration(email, password) {
        return $api.post('/registration', { email, password })
    }

    static async logout() {
        return $api.post('/logout')
    }

    static async delete(id, password) {
        return $api.post('/delete', { id, password })
    }

    static async changeData(email, firstName, lastName, username, id) {
        return $api.post('/change', { email, firstName, lastName, username, id })
    }

    static async changePassword(currentPassword, newPassword, id) {
        return $api.post('/password', { currentPassword, newPassword, id })
    }
    
    static async resetPassword(email) {
        return $api.post('/reset', { email })
    }

}

