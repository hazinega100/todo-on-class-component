import {Dispatch} from "redux";
import {tasksApi} from "../../api/tasksApi";
import {GetTodolist} from "./todolist-reducer";

const initState: TasksStateType = {}

const GET_TASKS = 'GET_TASKS'

export const tasksReducer = (state = initState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "GET_TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(tl => copyState[tl.id] = [])
            return copyState
        }
        case GET_TASKS: {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        default: {
            return state
        }
    }
}

// Actions
const getTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: GET_TASKS,
        todolistId,
        tasks
    } as const
}
// Thunk
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(getTasksAC(todolistId, res.data.items))
        })
}

// Types
export type TaskType = {
    id: string
    title: string
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

type GetTasksType = ReturnType<typeof getTasksAC>
type ActionType = GetTasksType | GetTodolist