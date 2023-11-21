import axios from "axios";
import {TaskStatuses, TaskType} from "../state/reducers/tasks-reducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, status: TaskStatuses, title: string) {
        return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {status: status, title: title})
    }
}

type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}

type ResponseType<T> = {
    resultCode: number
    messages: string[]
    data: T
    fieldsErrors: string[]
}