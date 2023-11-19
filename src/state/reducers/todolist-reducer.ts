import {Dispatch} from "redux";
import {todolistApi} from "../../api/todolistApi";

const initState: TodolistsType[] = [
    // {id: '1', title: 'What to learn', filter: 'all'},
    // {id: '2', title: 'What to buy', filter: 'all'},
]

const GET_TODOLISTS = 'GET-TODOLISTS'

export const todolistReducer = (state = initState, action: ActionType): TodolistsType[] => {
    switch (action.type) {
        case GET_TODOLISTS: {
            return [...state, ...action.todolists]
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
// Thunk
export const getTodolistTC = () => (dispatch: Dispatch) => {
    todolistApi.getTodolists()
        .then(res => {
            dispatch(getTodolistAC(res.data))
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

type GetTodolist = ReturnType<typeof getTodolistAC>
type ActionType = GetTodolist