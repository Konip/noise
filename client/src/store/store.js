import axios from 'axios';
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import AuthService from "../services/AuthService";

export default class Store {
    user = {};
    isAuth = false;
    error

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }
    setError(error) {
        this.error = error;
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            // console.log('store', this.isAuth);
            this.setUser(response.data.user);
            return new Promise((resolve, reject) => {
                resolve(response)
            })
        } catch (e) {
            return new Promise((resolve, reject) => {
                reject(e.response?.data?.message)
            })
        }
    }
    // async login(email, password) {
    //     try {
    //         const response = await AuthService.login(email, password);
    //         console.log(response)
    //         localStorage.setItem('token', response.data.accessToken);
    //         this.setAuth(true);
    //         // console.log('store', this.isAuth);
    //         this.setUser(response.data.user);
    //     } catch (e) {
    //         let error = e.response?.data?.message
    //         console.log(error);
    //         this.setError(error)
    //     }
    // }

    async registration(email, password) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
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
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
}
