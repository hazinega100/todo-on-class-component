import {Dispatch} from "redux";
import {todolistApi} from "../../api/todolistApi";
import {setStatusAC} from "./app-reducer";

const initState: TodolistsType[] = []

export const GET_TODOLISTS = 'GET_TODOLISTS'
export const ADD_TODOLIST = 'ADD_TODOLIST'
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'

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

type ActionType = GetTodolist | RemoveTodolistType | AddTodolist