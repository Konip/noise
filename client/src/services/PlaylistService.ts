import { AxiosResponse } from 'axios';
import $api from "../http";

export default class PlaylistService {
    static async createPlaylist(playlist: object, id: string): Promise<AxiosResponse> {
        return $api.post('/favourite/create', { playlist, id })
    }

    static async getPlaylist(id: string): Promise<AxiosResponse> {
        return $api.get('/favourite/' + id)
    }

    static async renamePlaylist(id: string, currentName: string, newName: string): Promise<AxiosResponse> {
        return $api.post('/favourite/rename', { id, currentName, newName })
    }
    // static async renamePlaylist(id: string, currentName: string, newName: string): Promise<AxiosResponse> {
    //     return $api.patch('/rename', { id, currentName, newName })
    // }

    static async deletePlaylist(id: string, name: string): Promise<AxiosResponse> {
        return $api.post('/favourite/delete', { id, name })
    }
}