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
        return instance.post<{data: { item: TodolistsType }}>("todo-lists", {title: title})
    },
    deleteTodolists(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    }
}