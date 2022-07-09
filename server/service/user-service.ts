import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import UserDto from '../dtos/user-dto';
import ApiError from '../exceptions/api-error';
import PlaylistModel from '../models/playlist-models';
import TokenModel from '../models/token-models';
import UserModel from '../models/user-models';
import mailService from './mail-service';
import tokenService from './token-service';

class UserService {
    async registration(email: string, password: string) {
        const candidate = await UserModel.findOne({ email })
        if (candidate) {
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
            throw ApiError.BadRequest('Oops, wrong email or password');
        }
        const confirmed = await UserModel.findOne({ email })
        if (!confirmed.isActivated) {
            throw ApiError.BadRequest('Email address hasnt been confirmed yet');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
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
            throw ApiError.BadRequest('Oops, wrong email or password');
        }
        await UserModel.deleteOne(user);
        await TokenModel.findOneAndDelete({ user: id })
        await PlaylistModel.findOneAndDelete({ user: id })
        return 
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
}

export = new UserService();