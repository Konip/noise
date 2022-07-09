import PlaylistService from "../services/PlaylistService";

interface IPlaylist {
    [key: string]: {
        [key: string]: number
    }
}

export default class PlaylistStore{
    playlist = {};

    setPlaylist(playlist: object) {
        this.playlist = playlist;
    }

    async savePlaylist(playlist: object, id: string): Promise<IPlaylist> {
        try {
            const response = await PlaylistService.createPlaylist(playlist, id);
            this.setPlaylist(response.data.playlist);
            return new Promise((resolve, reject) => {
                resolve(response.data.playlist);
            })
        } catch (e: any) {
            let error = e.response?.data?.message;
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    async getPlaylist(id: string) {
        try {
            const response = await PlaylistService.getPlaylist(id);
            this.setPlaylist(response.data.playlist);
            return new Promise((resolve, reject) => {
                resolve(response.data);
            })
        } catch (e: any) {
            let error = e.response?.data?.message;
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    async renamePlaylist(id: string, currentName: string, newName: string) {
        try {
            const response = await PlaylistService.renamePlaylist(id, currentName, newName);
            this.setPlaylist(response.data);
            return new Promise((resolve, reject) => {
                resolve(response.data);
            })
        } catch (e: any) {
            let error = e.response?.data?.message;
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    async deletePlaylist(id: string, name: string) {
        try {
            const response = await PlaylistService.deletePlaylist(id, name);
            this.setPlaylist(response.data);
            return new Promise((resolve, reject) => {
                resolve(response.status);
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