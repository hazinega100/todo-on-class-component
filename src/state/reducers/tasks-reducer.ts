import {Dispatch} from "redux";
import {tasksApi} from "../../api/tasksApi";
import {ADD_TODOLIST, AddTodolist, GET_TODOLISTS, GetTodolist} from "./todolist-reducer";
import {setMessagesAC} from "./app-reducer";

const initState: TasksStateType = {}

const GET_TASKS = 'GET_TASKS'
const CREATE_TASK = 'CREATE_TASK'
const REMOVE_TASK = 'REMOVE_TASK'

export const tasksReducer = (state = initState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case GET_TODOLISTS: {
            const copyState = {...state}
            action.todolists.forEach(tl => copyState[tl.id] = [])
            return copyState
        }
        case ADD_TODOLIST: {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case GET_TASKS: {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        case "CREATE_TASK": {
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], action.task]
            }
        }
        case REMOVE_TASK: {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.tasksId)
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
const createTaskAC = (todolistId: string, task: TaskType) => {
    return {
        type: CREATE_TASK,
        todolistId,
        task
    } as const
}
const removeTaskAC = (todolistId: string, tasksId: string) => {
    return {
        type: REMOVE_TASK,
        todolistId,
        tasksId
    } as const
}
// Thunk
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(getTasksAC(todolistId, res.data.items))
        })
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksApi.createTask(todolistId, title)
        .then(res => {
            console.log(res.data)
            dispatch(createTaskAC(todolistId, res.data.data.item))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksApi.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
            } else {
                dispatch(setMessagesAC(res.data.messages))
            }
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
type CreateTasksType = ReturnType<typeof createTaskAC>
type RemoveTasksType = ReturnType<typeof removeTaskAC>

type ActionType =
    | CreateTasksType
    | GetTasksType
    | GetTodolist
    | AddTodolist
    | RemoveTasksType