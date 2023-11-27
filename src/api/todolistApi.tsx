import axios from "axios";
import {TodolistsType} from "../state/reducers/todolist-reducer";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true
})

export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistsType[]>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistsType }>>("todo-lists", {title: title})
    },
    deleteTodolists(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolists(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
    }
}

// Types
type ResponseType<D> = {
    resultCode: number
    messages: string[]
    data: D
}