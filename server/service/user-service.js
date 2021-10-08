const UserModel = require('../models/user-models');
const PlaylistModel = require('../models/playlist-models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email })
        if (candidate) {
            console.log(`Пользователь с почтовым адресом ${email} уже существует`)
            throw ApiError.BadRequest(`This email already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf
        let count = await UserModel.count();
        const number = count++
        const username = `noise${number}`

        const user = await UserModel.create({ email, password: hashPassword, activationLink, number, username })
        await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);

        const userDto = new UserDto(user); // id, email, isActivated,username,number
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password, toggle) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            console.log('Пользователь с таким email не найден');
            throw ApiError.BadRequest('Oops, wrong email or password');
        }
        const confirmed = await UserModel.findOne({ email })
        if (!confirmed.isActivated) {
            console.log('Электронный адрес еще не подтвержден');
            throw ApiError.BadRequest('Email address hasnt been confirmed yet');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            console.log('Неверный пароль')
            throw ApiError.BadRequest('Oops, wrong email or password');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto }, toggle);

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async delete(id, password) {
        const user = await UserModel.findById(id);
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            console.log('Неверный пароль')
            throw ApiError.BadRequest('Oops, wrong email or password');
        }
        await UserModel.deleteOne(user, function (err, result) { });
        return ({})
    }

    async changeData(email, firstName, lastName, username, id) {
        const userEmail = await UserModel.findById(id);
        const exists = await UserModel.findOne({ email });
        if (userEmail.email !== email && exists) {
            throw ApiError.BadRequest(`This email already exists`);
        }
        const user = await UserModel.findByIdAndUpdate(id,
            { $set: { email, firstName, lastName, username } },
            (err, ac) => {
                if (err) throw err;
            })
        const userDto = new UserDto(user);
        return { user: userDto };
    }

    async changePassword(currentPassword, newPassword, id) {
        const userPass = await UserModel.findById(id);
        const isPassEquals = await bcrypt.compare(currentPassword, userPass.password);

        if (!isPassEquals) {
            console.log('Неверный пароль')
            throw ApiError.BadRequest('Enter correct password');
        }
        const hashPassword = await bcrypt.hash(newPassword, 3);
        const user = await UserModel.findByIdAndUpdate(id,
            { $set: { password: hashPassword } },
            (err, ac) => {
                if (err) throw err;
            })
        const userDto = new UserDto(user);
        return { user: userDto };
    }

    async resetPassword(email) {
        const password = Math.random().toString(36).slice(-8);
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.findOneAndUpdate({ email }, { password: hashPassword },
            (err, ac) => {
                if (err) throw err;
            })
        await mailService.sendResetMail(email, password);
        const userDto = new UserDto(user);
        return { user: userDto };
    }

    async savePlaylist(playlist, userId) {
        console.log('playlist-----', playlist);
        const user = await PlaylistModel.findOne({ user: userId });
        let key = Object.keys(playlist)[0];
        console.log(key);
        let playlistData;
        if (!user) {
            playlistData = await PlaylistModel.create({ user: userId, playlist });
            return
        } else if (user.playlist[key]) {
            console.log(user.playlist[key]);
            console.log('Совпадение');
            user.playlist[key] = playlist[key];
            user.markModified(`playlist.${key}`);
            playlistData = await user.save();
        } else {
            user.playlist[key] = playlist[key];
            user.markModified(`playlist.${key}`);
            playlistData = await user.save();
        }
        return { playlist } = playlistData
    }

    async getPlaylist(userId) {
        const { playlist } = await PlaylistModel.findOne({ user: userId });
        return playlist
    }
}

module.exports = new UserService();
