import { IUser } from './IUser';
export interface AuthResponse {
    accessToken: string
    refreshToken: string
    toggle: boolean
    user: IUser
}