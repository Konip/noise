import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error';
import userService from '../service/user-service';

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { email, password }: { email: string, password: string } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken,
                { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, toggle }:
                { email: string, password: string, toggle: boolean } = req.body;
            const userData = await userService.login(email, password, toggle);
            res.cookie('refreshToken', userData.refreshToken,
                { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken }: { refreshToken: string } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink: string = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL!);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken }: { refreshToken: string } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken,
                { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, password }: { id: string, password: string } = req.body;
            const { refreshToken }: { refreshToken: string } = req.cookies;
            const userData = await userService.delete(id, password, refreshToken);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async changeData(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, firstName, lastName, username, id }:
                { email: string, firstName: string, lastName: string, username: string, id: string } = req.body;
            const userData = await userService.changeData(email, firstName, lastName, username, id);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { currentPassword, newPassword, id }:
                { currentPassword: string, newPassword: string, id: string } = req.body;
            const userData = await userService.changePassword(currentPassword, newPassword, id);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email }: { email: string } = req.body;
            const userData = await userService.resetPassword(email);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async savePlaylist(req: Request, res: Response, next: NextFunction) {
        try {
            const { playlist, id }: { playlist: any, id: string } = req.body;
            const playlistData = await userService.savePlaylist(playlist, id);
            return res.json(playlistData);
        } catch (e) {
            next(e);
        }
    }

    async getPlaylist(req: Request, res: Response, next: NextFunction) {
        try {
            const { id }: { id: string } = req.body;
            const playlistData = await userService.getPlaylist(id);
            return res.json(playlistData);
        } catch (e) {
            next(e);
        }
    }

    async changeNamePlaylist(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, currentName, newName }: { id: string, currentName: string, newName: string } = req.body;
            const playlistData = await userService.changeNamePlaylist(id, currentName, newName);
            return res.json(playlistData);
        } catch (e) {
            next(e);
        }
    }

    async deletePlaylist(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name }: { id: string, name: string } = req.body;
            const playlistData = await userService.deletePlaylist(id, name);
            return res.json(playlistData);
        } catch (e) {
            next(e);
        }
    }
}


export = new UserController();
