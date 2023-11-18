import {Dispatch} from "redux";
import {todolistApi} from "../../api/todolistApi";

const initState: TodolistType[] = [
    {id: '1', title: 'What to learn', filter: 'all'},
    {id: '2', title: 'What to buy', filter: 'all'},
]

const GET_TODOLISTS = 'GET-TODOLISTS'

export const todolistReducer = (state = initState, action: any) => {
    switch (action.type) {
        case GET_TODOLISTS: {
            return state
        }
        default: {
            return state
        }
    }
}

// Actions
const getTodolistAC = (todolists: TodolistType[]) => {
    return {
        type: GET_TODOLISTS,
        todolists
    } as const
}
// Thunk
export const getTodolistTC = (todolists: TodolistType[]) => (dispatch: Dispatch) => {
    todolistApi.getTodolist()
        .then(res => {
            dispatch(getTodolistAC(res.data))
        })
}

// Types
export type FilterType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}