import axios from "axios";
import {ResponseType} from "./todolistApi";
import {LoginType} from "../components/Login/LoginMUI";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const authApi = {
    authMe() {
        return instance.get<ResponseType<AuthMeType>>('/auth/me')
    },
    logout() {
        return instance.delete(`/auth/login`)
    },
    login(login: LoginType) {
        return instance.post<ResponseType<{ userId: number }>>(`/auth/login`,
            {
                email: login.email,
                password: login.password,
                rememberMe: login.rememberMe
            })
    }
}

// Types
type AuthMeType = {
    id: number
    email: string
    login: string
}