import $api from "../http";

export default class AuthService {
    static async login(email, password) {
        return $api.post('/login', { email, password })
    }

    static async registration(email, password) {
        return $api.post('/registration', { email, password })
    }

    static async logout() {
        return $api.post('/logout')
    }

    static async delete(email) {
        return $api.post('/delete', { email })
    }
    static async changeData(email, firstName, lastName, username) {
        return $api.post('/change', { email, firstName, lastName, username, id })
    }
}

