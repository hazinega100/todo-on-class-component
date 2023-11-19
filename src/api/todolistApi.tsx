import axios from "axios";
import {TodolistsType} from "../state/reducers/todolist-reducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistsType[]>('todo-lists')
    }
}