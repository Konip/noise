import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import UserDto from '../dtos/user-dto';
import ApiError from '../exceptions/api-error';
import PlaylistModel from '../models/playlist-models';
import UserModel from '../models/user-models';
import mailService from './mail-service';
import tokenService from './token-service';

interface Iclone {
    [key: string]: object
}

class UserService {
    async registration(email: string, password: string) {
        const candidate = await UserModel.findOne({ email })
        if (candidate) {
            console.log(`Пользователь с почтовым адресом ${email} уже существует`)
            throw ApiError.BadRequest(`This email already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = v4()
    
        let count = await UserModel.count();
        const number = count++
        const username = `noise${number}`

        const user = await UserModel.create({ email, password: hashPassword, activationLink, number, username })
        await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async activate(activationLink: string) {
        const user = await UserModel.findOne({ activationLink });
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email: string, password: string, toggle: boolean) {
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

    async logout(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken: string) {
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

    async delete(id: string, password: string) {
        const user = await UserModel.findById(id);
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            console.log('Неверный пароль')
            throw ApiError.BadRequest('Oops, wrong email or password');
        }
        await UserModel.deleteOne(user);
        return ({})
    }

    async changeData(email: string, firstName: string, lastName: string, username: string, id: string) {
        const userEmail = await UserModel.findById(id);
        const exists = await UserModel.findOne({ email });
        if (userEmail.email !== email && exists) {
            throw ApiError.BadRequest(`This email already exists`);
        }

        const user = await UserModel.findByIdAndUpdate(id,
            { $set: { email, firstName, lastName, username } },
            (err: any, ac: any) => {
                if (err) throw err;
                return ac
            })
        const userDto = new UserDto(user);
        return { user: userDto };
    }

    async changePassword(currentPassword: string, newPassword: string, id: string) {
        const userPass = await UserModel.findById(id);
        const isPassEquals = await bcrypt.compare(currentPassword, userPass.password);

        if (!isPassEquals) {
            console.log('Неверный пароль')
            throw ApiError.BadRequest('Enter correct password');
        }
        const hashPassword = await bcrypt.hash(newPassword, 3);
        const user = await UserModel.findByIdAndUpdate(id,
            { $set: { password: hashPassword } },
            (err: any, ac: any) => {
                if (err) throw err;
            })
        const userDto = new UserDto(user);
        return { user: userDto };
    }

    async resetPassword(email: string) {
        const password = Math.random().toString(36).slice(-8);
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.findOneAndUpdate({ email }, { password: hashPassword },
            { new: true }, (err: any, ac: any) => {
                if (err) throw err;
            })
        await mailService.sendResetMail(email, password);
        const userDto = new UserDto(user);
        return { user: userDto };
    }

    async savePlaylist(playlist: any, id: string) {

        const user = await PlaylistModel.findOne({ user: id });
        let key = Object.keys(playlist)[0];

        let playlistData;
        if (!user) {
            return await PlaylistModel.create({ user: id, playlist });
        } else if (user.playlist[key]) {

            user.playlist[key] = playlist[key];
            user.markModified(`playlist.${key}`);
            playlistData = await user.save();
        } else {
            user.playlist[key] = playlist[key];
            user.markModified(`playlist.${key}`);
            playlistData = await user.save();
        }

        return playlistData
    }

    async getPlaylist(id: string) {
        const playlist = await PlaylistModel.findOne({ user: id });
        return playlist
    }

    async changeNamePlaylist(id: string, currentName: string, newName: string) {
        const user = await PlaylistModel.findOne({ user: id });
        const clone: Iclone = {};
        let key
        for (key in user.playlist) {
            if (user.playlist.hasOwnProperty(key) && key !== currentName) {
                clone[key] = user.playlist[key];
            } else clone[newName] = user.playlist[key];
        }

        PlaylistModel.updateOne({ user: id }, { playlist: clone }, {},
            (err: any, ac: any) => {
                if (err) console.log(err);
            })
        return clone
    }

    async deletePlaylist(id: string, name: string) {
        let res = await PlaylistModel.findOneAndUpdate({ user: id },
            { $unset: { [`playlist.${name}`]: "" } },
            { new: true },
            (err: any, ac: any) => {
                if (err) console.log(err);
            })
        return res.playlist
    }
}

export = new UserService();
