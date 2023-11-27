import {Dispatch} from "redux";
import {tasksApi} from "../../api/tasksApi";
import {ADD_TODOLIST, AddTodolist, GET_TODOLISTS, GetTodolist} from "./todolist-reducer";
import {setAppErrorAC, setAppSuccessAC, setMessagesAC, setStatusAC} from "./app-reducer";

const initState: TasksStateType = {}

const GET_TASKS = "GET_TASKS"
const CREATE_TASK = "CREATE_TASK"
const REMOVE_TASK = "REMOVE_TASK"
const CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS"
const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE"

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
        case CHANGE_TASK_STATUS: {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.tasksId ? {...t, status: action.status} : t)
            }
        }
        case "CHANGE_TASK_TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.tasksId ? {...t, title: action.title} : t)
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
const changeTaskStatusAC = (todolistId: string, tasksId: string, status: TaskStatuses) => {
    return {
        type: CHANGE_TASK_STATUS,
        todolistId,
        tasksId,
        status
    } as const
}
const changeTaskTitleAC = (todolistId: string, tasksId: string, title: string) => {
    return {
        type: CHANGE_TASK_TITLE,
        todolistId,
        tasksId,
        title
    } as const
}
// Thunk
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(getTasksAC(todolistId, res.data.items))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setStatusAC('error'))
        })
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksApi.createTask(todolistId, title)
        .then(res => {
            dispatch(createTaskAC(todolistId, res.data.data.item))
            dispatch(setAppSuccessAC('Task added successfully'))
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
export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses, title: string) => (dispatch: Dispatch) => {
    tasksApi.updateTask(todolistId, taskId, status, title)
        .then(res => {
            dispatch(changeTaskStatusAC(todolistId, taskId, res.data.data.item.status))
            dispatch(setAppSuccessAC('Task change status successfully'))
        })
}
export const changeTaskTitleTC = (todolistId: string, taskId: string, status: TaskStatuses, title: string) => (dispatch: Dispatch) => {
    tasksApi.updateTask(todolistId, taskId, status, title)
        .then(res => {
            dispatch(changeTaskTitleAC(todolistId, taskId, res.data.data.item.title))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setStatusAC('error'))
        })
}

// Types
export type TaskType = {
    id: string
    title: string
    status: number
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

type GetTasksType = ReturnType<typeof getTasksAC>
type CreateTasksType = ReturnType<typeof createTaskAC>
type RemoveTasksType = ReturnType<typeof removeTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

type ActionType =
    | CreateTasksType
    | GetTasksType
    | GetTodolist
    | AddTodolist
    | RemoveTasksType
    | ChangeTaskStatusType
    | ChangeTaskTitleType