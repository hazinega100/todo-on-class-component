import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})

export const todolistApi = {
    getTodolist() {
        return instance.get('todo-list')
    }
}