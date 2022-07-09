import { NextFunction, Request, Response } from 'express';
import playlistService from '../service/playlist-service';

class PlaylistController {
    async createPlaylist(req: Request, res: Response, next: NextFunction) {
        try {
            const { playlist, id }: { playlist: any, id: string } = req.body;
            const playlistData = await playlistService.createPlaylist(playlist, id);
            return res.json(playlistData);
        } catch (e) {
            next(e);
        }
    }

    async getPlaylist(req: Request, res: Response, next: NextFunction) {
        try {
            const id: string = req.params.id;
            const playlistData = await playlistService.getPlaylist(id);
            return res.json(playlistData);
        } catch (e) {
            next(e);
        }
    }

    async renamePlaylist(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, currentName, newName }: { id: string, currentName: string, newName: string } = req.body;
            const playlistData = await playlistService.renamePlaylist(id, currentName, newName);
            return res.json(playlistData);
        } catch (e) {
            next(e);
        }
    }

    async deletePlaylist(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name }: { id: string, name: string } = req.body;
            const playlistData = await playlistService.deletePlaylist(id, name);
            return res.json(playlistData);
        } catch (e) {
            next(e);
        }
    }
}

export = new PlaylistController();