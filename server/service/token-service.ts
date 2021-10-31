import jwt from 'jsonwebtoken'
import tokenModel from '../models/token-models'

class TokenService {
    generateTokens(payload: any, t?: any) {
        let time = '2 days'
        if (t) {
            time = '5 days'
        }
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: '48h' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: time })
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: any) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: any) {
        try {
            const userData: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId: any, refreshToken: any) {
        const tokenData = await tokenModel.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({ user: userId, refreshToken })
        return token;
    }

    async removeToken(refreshToken: any) {
        const tokenData = await tokenModel.deleteOne({ refreshToken })
        return tokenData;
    }

    async findToken(refreshToken: any) {
        const tokenData = await tokenModel.findOne({ refreshToken })
        return tokenData;
    }
}

export = new TokenService()
