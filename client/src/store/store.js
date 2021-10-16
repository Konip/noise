import axios from 'axios';
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import AuthService from "../services/AuthService";
import { redraw } from '../utils/transition';

export default class Store {
    user = {};
    playlist = {};
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
        redraw(bool)
    }

    setUser(user) {
        this.user = user;
    }

    setPlaylist(playlist) {
        this.playlist = playlist;
    }

    async login(email, password, toggle) {
        try {
            const response = await AuthService.login(email, password, toggle);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            return new Promise((resolve, reject) => {
                resolve(response)
            })
        } catch (e) {
            let error = e.response?.data?.message
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
    }

    async registration(email, password) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user);
            return new Promise((resolve, reject) => {
                resolve(response)
            })
        } catch (e) {
            let error = e.response?.data?.message
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            const { isActivated } = response.data.user
            if (isActivated) {
                this.setAuth(true);
            }
            this.setUser(response.data.user);
        } catch (e) {
            // console.log(e.response?.data?.message);
        }
    }

    async delete(id, password) {
        try {
            const response = await AuthService.delete(id, password);
            await AuthService.logout();
            console.log(response);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser(response);
            return new Promise((resolve, reject) => {
                resolve(response)
            })
        } catch (e) {
            let error = e.response?.data?.message
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
    }

    async changeData(email, firstName, lastName, username, id) {
        try {
            const response = await AuthService.changeData(email, firstName, lastName, username, id);
            console.log(response);
            this.setUser(response.data.user);
            return new Promise((resolve, reject) => {
                resolve(response)
            })
        } catch (e) {
            let error = e.response?.data?.message
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
    }

    async changePassword(currentPassword, newPassword, id) {
        try {
            const response = await AuthService.changePassword(currentPassword, newPassword, id);
            console.log(response);
            this.setUser(response.data.user);
            return new Promise((resolve, reject) => {
                resolve(response)
            })
        } catch (e) {
            let error = e.response?.data?.message
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
    }

    async resetPassword(email) {
        try {
            console.log('email----', email)
            const response = await AuthService.resetPassword(email);
            return new Promise((resolve, reject) => {
                resolve(response)
            })
        } catch (e) {
            let error = e.response?.data?.message
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
    }

    async savePlaylist(playlist, id) {
        try {
            const response = await AuthService.savePlaylist(playlist, id);
            console.log(response.data);
            this.setPlaylist(response.data.playlist)
            return new Promise((resolve, reject) => {
                resolve(response.data.playlist)
            })
        } catch (e) {
            let error = e.response?.data?.message
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
    }

    async getPlaylist(id) {
        try {
            const response = await AuthService.getPlaylist(id);
            console.log(response.data);
            this.setPlaylist(response.data.playlist)
            return new Promise((resolve, reject) => {
                resolve(response.data)
            })
        } catch (e) {
            let error = e.response?.data?.message
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
    }

    async changeNamePlaylist(id, currentName, newName) {
        try {
            const response = await AuthService.changeNamePlaylist(id, currentName, newName);
            console.log(response);
            this.setPlaylist(response.data)
            return new Promise((resolve, reject) => {
                resolve(response.data)
            })
        } catch (e) {
            let error = e.response?.data?.message
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
    }

    async deletePlaylist(id, name) {
        try {
            const response = await AuthService.deletePlaylist(id, name);
            console.log(response);
            this.setPlaylist(response.data)
            return new Promise((resolve, reject) => {
                resolve(response.status)
            })
        } catch (e) {
            let error = e.response?.data?.message
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
    }
}
