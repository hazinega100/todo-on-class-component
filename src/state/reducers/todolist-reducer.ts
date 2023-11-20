import {Dispatch} from "redux";
import {todolistApi} from "../../api/todolistApi";

const initState: TodolistsType[] = [
    // {id: '1', title: 'What to learn', filter: 'all'},
    // {id: '2', title: 'What to buy', filter: 'all'},
]

const GET_TODOLISTS = 'GET_TODOLISTS'
const REMOVE_TODOLISTS = 'REMOVE_TODOLISTS'

export const todolistReducer = (state = initState, action: ActionType): TodolistsType[] => {
    switch (action.type) {
        case GET_TODOLISTS: {
            return [...state, ...action.todolists]
        }
        case "REMOVE_TODOLISTS": {
            return state.filter(tl => tl.id !== action.todolistId)
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
const removeTodolistAC = (todolistId: string) => {
    return {
        type: REMOVE_TODOLISTS,
        todolistId
    } as const
}
// Thunk
export const getTodolistTC = () => (dispatch: Dispatch) => {
    todolistApi.getTodolists()
        .then(res => {
            dispatch(getTodolistAC(res.data))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTodolists(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
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
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
type ActionType = GetTodolist | RemoveTodolistType