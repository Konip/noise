import axios from 'axios';
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import { IUser } from '../models/IUser';
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import { redraw } from '../utils/transition';


export default class UserStore {
    user = {} as IUser;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
        redraw(bool);
    }

    setUser(user: IUser) {
        this.user = user;
    }

    async login(email: string, password: string, toggle: boolean) {
        try {
            const response = await AuthService.login(email, password, toggle);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            return new Promise((resolve, reject) => {
                resolve(response);
            })
        } catch (e: any) {
            let error = e.response?.data?.message;
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user);
            return new Promise((resolve, reject) => {
                resolve(response);
            })
        } catch (e: any) {
            let error = e.response?.data?.message;
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            const { isActivated } = response.data.user;
            if (isActivated) {
                this.setAuth(true);
            }
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async deleteUser(id: string, password: string) {
        try {
            const response = await UserService.deleteUser(id, password);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
            return new Promise((resolve, reject) => {
                resolve(response);
            })
        } catch (e: any) {
            let error = e.response?.data?.message
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    async changeData(email: string, firstName: string, lastName: string, username: string, id: string) {
        try {
            const response = await UserService.changeData(email, firstName, lastName, username, id);
            this.setUser(response.data.user);
            return new Promise((resolve, reject) => {
                resolve(response);
            })
        } catch (e: any) {
            let error = e.response?.data?.message;
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    async changePassword(currentPassword: string, newPassword: string, id: string) {
        try {
            const response = await UserService.changePassword(currentPassword, newPassword, id);
            this.setUser(response.data.user);
            return new Promise((resolve, reject) => {
                resolve(response);
            })
        } catch (e: any) {
            let error = e.response?.data?.message;
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    async resetPassword(email: string) {
        try {
            const response = await UserService.resetPassword(email);
            return new Promise((resolve, reject) => {
                resolve(response);
            })
        } catch (e: any) {
            let error = e.response?.data?.message;
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }
}