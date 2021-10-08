const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password, toggle } = req.body;
            const userData = await userService.login(email, password, toggle);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const { id, password } = req.body;
            const userData = await userService.delete(id, password);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async changeData(req, res, next) {
        try {
            const { email, firstName, lastName, username, id } = req.body;
            const userData = await userService.changeData(email, firstName, lastName, username, id);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async changePassword(req, res, next) {
        try {
            const { currentPassword, newPassword, id } = req.body;
            const userData = await userService.changePassword(currentPassword, newPassword, id);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { email } = req.body;
            const userData = await userService.resetPassword(email);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async savePlaylist(req, res, next) {
        try {
            const { playlist, id } = req.body;
            const playlistData = await userService.savePlaylist(playlist, id);
            // console.log(playlistData);
            return res.json(playlistData);
        } catch (e) {
            next(e);
        }
    }

    async getPlaylist(req, res, next) {
        try {
            const { id } = req.body;
            const playlistData = await userService.getPlaylist(id);
            // console.log(playlistData);
            return res.json(playlistData);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new UserController();
