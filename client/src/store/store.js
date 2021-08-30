import axios from 'axios';
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import AuthService from "../services/AuthService";


const obj = {
    // 'rain': 'https://dl.dropbox.com/s/qkd6429kifawls9/rain_128.mp3?dl=1',
    // 'thunderstorm': 'https://dl.dropbox.com/s/0teabn2n9wz8kf1/thunderstorm_128.mp3?dl=1',
    // 'wind': 'https://dl.dropbox.com/s/mcimqq0wjrr6k6l/wind_128.mp3?dl=1',
    // 'forest': 'https://dl.dropbox.com/s/ys9x65uqyztu8tp/forest_128.mp3?dl=1',
    // 'leaves': 'https://dl.dropbox.com/s/w9j7bbvofc2lpjk/leaves_128.mp3?dl=1',
    // 'waterStream': 'https://dl.dropbox.com/s/kp0gx0fju792d5a/waterStream_128.mp3?dl=1',
    // 'seaside': 'https://dl.dropbox.com/s/2n2vjgyzcpbwp5v/seaside_128.mp3?dl=1',
    // 'water': 'https://dl.dropbox.com/s/z896skrs5j0njq2/water_128.mp3?dl=1',
    // 'bonfire': 'https://dl.dropbox.com/s/h9vf3ugy8r6mx2o/bonfire_128.mp3?dl=1',
    // 'summerNight': 'https://dl.dropbox.com/s/751vndcd009bung/summerNigh_128t.mp3?dl=1',
    // 'coffeeShop': 'https://dl.dropbox.com/s/uh7h19gk1b3yfuy/coffeeShop_128.mp3?dl=1',
    // 'train': 'https://dl.dropbox.com/s/j5jsu7e42vmljns/train_128.mp3?dl=1',
    // 'fan': 'https://dl.dropbox.com/s/z3zb04gd0x6lwem/fan_128.mp3?dl=1'
}


export default class Store {
    user = {};
    isAuth = false;
    sounds;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setSounds(e) {
        this.sounds = e
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
            // this.setAuth(true);
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
            // console.log(response);
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

    async changePassword(currentPassword, newPassword, id) {
        try {
            const response = await AuthService.changePassword(currentPassword, newPassword, id);
            console.log(response);
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

    async resetPassword(email) {
        try {
            console.log('email----', email)
            const response = await AuthService.resetPassword(email);
            // console.log(response);
            // this.setAuth(true);
            // this.setUser(response.data.user);
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
}
