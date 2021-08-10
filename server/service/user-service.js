const UserModel = require('../models/user-model');
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
        const number = await UserModel.count();
        const username = `noise${number + 1}`

        const user = await UserModel.create({ email, password: hashPassword, activationLink, number, username })
        await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);

        const userDto = new UserDto(user); // id, email, isActivated,username,number
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink })
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            console.log('Пользователь с таким email не найден')
            // throw ApiError.BadRequest('User with this email was not found')
            throw ApiError.BadRequest('Oops, wrong email or password');
        }
        const confirmed = await UserModel.findOne({ email })
        if (!confirmed.isActivated) {
            console.log('Электронный адрес еще не подтвержден')
            throw ApiError.BadRequest('Email address hasnt been confirmed yet')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            console.log('Неверный пароль')
            throw ApiError.BadRequest('Oops, wrong email or password');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
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
        return { ...tokens, user: userDto }
    }
    async delete(refreshToken) {

    }
    async changeData(email, firstName, lastName, username, id) {
        const id = await UserModel.findById(userData.id);
        const user = await UserModel.findOneAndUpdate({ email },
            { email, firstName, lastName, username },
            (err, ac) => {
                if (err) throw err;
                // console.log('ac--------', ac);
            }
        )
        if (user) {
            throw ApiError.BadRequest(`This email already exists`)
        }
        console.log('user----------', user)
        const userDto = new UserDto(user);
        return { user: userDto }
    }
}

module.exports = new UserService();
