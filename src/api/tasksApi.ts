import axios from "axios";
import {TaskType} from "../state/reducers/tasks-reducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
    }
}

type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}