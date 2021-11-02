import jwt from 'jsonwebtoken'
import tokenModel from '../models/token-models'

class TokenService {
    generateTokens(payload: any, toggle?: boolean) {
        let time = toggle ? '5 days' : '2 days'
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: '48h' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: time })
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await tokenModel.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({ user: userId, refreshToken })
        return token;
    }

    async removeToken(refreshToken: string) {
        const tokenData = await tokenModel.deleteOne({ refreshToken })
        return tokenData;
    }

    async findToken(refreshToken: string) {
        const tokenData = await tokenModel.findOne({ refreshToken })
        return tokenData;
    }
}

export = new TokenService()
