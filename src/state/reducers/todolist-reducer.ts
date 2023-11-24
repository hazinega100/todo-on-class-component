import {Dispatch} from "redux";
import {todolistApi} from "../../api/todolistApi";
import {setStatusAC} from "./app-reducer";

const initState: TodolistsType[] = []

export const GET_TODOLISTS = 'GET_TODOLISTS'
export const ADD_TODOLIST = 'ADD_TODOLIST'
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_FILTER_TASKS = 'CHANGE_FILTER_TASKS'

export const todolistReducer = (state = initState, action: ActionType): TodolistsType[] => {
    switch (action.type) {
        case GET_TODOLISTS: {
            return [...state, ...action.todolists]
        }
        case REMOVE_TODOLIST: {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case ADD_TODOLIST: {
            return [
                {...action.todolist},
                ...state
            ]
        }
        case CHANGE_TODOLIST_TITLE: {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        }
        case CHANGE_FILTER_TASKS: {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        }
        default: {
            return state
        }
    }
}

// Actions
const getTodolistAC = (todolists: TodolistsType[]) => {
    return {
        type: GET_TODOLISTS,
        todolists
    } as const
}
const addTodolistAC = (todolist: TodolistsType) => {
    return {
        type: ADD_TODOLIST,
        todolist
    } as const
}
const removeTodolistAC = (todolistId: string) => {
    return {
        type: REMOVE_TODOLIST,
        todolistId
    } as const
}
const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        todolistId,
        title
    } as const
}
export const changeFilterTasksAC = (todolistId: string, filter: FilterType) => {
    return {
        type: CHANGE_FILTER_TASKS,
        todolistId,
        filter
    } as const
}
// Thunk
export const getTodolistTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistApi.getTodolists()
        .then(res => {
            dispatch(getTodolistAC(res.data))
            dispatch(setStatusAC('success'))
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistApi.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setStatusAC('success'))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistApi.deleteTodolists(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setStatusAC('success'))
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistApi.updateTodolists(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(setStatusAC('success'))
        })
}

// Types
export type FilterType = 'all' | 'completed' | 'active'

export type TodolistsResponseType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TodolistsType = TodolistsResponseType & { filter: FilterType }

export type GetTodolist = ReturnType<typeof getTodolistAC>
export type AddTodolist = ReturnType<typeof addTodolistAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeFilterTasksType = ReturnType<typeof changeFilterTasksAC>

type ActionType =
    | GetTodolist
    | RemoveTodolistType
    | AddTodolist
    | ChangeTodolistTitleType
    | ChangeFilterTasksType